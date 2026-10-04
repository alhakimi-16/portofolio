# Mugahed Al-Hakimi · Portfolio

Personal website in **English and German** (`/en`, `/de`), with light and dark mode. A clean one-page
layout in blue, yellow and light purple (plus a little pastel green), with playful details:

- a "Hello!" that cycles through four languages, a colour ring with floating stickers;
- three highlights below the hero, a keyword ribbon and marker highlights in the about text;
- the focus sections: skills, projects and online courses;
- an ID card being scanned and stamped "verified" (my job at Nect) and a finance report stamped "on time"
  (my volunteer role at the VJSD);
- confetti when the email address is copied.

All motion is switched off for visitors who ask their system for reduced motion, and every piece of
content is visible without JavaScript.

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
stickers, the keyword ribbon, experience, skills, languages, projects and online courses. Every text
exists in English (`en`) and German (`de`). Labels such as section headings are in
[`src/i18n/ui.ts`](src/i18n/ui.ts); there, `*word*` in a heading gets the coloured, underlined style.

- **Photo:** put a square portrait in `public/`, e.g. `public/photo.jpg`, and set `photo: "/photo.jpg"`.
  Until then the initials are shown.
- **Projects and online courses:** add entries to `projects` and `courses` at the end of `profile.ts`
  (there is an example above each list). While a list is empty, the site shows an "in progress" card.

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

Next.js 16 (static pages) · React 19 · TypeScript · Tailwind CSS 4 · Lucide icons. Fonts: Bricolage
Grotesque and Geist, self-hosted via `next/font`. Animations are plain CSS plus a few small client
components; no animation library.
