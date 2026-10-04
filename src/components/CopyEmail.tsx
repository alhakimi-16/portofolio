"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";
import { cn, prefersReducedMotion, vars } from "@/lib/utils";

type Piece = { dx: number; dy: number; rot: number; color: string; width: number; height: number; round: boolean };
type Burst = { id: number; pieces: Piece[] };

const colors = ["var(--blue)", "var(--mint)", "var(--sun)", "var(--coral)"];

function makePieces(): Piece[] {
  return Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 70 + Math.random() * 70;
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance - 40,
      rot: Math.random() * 720 - 360,
      color: colors[i % colors.length],
      width: 6 + Math.random() * 5,
      height: i % 3 === 0 ? 6 + Math.random() * 5 : 4,
      round: i % 3 === 0,
    };
  });
}

/** Copies the email address, with a small confetti burst. */
export function CopyEmail({
  email,
  label,
  doneLabel,
  className,
}: {
  email: string;
  label: string;
  doneLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    if (!(await copyText(email))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
    if (prefersReducedMotion()) return;
    const id = Date.now();
    setBursts((current) => [...current, { id, pieces: makePieces() }]);
    window.setTimeout(() => setBursts((current) => current.filter((burst) => burst.id !== id)), 1200);
  }

  return (
    <button type="button" onClick={() => void copy()} className={cn("relative", className)}>
      {copied ? <Check aria-hidden className="size-4" strokeWidth={2.6} /> : <Copy aria-hidden className="size-4" />}
      <span aria-live="polite">{copied ? doneLabel : label}</span>
      {bursts.map((burst) => (
        <span key={burst.id} aria-hidden className="pointer-events-none absolute top-1/2 left-1/2">
          {burst.pieces.map((piece, i) => (
            <span
              key={i}
              className="absolute block -translate-1/2 animate-[confetti_1s_cubic-bezier(0.15,0.7,0.3,1)_forwards]"
              style={{
                width: piece.width,
                height: piece.height,
                background: piece.color,
                borderRadius: piece.round ? "50%" : 1,
                ...vars({ "--dx": `${piece.dx}px`, "--dy": `${piece.dy}px`, "--rot": `${piece.rot}deg` }),
              }}
            />
          ))}
        </span>
      ))}
    </button>
  );
}
