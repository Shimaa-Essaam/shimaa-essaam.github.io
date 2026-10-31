---
name: add-portfolio-work
description: Add new designs, carousels, reels or Facebook posts to the Shimaa Essam portfolio. Use when the user supplies new files in Data/ or new Facebook links to show on the site.
---

# Add portfolio work

Follow `docs/adding-work.md` step by step. It is the source of truth; this skill only adds the rules that
are easy to forget.

1. **Look before deciding.** View every new image (contact sheet or Read) and note brand, course
   language, headline and format. Use original exports from `Data/`, never screenshots or Facebook copies.
2. **Add to an existing series.** A new post is a new entry in a project's `designs` list, not a new
   project, category or page section. Use the table in the doc. Create a project only for a genuinely
   new brand, course or format, and ask the user first.
3. **Map sources explicitly.** Each design entry carries its own `source`. Only use a URL the user gave
   for that exact design, or one supported by evidence such as the photo ID in a Facebook filename.
   Never infer it from order or neighbours. If unsure, omit it and tell the user which design lacks a source.
4. **Images:** run `python scripts/optimize-images.py add <file> <next image id>` and paste the printed
   `designSizes` line. No AI upscaling or retouching without a reviewed before/after comparison.
5. **Copy:** a short bilingual caption per design describing what it shows (it is also the alt text).
   Do not invent results, metrics, client details or responsibilities.
6. **Verify:** run `npm run lint`, `npx tsc --noEmit` and `npm run build` (the build validates the content
   data), then check the series page in English and Arabic at 390 px and 1440 px: whole design visible,
   correct "Original" link under each tile, viewer arrows work.
7. **Commit only the new assets and data changes.** Never commit `Data/`, `.claude/settings.json` or
   scratch files. Push to `main` only when the user approves; GitHub Actions deploys it.
