# Mugahed Al-Hakimi — Portfolio

Personal portfolio for a Data / AI / ML profile, built to be read by recruiters in **English and German**.

**Design concept: "Signal from noise."** The whole site borrows the visual language of data visualisation —
figure captions, axis labels, monospace annotations and a single signal-orange highlight, the way data
journalism uses colour. Every interactive piece is a small chart:

| Section    | Interaction                                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Preloader  | a model "trains" — epochs tick up, loss falls (first visit only)                                                                                       |
| Hero       | live ridgeline plot (pulsar-chart style): the cursor injects signal, clicks send a pulse, a crosshair reads out values                                 |
| About      | portrait drawn as halftone data points that react to the cursor; statement lights up word by word on scroll                                            |
| Work       | project list with a floating preview that follows the cursor, category filters, detail drawer                                                          |
| Experience | career timeline (mini Gantt chart) and a progress rail that fills while scrolling                                                                      |
| Skills     | force-directed "skill embedding" — bubbles organise themselves into clusters and can be dragged                                                        |
| Everywhere | smooth scrolling, magnetic buttons, custom cursor, light/dark mode, <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> command menu, <kbd>G</kbd> shows the layout grid |

Project covers are generated charts until real screenshots are added. Everything respects
`prefers-reduced-motion`, works with the keyboard, and the content is readable without JavaScript.

## Run it locally

Requires **Node.js 20.9 or newer** (`node -v`).

```bash
git clone https://github.com/alhakimi-16/portofolio.git
cd portofolio
npm install
npm run dev
```

Open <http://localhost:3000> — it redirects to `/en` or `/de` based on your browser language.

| Command          | What it does                        |
| ---------------- | ----------------------------------- |
| `npm run dev`    | development server with hot reload  |
| `npm run build`  | production build (what Vercel runs) |
| `npm run start`  | serve the production build locally  |
| `npm run check`  | lint + type check + build in one go |
| `npm run format` | format all files with Prettier      |

## Edit the content

**All personal content lives in [`src/content/profile.ts`](src/content/profile.ts)** — name, headline,
about text, projects, experience, education, certificates, skills and languages. Every text exists in
English (`en`) and German (`de`). Wrap words in `*asterisks*` to render them as the italic serif accent.

Interface labels (navigation, buttons) are in [`src/i18n/ui.ts`](src/i18n/ui.ts).

- **Photo:** put a portrait (about 4:5) in `public/`, e.g. `public/portrait.jpg`, and set
  `portrait: "/portrait.jpg"`. It is rendered as an interactive halftone.
- **CV:** put PDFs in `public/cv/` and set `cv: { en: "/cv/…-EN.pdf", de: "/cv/…-DE.pdf" }`. The
  "Download CV" buttons appear automatically.
- **Project screenshots:** put images (16:10 works best) in `public/projects/` and set `image` on the
  project. Without an image the project gets a generated chart cover (`art: "bars" | "network" | "line" |
"heatmap" | "scatter" | "curve"`).
- **Draft mode:** while `draft = true` the site shows a "Draft — sample content" badge and tells search
  engines not to index it. Set it to `false` once all sample content is replaced.

## Deploy on Vercel

1. Make sure the code is on the branch you want to publish (usually `main`).
2. Go to <https://vercel.com/new>, sign in with GitHub and import `alhakimi-16/portofolio`.
3. Keep the defaults (Vercel detects Next.js) and click **Deploy**.
4. Optional: add your own domain under _Project → Settings → Domains_, then set the environment variable
   `NEXT_PUBLIC_SITE_URL` (e.g. `https://mugahed.dev`) so share previews and the sitemap use that domain.

Every push to the production branch (the repository's default branch) redeploys automatically; other
branches get their own preview URLs.

### Before going public (Germany)

- Replace every `SAMPLE` entry in `src/content/profile.ts` and set `draft = false`.
- A site that is publicly reachable from Germany usually needs an **Impressum** (§ 5 DDG) and a short
  **privacy notice**. The site sets no cookies, has no analytics and loads its fonts from its own domain
  (no Google requests from visitors), so the privacy notice can stay short — but it should exist.

## Tech

Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger,
SplitText) · Lenis · d3-force · simplex-noise · Canvas 2D. Fonts: Archivo, Instrument Serif, JetBrains
Mono (self-hosted via `next/font`).

```
src/
├─ app/
│  ├─ [locale]/          page, layout, share image (one static page per language)
│  ├─ global-not-found.tsx
│  ├─ globals.css        design tokens (dark "ink" / light "paper"), utilities
│  ├─ sitemap.ts, robots.ts, icon.svg
├─ content/profile.ts    ← your content
├─ i18n/                 languages + interface strings
├─ components/
│  ├─ canvas/            ridgelines, halftone portrait, generated project art
│  ├─ layout/            header, preloader, cursor, command menu, footer
│  ├─ sections/          hero, about, work, experience, skills, education, contact
│  └─ ui/                small building blocks (reveal, magnetic, marquee, …)
├─ lib/                  gsap setup, scroll lock, theme, helpers
└─ proxy.ts              redirects "/" to the visitor's language
```
