import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "./fonts";
import { dictionaries } from "@/i18n/ui";

export const metadata: Metadata = {
  title: "404 · Mugahed Al-Hakimi",
  robots: { index: false },
};

export default function GlobalNotFound() {
  const en = dictionaries.en.notFound;
  const de = dictionaries.de.notFound;

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center px-6 py-16">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase">404</p>
          <h1 className="mt-4 font-serif text-5xl font-medium">{en.title}</h1>
          <p className="mt-3" lang="de">
            {de.title}
          </p>
          <p className="mt-6">
            {en.text} <span lang="de">{de.text}</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-6 text-fg">
            <Link href="/en" className="underline decoration-line underline-offset-4 hover:text-accent">
              {en.back} →
            </Link>
            <Link href="/de" lang="de" className="underline decoration-line underline-offset-4 hover:text-accent">
              {de.back} →
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
