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
  const link =
    "inline-flex items-center gap-2 border border-line bg-paper px-4 py-2.5 font-semibold text-ink transition-colors hover:border-sel hover:text-sel-ink";

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <InlineScript html={bootScript} />
      </head>
      <body>
        <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center px-6 py-16">
          <p className="font-mono text-sm text-muted">=VLOOKUP(&quot;page&quot;, site, 1) → #N/A</p>
          <p className="mt-4 display text-[7rem] leading-none text-note">#404</p>
          <h1 className="mt-6 display text-4xl text-ink">{en.title}</h1>
          <p className="mt-1 text-lg" lang="de">
            {de.title}
          </p>
          <p className="mt-6">
            {en.text} <span lang="de">{de.text}</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
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
