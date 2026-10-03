import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "./fonts";
import { dictionaries } from "@/i18n/ui";

export const metadata: Metadata = {
  title: "404 — Mugahed Al-Hakimi",
  robots: { index: false },
};

export default function GlobalNotFound() {
  const en = dictionaries.en.notFound;
  const de = dictionaries.de.notFound;

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <main className="flex min-h-svh flex-col justify-between gutter py-8">
          <p className="flex justify-between label text-muted">
            <span>Error 404</span>
            <span>p &lt; 0.001</span>
          </p>
          <div>
            <p className="display text-[clamp(7rem,32vw,24rem)] leading-[0.8] text-accent">404</p>
            <h1 className="mt-8 display text-[clamp(2.5rem,6vw,5rem)]">{en.title}</h1>
            <p className="mt-4 text-lg text-muted">
              {en.text} <span lang="de">· {de.text}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/en" className="flex h-12 items-center rounded-full bg-fg px-5 text-bg">
              {en.back} →
            </Link>
            <Link href="/de" lang="de" className="flex h-12 items-center rounded-full border border-line-strong px-5">
              {de.back} →
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
