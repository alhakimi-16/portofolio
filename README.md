# Mugahed Al-Hakimi · Portfolio

Personal website in **English and German** (`/en`, `/de`), with light and dark mode, laid out like a
magazine:

- the name set very large across the full width, a thin rule, the introduction and a numbered contents
  list;
- each section opens like a chapter: a rule, its number and label in a narrow column that stays in view,
  and a large title with one word in serif italic;
- four colours used sparingly: blue for structure and links, a yellow highlighter for key phrases, light
  purple for the italic words, and a little pastel green for "available now".

Motion is calm and never hides anything: sections settle in as they scroll into view, rules draw
themselves, the highlighter sweeps over key phrases, and "Hello" changes language. All motion is switched
off for visitors who ask their system for reduced motion, and every piece of content is visible without
JavaScript.

**Earlier designs** are kept as drafts, each on its own branch (and tag):

| Design                                         | Branch            | Tag               |
| ---------------------------------------------- | ----------------- | ----------------- |
| Colourful (blue, yellow, light purple)         | `draft/colourful` | `draft-colourful` |
| Spreadsheet workbook (formula bar, sheet tabs) | `draft/workbook`  | `draft-workbook`  |

To look at one again: `git checkout draft/workbook` (and `git checkout -` to come back).

## Run it locally

Requires **Node.js 20.9 or newer** (`node -v`).

```bash
git clone https://github.com/alhakimi-16/portofolio.git
cd portofolio
npm install
npm run dev
```

Open <http://localhost:3000>. It redirects to `/en` or `/de` based on the browser language.

| Command          | What it does                        |
| ---------------- | ----------------------------------- |
| `npm run dev`    | development server with hot reload  |
| `npm run build`  | production build (what Vercel runs) |
| `npm run start`  | serve the production build locally  |
| `npm run check`  | lint + type check + build           |
| `npm run format` | format all files with Prettier      |

## Edit the content

**All content lives in [`src/content/profile.ts`](src/content/profile.ts)**: profile text, highlights,
keywords, experience, skills, languages, projects and online courses. Every text exists in English
(`en`) and German (`de`); `==phrase==` in the about texts gets the yellow highlighter. Labels such as
section headings are in [`src/i18n/ui.ts`](src/i18n/ui.ts); there, `*word*` in a heading is set in serif
italic.

- **Photo:** put a portrait in `public/`, e.g. `public/photo.jpg`, and set `photo: "/photo.jpg"`. It
  appears above the contents list (portrait format, 4:5, works best). Without a photo the page simply
  leaves it out.
- **Projects and online courses:** add entries to `projects` and `courses` at the end of `profile.ts`
  (there is an example above each list). While a list is empty, the site shows a short "coming soon"
  note.

## Deploy on Vercel

1. Make sure the code is on the branch you want to publish (usually `main`).
2. Go to <https://vercel.com/new>, sign in with GitHub and import `alhakimi-16/portofolio`.
3. Keep the defaults (Vercel detects Next.js) and click **Deploy**.
4. Optional: add your own domain under _Project → Settings → Domains_ and set the environment variable
   `NEXT_PUBLIC_SITE_URL` (e.g. `https://mugahed.de`) so link previews and the sitemap use it.

Before the site goes public: a website reachable from Germany usually needs an **Impressum** and a short
**privacy notice**. The site sets no cookies, has no tracking and serves its fonts itself, so the privacy
notice can stay short.

## Tech

Next.js 16 (static pages) · React 19 · TypeScript · Tailwind CSS 4 · Lucide icons. Fonts: Archivo
(its width axis, stretched wide, gives the large uppercase type) and Source Serif 4 for reading,
self-hosted via `next/font`. Animations are plain CSS plus a few small client components; no animation
library.
