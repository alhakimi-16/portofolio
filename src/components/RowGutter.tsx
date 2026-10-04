/** Row numbers down the left edge of the sheet (wide screens only). */
export function RowGutter() {
  return (
    <div aria-hidden className="relative hidden overflow-hidden border-r border-line bg-head lg:block">
      {/* positioned, so the numbers never make the page taller than the sheet */}
      <div className="absolute inset-x-0 top-0">
        <span
          id="row-mark"
          className="absolute inset-x-0 top-0 h-0 bg-fill-green transition-[top,height] duration-200"
        />
        {Array.from({ length: 260 }, (_, i) => (
          <span
            key={i}
            className="relative flex h-10 items-center justify-center border-b border-line font-mono text-[0.6875rem] text-head-ink"
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
