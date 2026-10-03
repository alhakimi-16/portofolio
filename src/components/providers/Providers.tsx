"use client";

import type { Locale } from "@/i18n/config";
import { I18nProvider } from "./I18nProvider";
import { SmoothScroll } from "./SmoothScroll";
import { ToastProvider } from "./Toast";

export function Providers({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <I18nProvider locale={locale}>
      <ToastProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </ToastProvider>
    </I18nProvider>
  );
}
