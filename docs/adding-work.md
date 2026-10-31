# Adding new work

New work almost never needs a new section or a new project. The Work page is one filterable grid of
**series** (a brand × a course, a campaign or a format), and each series page holds its designs or reels.
A new Facebook post usually becomes one more design inside an existing series.

## 1. Look at the new files

- Open every new file in `Data/` and note what it shows: brand, course language, headline, format.
- Use original exports (PNG, or the largest JPG available), never screenshots or Facebook previews.
- Check the size (`python -c "from PIL import Image; print(Image.open('Data/x.png').size)"`).
- Files that belong together, such as carousel slides, stay together.

## 2. Decide where it goes

| The work is… | Put it in |
|---|---|
| A Creativo Spanish post (promo, tip, timetable, carousel) | `spanish-social-content` |
| A Creativo English post | `english-course-content` |
| A Creativo German post | `german-course-brighter-future` |
| An Espacio course post | `espacio-accounting` |
| A reel | the matching video series: `creativo-reels`, `relatable-language-content` or `espacio-space` |
| Audience or planning documents | `language-audience-research` |

Only create a new project when the work is a genuinely new series: a new brand, a new course or a new
format. Categories (`video`, `design`, `strategy`) are fixed; never add one for a single post.

## 3. Match each image to its source

- The source is the exact Facebook post the design was published in. A post can hold several images,
  for example every slide of a carousel.
- Facebook image filenames such as `869797879_1614406060714909_…_n.jpg` contain a photo ID that sits
  next to the post's `fbid`, which is useful evidence.
- Never infer a link from neighbouring designs or upload order. If the post is unknown, leave
  `source` out and the tile simply shows no link.

## 4. Create the web images

```bash
python scripts/optimize-images.py add "Data/new design.png" image-21
```

This writes the full-size WebP (original resolution), the 720 px card preview and, for images wider
than 1600 px, a 1254 px copy for phones. It prints the line to add to `designSizes` in
`src/lib/media.ts`. Use the next free `image-NN` id; the script refuses to overwrite one.

Do not upscale, redraw or retouch artwork as routine. AI upscaling (Real-ESRGAN `realesr-animevideov3`,
2×) was used once for `image-15`–`image-19` after a side-by-side review; it flattens photographic areas,
so it was rejected for `image-20`. Any future use needs the same before/after check.

## 5. Add the content

In `src/lib/content.ts`, append to the series' `designs` list:

```ts
{ id:'image-21', caption:pair('Short English caption', 'وصف عربي قصير'), source:'https://www.facebook.com/photo?fbid=…' },
```

- `caption` describes what the design says or shows, in both languages, and doubles as its alt text.
- A carousel is one entry: `{ id:'image-21', slides:['image-22','image-23'], caption:…, source:… }`.
- Reel sources go in `matchedSources` in `src/lib/sources.ts`.
- Do not invent results, metrics or responsibilities.

## 6. Check it

```bash
npm run lint
npx tsc --noEmit
npm run build
```

`npm run build` runs `validateContent()` (`src/lib/validate-content.ts`). It fails the build if an image
file or size is missing, an image id is used twice, a source is not a Facebook URL, a caption is missing
a language, or a reel source points at media that is not on the site.

Then open the series page in English and Arabic at phone and desktop widths and check that:

- each tile shows the whole design
- "Original" under a tile opens that design's post
- the full-size viewer steps through the designs with the arrow keys.

## 7. Social card (only for a new series or a new cover)

```bash
python scripts/render-social-images.py <project-slug>
```

## Moving or merging a project

Keep old URLs working: add the old slug to `legacyProjects` in `src/lib/content.ts` with the series and
design it now lives in. The build creates a no-index redirect page for it.
