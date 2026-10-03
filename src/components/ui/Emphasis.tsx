import { Fragment } from "react";
import { parseEmphasis } from "@/lib/utils";

/** Renders "plain *accent* plain" with the accent in italic serif. */
export function Emphasis({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <>
      {parseEmphasis(text).map((part, i) =>
        part.em ? (
          <em key={i} className={accent ? "text-accent" : undefined}>
            {part.text}
          </em>
        ) : (
          <Fragment key={i}>{part.text}</Fragment>
        ),
      )}
    </>
  );
}
