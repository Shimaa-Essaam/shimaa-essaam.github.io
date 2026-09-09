# Shimaa Essam — Content Creator

[View the portfolio](https://shimaa-essaam.github.io/)

A responsive portfolio featuring scripts, social media designs, short-form videos, and content planning. Includes English and Arabic pages, light and dark themes, and email and WhatsApp contact options.

## Technology

TypeScript, React, Next.js, CSS, and Tailwind CSS. The website is exported as static files and hosted on GitHub Pages.

## Local development

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run lint` to check the source and `npm run build` to generate the website in `out/`.

## Editing content

- `src/lib/content.ts`: projects, services, and contact information.
- `src/lib/sources.ts`: Facebook pages and original work links.
- `src/components/`: bilingual page content and interactive components.
- `src/app/globals.css`: visual styling and responsive layouts.
- `public/`: website images, videos, and downloadable documents.

The contact form opens an email draft or WhatsApp message for the visitor to send; it does not require a server.

## Publishing

Pushing to `main` runs `.github/workflows/pages.yml`. GitHub Actions installs dependencies, checks the source, builds the static website, and deploys `out/` to GitHub Pages. In repository Settings → Pages, the publishing source is **GitHub Actions**.

Generated files (`out/`, `.next/`, and `node_modules/`), private environment files, and original working materials (`Data/`) are excluded from version control. Only the source code and prepared public assets belong in this repository.
