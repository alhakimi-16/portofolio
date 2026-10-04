import { Fragment } from "react";

/** A spreadsheet formula with coloured function names and text values. */
export function Formula({ text }: { text: string }) {
  return text.split(/("[^"]*")/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-ink-yellow">
        {part}
      </span>
    ) : (
      <Fragment key={i}>
        {part.split(/([A-ZÄÖÜ][A-ZÄÖÜ0-9.]*(?=\())/).map((bit, j) =>
          j % 2 === 1 ? (
            <span key={j} className="font-semibold text-sel-ink">
              {bit}
            </span>
          ) : (
            bit
          ),
        )}
      </Fragment>
    ),
  );
}
