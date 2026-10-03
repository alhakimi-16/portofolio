"use client";

import { useEffect, useState } from "react";

/** Developer easter egg: press "G" (or use the command menu) to show the 12-column grid. */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible((value) => !value);
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "g" || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, [contenteditable]")) return;
      toggle();
    };
    window.addEventListener("grid:toggle", toggle);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("grid:toggle", toggle);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!visible) return null;
  return (
    <div className="layout-grid" aria-hidden>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} />
      ))}
    </div>
  );
}
