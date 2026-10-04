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
    "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 font-semibold text-fg transition-colors hover:border-fg";

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <InlineScript html={bootScript} />
      </head>
      <body>
        <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center px-6 py-16">
          <p className="shimmer-text font-display text-[7rem] leading-none font-extrabold tracking-[-0.05em]">404</p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight">{en.title}</h1>
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
