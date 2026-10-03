"use client";

/**
 * Runs a small script during HTML parsing (before first paint) on full page loads.
 * On the client it renders as inert text/plain, so React never tries to execute it again.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
