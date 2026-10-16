# Portfolio improvement plan

_Prepared 16 October 2026 for the "best-in-class pass" on https://shimaa-essaam.github.io/._
_Research notes with full source lists are in [`docs/research/`](research/)._

## 1. Honest assessment of the site as found

**Stack.** Next.js 16 (App Router) static export, deployed by GitHub Actions (`.github/workflows/pages.yml`, push to `main`) to GitHub Pages. One catch-all route renders every page; nearly all UI lives in a single 71-line, minified-style `portfolio.tsx`; styling is one 54 KB `globals.css` written on long single lines.

### Strengths (keep)
- Warm, human identity: cream/plum palette, DM Serif Display italics, arch portrait, hand-drawn note. It already looks better than most early-career portfolios.
- Real work, really shown: 14 self-hosted vertical reels (posters + click-to-play dialog), 12 designs, 3 persona PDFs, links to the original Facebook posts as outside proof.
- Honest copy: the persona project even says "These are planning profiles, not measured campaign results."
- Good instincts already in place: skip link, `<dialog>` with focus return, `prefers-reduced-motion`, content never hidden while waiting for JS, `preload="none"` video, all MP4s already `faststart`.
- Full Arabic version with native-sounding Egyptian copy.

### Weaknesses (what would make a recruiter or client leave)
| Area | Problem |
|---|---|
| Readability | Large amounts of UI text at **7–11 px** (eyebrows, card roles, meta labels, form help, footer). Hard to read on mobile and fails "resize text" comfort; makes the site feel fussy. |
| Arabic / i18n | `/ar/` pages are served as `<html lang="en">` with no `dir`; language and direction are only fixed by JavaScript after load (screen readers, Google and link previews see English). Arabic uses Noto Sans Arabic with negative letter-spacing (research: never track Arabic). |
| SEO / sharing | No canonical, no hreflang, no `og:url`/`og:locale`, no sitemap.xml, no robots.txt (both 404 live), no structured data, Arabic pages get an English description and a mixed-language title (`شيماء عصام — صانعة محتوى \| Shimaa Essam`). No apple-touch icon or manifest. |
| Case studies | Project pages are a gallery with a short summary. No explicit Context → Role → Process → Outcome story, no next-project navigation, no place for results or a testimonial when they become available. |
| Proof | No quick, honest volume signal; the "From the feed" block shows seven anonymous cards ("Facebook reel 01…05") that look unfinished. |
| Performance | Google Fonts loaded through a CSS `@import` (render-blocking chain, third-party request). 1254 px images served into ~600 px cards; 720×1280 / 1080×1920 JPG posters for 300 px tiles. Eight unused npm dependencies. |
| Code quality | Single giant component, cryptic names (`t`, `p`, `s`), duplicated nav arrays, ~4 KB of dead CSS from an old contact layout (`.contact-page`, `.contact-option`, `.contact-art`, `.contact-prompt`…), the reduced-motion block repeated three times, `.site` re-declaring `lang`/`dir`. |
| Small bugs | Icon-only circular "Get in touch" link exposes only its URL (`/contact/`) in contexts that ignore `aria-label` (link previews, some readers, text browsers). Floating WhatsApp button overlaps content strips on desktop. 404 page is English-only and has no navigation. |

## 2. What the research says (top insights driving decisions)

1. **The first 10–20 seconds decide the visit**; the hero must say who, what, for whom and show work within one scroll. — NN/g, *How long do users stay on web pages* (nngroup.com/articles/how-long-do-users-stay-on-web-pages/); uxdesign.cc "Only 30 seconds to reject your portfolio".
2. **Showing value beats showing polish**: "samples that don't show value" was the #1 portfolio mistake (32%) in The Creative Group's survey. — careers.usf.edu (2023 republication).
3. **Label role and format on every piece** ("Client – deliverable · Script + Edit"); impressive visuals without a stated role is a red flag. — TestGorilla, *How to hire a content creator* (2025-07); Evan Benner, Shanley Cox, JoinBrands examples.
4. **Case studies = brief → role → process → outcome; be honest when metrics are missing**, lead with what you controlled, never invent numbers. — marketing-mentor.com; fueler.io (2026); Framer "Picturelock" template.
5. **Few clients? Don't show a "2 clients" counter**; use outside proof (links to live posts) and fully attributed testimonials placed inside case studies. — NN/g *Social proof in UX*; *Trustworthy design*.
6. **Contact should be low-friction and repeated** (WhatsApp for MENA, visible email, short form). — NN/g *Web form design*; Kaleigh Moore, K.J. Brett.
7. **Core Web Vitals:** one high-priority LCP image, never lazy-load it; reserve space for all media; load video bytes only on user action. — web.dev *Optimize LCP* (2025), *Lazy-loading video* (2026), *Optimize CLS* (2025).
8. **WCAG 2.2 AA:** targets ≥ 24 px, focus not obscured by sticky headers, translated control names, reduced motion. — w3.org/WAI WCAG 2.2 Understanding docs (2026).
9. **Each language version is its own canonical with a reciprocal hreflang set incl. `x-default`; `<html lang dir>` must be in the markup, not set by JS.** — Google Search Central *Localized versions* (2026-09); W3C i18n *qa-html-dir*.
10. **Arabic typography:** never letter-space Arabic, no faux italics, bump size ~1 step and line-height ~1.8; Alexandria (display) + Readex Pro (text) are modern, variable, Egyptian-designed choices that avoid the generic Cairo look. — rtlstyling.com; Google Fonts metadata; W3C alreq.
11. **A well-written Arabic version is a differentiator** in the Egyptian/Gulf market (most agencies are English-only); path-prefix structure `/` + `/ar/` matches Telfaz11. — telfaz11.com, hsoub.com, mo4network.com.

## 3. Prioritized plan (impact × effort)

Legend — Impact: ●●● high, ●● medium, ● low. Effort: S / M / L.

| # | Item | Impact | Effort | Why (research tie-in) |
|---|---|---|---|---|
| 1 | **Server-rendered `lang`/`dir` per language** via two root layouts (`(en)` and `(ar)` route groups) | ●●● | M | Google/W3C: language must be in markup; fixes screen readers, previews and indexing of the Arabic site (#9). |
| 2 | **Full SEO/sharing layer**: per-page, per-language titles & descriptions, canonical, hreflang (en/ar/x-default), `og:url`/`og:locale`, sitemap.xml with alternates, robots.txt, JSON-LD (`ProfilePage`/`Person`, `WebSite`), apple-touch icon + manifest | ●●● | M | Live site returns 404 for sitemap/robots and has no hreflang (#9, research 03). |
| 3 | **Readable type scale**: raise every label to ≥ 12 px, body to 16 px, consistent tokenized scale | ●●● | M | Mobile reviewers skim; tiny text reads as unpolished (#1, #8, NN/g mobile content). |
| 4 | **Case-study structure**: Overview, Context/audience, My role, Process, The work, Outcome + Testimonial slots (rendered only when real content exists), deliverable counts, next-project link | ●●● | M | Brief→role→process→outcome is what reviewers look for (#2–#4). Never shows fake results. |
| 5 | **Proof strip on home**: honest counts computed from content (reels, designs, planning docs) + existing client links | ●● | S | Proof right under the hero without a weak "2 clients" counter (#5, benchmark pattern 2). |
| 6 | **Arabic typography**: Alexandria + Readex Pro via `next/font`, no letter-spacing, normal style for `em`, larger size/leading, `dir="ltr"` isolation for emails/phones | ●●● | S | Research 04 #7–#10; differentiator in market (#11). |
| 7 | **Self-hosted fonts with `next/font`** (remove CSS `@import`) | ●● | S | Removes render-blocking third-party chain; zero-CLS fallbacks (#7). |
| 8 | **Image pipeline**: 720 px WebP card/thumbnail variants + 480 px WebP posters with `srcset`; keep originals for the lightbox | ●● | S | Cuts home-page image bytes; LCP (#7). |
| 9 | **Code restructure**: split pages/components, readable formatting, shared nav config, remove dead CSS & duplicates, drop 8 unused deps | ●● | M | Maintainability; fewer bytes; the brief explicitly asks for it. |
| 10 | **Fix small bugs**: text label on "Get in touch" round link, WhatsApp FAB overlap, bilingual 404 with navigation, "From the feed" cards made compact & clearly labelled | ●● | S | Removes "unfinished" signals (#1). |
| 11 | **Accessibility pass**: ≥ 24 px targets, visible focus on all controls incl. form fields, focus not hidden under sticky header, `aria-current` in mobile nav, captions noted as follow-up | ●● | S | WCAG 2.2 AA (#8). |
| 12 | **CV visible to recruiters** in hero secondary area and contact page (existing PDF) | ●● | S | Research 01: freelancer sites ignore employers; she wants both. |
| 13 | Services/packages with "starting from" pricing | ●●● | — | **Needs her input** (no prices exist). Listed in the report, not invented. |
| 14 | Testimonials & measurable outcomes | ●●● | — | **Needs her input**; slots are built (item 4). |
| 15 | WebVTT captions for reels (EN/AR) | ●● | L | Needs transcripts from her; recommended next step. |
| 16 | Re-encode 1080p reels (video-13/14, 28 MB) to 720p | ● | S | Only loaded on click; she deliberately chose "original quality" — left alone, noted. |

**Out of scope by rule:** no wording changes to her copy, no new frameworks/build steps (the existing Next.js export and Actions workflow are kept), no invented numbers, clients or quotes.
