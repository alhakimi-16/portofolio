/** A ticker line of keywords, like a stock ticker: every skill is on the way up. */
export function Ticker({ items }: { items: { text: string }[] }) {
  const row = (copy: boolean) => (
    <ul
      aria-hidden={copy || undefined}
      className="flex shrink-0 animate-[ticker_50s_linear_infinite] items-stretch group-hover:[animation-play-state:paused]"
    >
      {items.map((item) => (
        <li
          key={item.text}
          className="flex items-center gap-2 border-r border-line px-5 py-2.5 font-mono text-[0.8125rem] font-medium tracking-wide whitespace-nowrap text-ink uppercase"
        >
          <span aria-hidden className="text-[0.625rem] text-sel">
            ▲
          </span>
          {item.text}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group overflow-hidden border-y border-line bg-head">
      <div className="flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
