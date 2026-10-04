import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "./fonts";
import { InlineScript } from "@/components/InlineScript";
import { dictionaries } from "@/i18n/ui";
import { bootScript } from "@/lib/boot";

export const metadata: Metadata = {
  title: "404 · Mugahed Al-Hakimi",
  robots: { index: false },
};

export default function GlobalNotFound() {
  const en = dictionaries.en.notFound;
  const de = dictionaries.de.notFound;
  const link = "border-b border-ink pb-1 label text-ink transition-colors hover:border-blue hover:text-blue-ink";

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <InlineScript html={bootScript} />
      </head>
      <body>
        <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 py-16">
          <p className="label text-muted">Error</p>
          <p className="mt-4 display text-[clamp(6rem,24vw,12rem)] leading-[0.85] text-ink">404</p>
          <div className="mt-8 h-px bg-ink" />
          <h1 className="mt-8 font-serif text-4xl text-ink">{en.title}</h1>
          <p className="mt-1 font-serif text-2xl text-violet-ink italic" lang="de">
            {de.title}
          </p>
          <p className="mt-6 text-muted">
            {en.text} <span lang="de">{de.text}</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-8">
            <Link href="/en" className={link}>
              {en.back} →
            </Link>
            <Link href="/de" lang="de" className={link}>
              {de.back} →
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
