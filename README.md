# Shimaa Essam — Content Creator

[View the portfolio](https://shimaa-essaam.github.io/)

A responsive portfolio featuring scripts, social media designs, short-form videos, and content planning. Includes English and Arabic pages, light and dark themes, and email and WhatsApp contact options.

## Technology

TypeScript, React, Next.js (static export) and plain CSS. The website is exported as static files and hosted on GitHub Pages. English pages live at `/` and Arabic pages at `/ar/`; each language has its own root layout so `<html lang dir>` is correct in the static HTML.

## Local development

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run lint` to check the source and `npm run build` to generate the website in `out/`.

## Editing content

- `src/lib/content.ts`: projects, services, and contact information. Each project has optional `outcome` and `testimonial` fields: they are placeholders and only appear on the case-study page once filled with real, attributable content.
- `src/lib/sources.ts`: Facebook pages and original work links.
- `src/lib/seo.ts`: page titles, descriptions, social cards and structured data.
- `src/components/pages/`: bilingual page content; `src/components/`: shared UI.
- `src/app/(en)` and `src/app/(ar)/ar`: thin route files for each language.
- `src/app/globals.css`: visual styling, organised in numbered sections with design tokens at the top.
- `public/`: website images, videos, and downloadable documents.

After adding or replacing media, regenerate the derived images:

```sh
python scripts/optimize-images.py        # card thumbnails and reel posters (Pillow)
python scripts/render-social-images.py   # social preview cards + apple icon (Playwright)
```

The contact form opens an email draft or WhatsApp message for the visitor to send; it does not require a server.

Research notes and the improvement plan behind the current design are in `docs/`.

## Publishing

Pushing to `main` runs `.github/workflows/pages.yml`. GitHub Actions installs dependencies, checks the source, builds the static website, and deploys `out/` to GitHub Pages. In repository Settings → Pages, the publishing source is **GitHub Actions**.

Generated files (`out/`, `.next/`, and `node_modules/`), private environment files, and original working materials (`Data/`) are excluded from version control. Only the source code and prepared public assets belong in this repository.
