# Research 3: Best practices for a bilingual, media-heavy Next.js 16 static-export portfolio

Research date: 2026-10-16. Target: https://shimaa-essaam.github.io/ (EN at `/`, AR RTL at `/ar/`), Next.js 16, `output: 'export'`, `trailingSlash: true`, GitHub Pages, about 14 vertical MP4 reels (360x640) with JPG posters, about 12 WebP images.

Repo observation (read-only check): `src/app/` currently has only `icon.svg` and `layout.tsx` as metadata-relevant files. There is no `sitemap.ts`, `robots.ts`, `manifest`, `apple-icon` or `opengraph-image` yet.

---

## 1. Core Web Vitals on a static, media-heavy site

**Thresholds (p75 of real visits, mobile and desktop measured separately)**
- LCP: 2.5 s or less is good; above 4.0 s is poor.
- INP: 200 ms or less is good; above 500 ms is poor.
- CLS: 0.1 or less is good; above 0.25 is poor.
- Sources:
  - https://web.dev/articles/optimize-lcp (updated 2025-03-31)
  - https://web.dev/articles/optimize-inp (updated 2025-09-02)
  - https://web.dev/articles/optimize-cls (updated 2025-02-07)

**LCP**
- LCP breaks into four parts: TTFB (about 40%), resource load delay (under 10%), resource load duration (about 40%) and render delay (under 10%). GitHub Pages TTFB is usually fine, so the main levers are discovery and byte size.
- Put `fetchpriority="high"` on the single likely LCP `<img>` (hero portrait or first poster). Use it on no more than one or two images.
- Never lazy-load the LCP image.
- If the LCP is a CSS background or appears only from JS, add `<link rel="preload" fetchpriority="high">`.
- If the LCP is a `<video>` poster, preload the poster image with `fetchpriority="high"`. The `poster` attribute itself cannot take `fetchpriority`.
  - Source: https://web.dev/articles/lazy-loading-video (updated 2026-07-02)
- For carousels, use `fetchpriority="high"` on the first visible slide and `fetchpriority="low"` on the rest. `loading="lazy"` alone is not enough, because near-viewport slides can still be boosted.
  - Source: https://web.dev/articles/fetch-priority (updated 2023-11-14, still current guidance)
- In Next.js, use `ReactDOM.preload(href, { as: 'image', fetchPriority: 'high' })` from a client component, because the Metadata API does not emit preload tags. `next/font` handles font preloading automatically.
  - Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#resource-hints (updated 2026-08-19)
- `next/image` with the default loader is unsupported under `output: 'export'`. Either use `images.unoptimized: true` or a custom loader, or plain `<img>` with pre-sized WebP and `srcset`.
  - Source: https://nextjs.org/docs/app/guides/static-exports (updated 2026-08-09)

**CLS**
- Always set `width` and `height` (or CSS `aspect-ratio`) on `<img>` and `<video>`. For the reels, use `width="360" height="640"` or `aspect-ratio: 9/16`.
- Fonts: use `font-display: optional` or a size-adjusted fallback. `next/font` generates `size-adjust` fallbacks automatically.
- Animate only `transform` and `opacity`.
- Keep pages bfcache-eligible, for example by avoiding `unload` handlers.
- Source: https://web.dev/articles/optimize-cls

**INP**
- Keep event handlers short and yield (`setTimeout`, `requestAnimationFrame`, or `scheduler.yield` where supported).
- Avoid layout thrashing (reading layout after writing styles).
- Keep the DOM small, and use `content-visibility: auto` for long off-screen sections such as the reel grid.
- Source: https://web.dev/articles/optimize-inp

**GitHub Pages caveat**
- No custom response headers. HTML and assets get a short fixed cache (`max-age=600` is widely reported) plus ETag. Content-hashed `/_next/static/*` files are still safe, but media in `/public` gets revalidated often.
- Keep media small: re-encode MP4s (H.264 at a sensible bitrate, `+faststart` so playback starts before the full download) and compress posters.
- Sources (secondary, no official GitHub documentation found):
  - https://www.jquery.app/tools/cache-control-header-builder/
  - https://discourse.gohugo.io/t/is-it-possible-to-add-custom-http-header-in-hugo-using-github-pages/32182

---

## 2. Embedding many videos without hurting speed

From https://web.dev/articles/lazy-loading-video (updated 2026-07-02):

**Attributes on every non-hero video**
- Use `preload="none"`. The default `metadata` still fetches part of the file, so with 14 videos that adds up.
- Add a `poster`, with explicit width and height.
- Optionally switch to `preload="metadata"` on `pointerenter` or focus so playback starts faster and the duration shows.

**Native lazy video**
- `loading="lazy"` on `<video>` defers both the video and its poster in supporting browsers. It reportedly shipped around Chrome 148 (2026) and was added to the HTML Living Standard.
- Treat it as progressive enhancement: unsupporting browsers ignore it, so keep `preload="none"`.
- Sources (secondary news, so verify against release notes):
  - https://windowsreport.com/google-chrome-may-add-native-lazy-loading-for-video-and-audio/
  - https://specification.website/spec/performance/lazy-loading/

**Autoplay**
- Browsers allow autoplay only when the video is `muted`.
- iOS also needs `playsinline`.
- Prefer click-to-play with visible `controls` for portfolio reels.
- Avoid autoplay where possible, because it removes user control.

**IntersectionObserver play/pause pattern (for hover or in-view previews)**
- Observe each video, call `play()` when it is about 50% or more in view, and `pause()` when it leaves.
- Only one video should play at a time.
- Never auto-play when `prefers-reduced-motion: reduce` is set.
- Handle the promise returned by `play()` with `.catch()`.

**Facade pattern**
- Render a poster `<img>` (or a `<button>` with the poster as background) plus a play button.
- Mount or attach the `<video src>` only on click.
- This gives zero video bytes until the user acts, and is the best fit for a grid of 14 reels. A `<dialog>`-based lightbox player is a good companion.

**Captions and accessibility**
- Prerecorded video with meaningful audio (speech) needs captions (WCAG 1.2.2, Level A). Use `<track kind="captions" src="x.en.vtt" srclang="en" label="English">`, and an Arabic track (`srclang="ar"`) for AR content.
- Music-only audio does not need captions.
- Video without meaningful audio needs a text description: a nearby caption or description is fine (1.2.1).
- Source: https://www.w3.org/WAI/media/av/captions/ (updated 2024-09-17)

**Pause, Stop, Hide (WCAG 2.2.2, Level A)**
- Any auto-starting muted looping video longer than 5 s shown alongside other content needs a visible pause/stop control. One global "pause all motion" control is acceptable.
- Source: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html (updated 2026-08-10)

**Video structured data**
- VideoObject requires `name`, `thumbnailUrl` and `uploadDate` (ISO 8601 with timezone).
- Recommended: `contentUrl` (the direct MP4 URL, which Google prefers), `description` and `duration` (for example `PT0M45S`).
- Source: https://developers.google.com/search/docs/appearance/structured-data/video (updated 2026-09-24)

**Video sitemap entries**
- Next.js `sitemap.ts` supports `videos: [{ title, thumbnail_loc, description }]` per URL.
- Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap (updated 2026-08-18)

---

## 3. Accessibility: WCAG 2.2 AA and related

New WCAG 2.2 criteria (W3C Recommendation, 5 Oct 2023), from https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/:

**2.4.11 Focus Not Obscured (Minimum), AA**
- A focused element must not be fully hidden by sticky headers, footers or banners such as a cookie or palette panel.
- Fix with `scroll-padding-top` equal to the header height on `html` (technique C43). Failure F110 is a sticky header covering the focused item.
- Source: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html (updated 2026-06-15)

**2.5.8 Target Size (Minimum), AA**
- Pointer targets must be at least 24x24 CSS px, or pass the spacing exception: a 24 px circle centred on each target must not overlap another target or circle.
- Inline links in text are exempt.
- Applies to icon buttons such as the language toggle, theme/palette swatches, social icons, video play/close and carousel dots.
- Source: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html (updated 2026-05-11)

**2.5.7 Dragging Movements, AA**
- Any drag interaction (carousel swipe, a colour picker slider, a reorderable palette) needs a single-pointer alternative: prev/next buttons or click-to-set.

**3.2.6 Consistent Help, A**
- If contact or help links repeat across pages (for example a footer contact or WhatsApp/email link), keep them in the same relative order on EN and AR pages.

**3.3.7 Redundant Entry, A, and 3.3.8 Accessible Authentication (Minimum), AA**
- Only relevant if there is a contact form or login. Do not ask for the same data twice. Do not use cognitive CAPTCHAs without an alternative.

**Removed**
- 4.1.1 Parsing is obsolete.

**Other essentials**
- **Skip link:** the first focusable element is `<a href="#main" class="skip-link">Skip to content</a>`, visible on focus, targeting `<main id="main" tabindex="-1">`. Translate it on `/ar/`.
- **`:focus-visible`:** draw a clear outline at 2 px or more with enough contrast against both themes. Never set `outline: none` without a replacement.
- **`prefers-reduced-motion: reduce`:** disable autoplay previews, parallax, smooth scrolling and large transitions.
  - Source: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- **Video controls:**
  - Use native `controls`, or custom controls that are real `<button>`s with accessible names in the page language ("Play" / "تشغيل").
  - Keyboard operable.
  - The lightbox `<dialog>` traps focus, closes on Esc, and returns focus to the trigger.

---

## 4. SEO and social sharing (Next.js App Router + static export)

**Static export compatibility**
- Server Components and metadata are resolved at build time, so `metadata` and `generateMetadata` output lands in static HTML.
- Route Handlers must be static. The docs require `export const dynamic = 'force-static'` for route handlers under export.
- `sitemap.ts`, `robots.ts` and icon files are "special Route Handlers, cached by default" unless they use request-time APIs. They are prerendered to `/sitemap.xml` and `/robots.txt` as long as they use no request data.
- Community reports (Dec 2025 to Jun 2026) show build errors about `export const dynamic` on `/sitemap.xml` with `output: 'export'`. Adding `export const dynamic = 'force-static'` to `sitemap.ts` and `robots.ts` is a safe, harmless guard. Alternatively, place a static `public/sitemap.xml` and `public/robots.txt`, but never both a static file and an `app/sitemap.ts`.
- Sources:
  - https://nextjs.org/docs/app/guides/static-exports
  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots (updated 2026-05-01)
  - https://community.vercel.com/t/deployment-blocked-by-export-const-dynamic-error-on-sitemap-xml-with-output-export/30314
- Unsupported under export: `headers`, `redirects`, `rewrites`, proxy/middleware, and default-loader image optimization. This means no server-side language redirect is possible, which is also what Google recommends.

**metadataBase and URLs**
- Set `metadataBase: new URL('https://shimaa-essaam.github.io')` in the root layout. Relative URL fields then resolve to absolute ones, and a relative URL without `metadataBase` is a build error.
- With `trailingSlash: true`, write canonical and alternate paths with the trailing slash (`/ar/`) so they match the served URLs exactly.
- Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

**Title and description**
- Use `title: { default: 'Shimaa Essam — <Role>', template: '%s — Shimaa Essam' }` in the layout.
- Give each page a unique, localized title (about 50–60 characters) and description (about 140–160 characters), in Arabic on `/ar/`.
- Metadata objects merge shallowly. A page that sets `openGraph` replaces the whole parent `openGraph`, so share common OG fields through a helper.

**Canonical and hreflang (head)**
- English page:
  - `alternates: { canonical: '/', languages: { en: '/', ar: '/ar/', 'x-default': '/' } }`
- Arabic page:
  - `alternates: { canonical: '/ar/', languages: { en: '/', ar: '/ar/', 'x-default': '/' } }`
- Each language version must be self-canonical. Never canonicalize `/ar/` to `/`.

**Open Graph and Twitter**
- OG image: 1200x630 (1.91:1) PNG or JPG under about 5 MB. Keep key content in the centre safe zone, and provide localized versions (EN and AR text).
- Set `og:image:width`, `og:image:height` and `og:image:alt`.
- `openGraph.locale`: `en_US` or `ar_EG` (or `ar_AR`), with `alternateLocale` set to the other.
- `type: 'profile'` or `'website'`, plus `siteName` and `url`.
- Twitter: `card: 'summary_large_image'`, with the same image.
- Sources (third-party guides, consensus 1200x630):
  - https://www.krumzi.com/blog/og-image-size-cheat-sheet-1200x630
  - https://screenhance.com/blog/og-image-size-guide
- OG image URLs must be absolute; `metadataBase` handles this.
- `opengraph-image.tsx` via `next/og` also prerenders under export when static. A plain `opengraph-image.png` file per route segment (for example `app/ar/opengraph-image.png`) is the simplest option.

**Robots**
- `robots.ts`: `{ rules: { userAgent: '*', allow: '/' }, sitemap: 'https://shimaa-essaam.github.io/sitemap.xml' }`.
- Because this is a user site (`<user>.github.io`), robots.txt at the root is honoured. A project site under a subpath would not be.

**Sitemap with hreflang alternates**
- Next.js 14.2+ supports this through `alternates.languages`, which emits `xmlns:xhtml` and `<xhtml:link rel="alternate" hreflang=...>`.
- Include both the EN and the AR URL as their own `<url>` entries.
- Each entry lists all alternates, including itself and `x-default`. Google requires every variant listed in each set.
- Example entry:
  ```ts
  { url: 'https://shimaa-essaam.github.io/', lastModified: BUILD_DATE,
    alternates: { languages: { en: 'https://shimaa-essaam.github.io/', ar: 'https://shimaa-essaam.github.io/ar/', 'x-default': 'https://shimaa-essaam.github.io/' } } }
  ```
- Use a fixed build date rather than `new Date()` per entry if content has not changed, so `lastmod` stays truthful.

**JSON-LD**
- Render it as a native `<script type="application/ld+json">` in a layout or page. Escape `<` as `<` to prevent XSS. Optionally type it with `schema-dts`. Do not use `next/script`.
  - Source: https://nextjs.org/docs/app/guides/json-ld (updated 2026-03-02)
- Recommended graph (one `@graph` per page, with `@id`s linking the nodes):
  - `WebSite`: `name`, `url`, `inLanguage` (`en` / `ar`).
  - `ProfilePage`: `mainEntity` → `Person`. Google requires `mainEntity` and `name`. Recommended: `dateCreated`, `dateModified`, `alternateName`, `description`, `image` (a real photo), and `sameAs` (LinkedIn, Behance, Instagram and so on). Google lists an "About Me" page as a valid use; a home page dominated by other content may not qualify.
    - Source: https://developers.google.com/search/docs/appearance/structured-data/profile-page (updated 2026-09-08)
  - `Person`: also `jobTitle`, `knowsLanguage` (`["en","ar"]`) and `url`.
  - `VideoObject` per reel, or `CreativeWork` / `ImageObject` items in an `ItemList`. A VideoObject needs `name`, `thumbnailUrl`, `uploadDate`, plus `contentUrl` and `duration`.
- Validate with https://search.google.com/test/rich-results and https://validator.schema.org/.

**Favicon set (Next.js file conventions)**
- `app/icon.svg` is supported and gets `sizes="any"`. This already exists.
- Add `app/favicon.ico` (32x32, root of `app/` only) for legacy browsers.
- Add `app/apple-icon.png` (180x180, PNG or JPG only, not SVG).
- Optionally add `app/manifest.ts` or `manifest.webmanifest` with 192 and 512 PNG icons, plus `name` and `short_name`.
- `themeColor` and `colorScheme` belong in `export const viewport`, not in `metadata` (deprecated since Next.js 14).
- Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons (updated 2026-03-03)

---

## 5. Bilingual structure (EN / AR RTL)

**hreflang rules (Google, updated 2026-09-21)**
- Source: https://developers.google.com/search/docs/specialty/international/localized-versions
- Every version lists itself and all other versions. The sets must be identical and bidirectional, or Google may ignore them.
- Use fully qualified URLs with `https://`. Root-relative URLs fail in raw HTML; Next.js resolves them through `metadataBase`.
- Codes: language-only `en` and `ar` are valid and appropriate here, since the content is not region-specific. Do not use region-only codes or `es-419`-style codes.
- `x-default` is for unmatched languages and language selectors. Here it should point to the English root.
- Choose one method: HTML `<link>`, HTTP header or sitemap. Using more than one gives no extra benefit, though using both head and sitemap is harmless if they are consistent.

**Language and URLs (Google, updated 2025-12-10)**
- Source: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Use separate URLs per language (`/` and `/ar/`), which the site already does.
- Do not auto-redirect by `Accept-Language` or IP. Googlebot crawls from the US without `Accept-Language`.
- Provide visible links to the other language version instead.
- Keep each page monolingual: translate navigation, UI, `alt` text, `aria-label`s and captions. Do not show side-by-side translations.

**`lang` and `dir`**
- Put `<html lang="ar" dir="rtl">` on Arabic pages and `<html lang="en" dir="ltr">` on English pages.
- Do not set the base direction with CSS `direction`.
- Use `<bdi>` or `dir="auto"` for embedded opposite-direction strings such as brand names, emails, URLs and phone numbers inside Arabic text.
- In Next.js App Router this usually means separate root layouts, for example route groups `app/(en)/layout.tsx` and `app/(ar)/ar/layout.tsx`, each rendering its own `<html>`.
- Source: https://www.w3.org/International/questions/qa-html-dir

**Language switcher UX**
- Link to the equivalent page in the other language (`/` ↔ `/ar/`, or the same section anchor), not to the other language's home.
- Label it in the target language's own name and script: "العربية" on EN pages, "English" on AR pages.
- Add `lang="ar"` (or `lang="en"`) and `hreflang` on the link so screen readers pronounce it correctly.
- No flags: a language is not a country, and Arabic spans more than 20 countries.
- Use a real `<a href>`, not a JS-only toggle, so crawlers and no-JS users can follow it.
- Place it in a consistent header position and give it a target of at least 24x24 px.
- Sources:
  - https://www.linguise.com/blog/guide/best-practices-designing-language-selector/
  - https://designsystem.digital.gov/patterns/select-a-language/two-languages/
  - https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites

**RTL CSS**
- Use logical properties throughout: `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `border-inline-start`, `text-align: start`.
- Use flex or grid, which follow direction automatically.
- Mirror direction-bearing icons (arrows, chevrons, carousel prev/next) with `:dir(rtl)` or `[dir="rtl"] .icon { transform: scaleX(-1) }`. Do not mirror media, logos, or play icons. Play icons conventionally stay pointing right.
- Tailwind v4 has `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*` and `rtl:` / `ltr:` variants.
- Arabic typography:
  - Load an Arabic-capable font through `next/font` with the `arabic` subset, for example Cairo, Tajawal, IBM Plex Sans Arabic or Noto Kufi/Naskh Arabic.
  - Increase line-height to about 1.7–1.9.
  - Avoid `letter-spacing` on Arabic, because it breaks letter joining.
  - Do not use uppercase transforms.
- Numbers and dates: use `Intl.NumberFormat` and `Intl.DateTimeFormat` with `ar` or `ar-EG` if Arabic-Indic digits are wanted; otherwise keep Latin digits consistently.
