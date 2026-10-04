# Mugahed Al-Hakimi · Portfolio

Personal website in **English and German** (`/en`, `/de`). Simple, calm design: a sidebar with name,
photo and navigation, and a reading column with the CV content.

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

**All content lives in [`src/content/profile.ts`](src/content/profile.ts)**: profile text, experience,
education, skills, languages and certificates. Every text exists in English (`en`) and German (`de`).
Labels such as section headings are in [`src/i18n/ui.ts`](src/i18n/ui.ts).

- **Photo:** put a square portrait in `public/`, e.g. `public/photo.jpg`, and set `photo: "/photo.jpg"`.
  Until then the initials are shown.
- **Semester:** the profile text mentions the current semester; update it when it changes.

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

Next.js 16 (static pages) · React 19 · TypeScript · Tailwind CSS 4. Fonts: Newsreader and Geist,
self-hosted via `next/font`.
