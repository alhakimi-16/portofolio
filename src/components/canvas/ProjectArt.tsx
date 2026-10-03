import type { ArtKind } from "@/content/types";
import { gaussian, hashString, mulberry32 } from "@/lib/random";

/**
 * Deterministic, generated chart "covers" for projects without screenshots.
 * Rendered on the server only (passed to client components as React nodes),
 * so there is never a hydration mismatch.
 */
const W = 400;
const H = 250;
const r1 = (n: number) => Math.round(n * 10) / 10;

export function ProjectArt({ kind, seed, className }: { kind: ArtKind; seed: string; className?: string }) {
  const rand = mulberry32(hashString(seed));
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className ?? "block size-full"}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${kind} chart`}
    >
      <rect width={W} height={H} className="fill-elevated" />
      <Grid />
      {kind === "bars" && <Bars rand={rand} />}
      {kind === "network" && <Network rand={rand} />}
      {kind === "line" && <Forecast rand={rand} />}
      {kind === "heatmap" && <Heatmap rand={rand} />}
      {kind === "scatter" && <Scatter rand={rand} />}
      {kind === "curve" && <Roc rand={rand} />}
    </svg>
  );
}

function Grid() {
  const xs = Array.from({ length: 9 }, (_, i) => 40 + i * 40);
  const ys = Array.from({ length: 5 }, (_, i) => 30 + i * 45);
  return (
    <g className="stroke-line" strokeWidth={0.6}>
      {xs.map((x) => (
        <line key={`x${x}`} x1={x} y1={20} x2={x} y2={H - 30} />
      ))}
      {ys.map((y) => (
        <line key={`y${y}`} x1={30} y1={y} x2={W - 20} y2={y} />
      ))}
    </g>
  );
}

function Caption({ children, x = 30, y = H - 12 }: { children: React.ReactNode; x?: number; y?: number }) {
  return (
    <text x={x} y={y} className="fill-muted font-mono" fontSize={8} letterSpacing={0.5}>
      {children}
    </text>
  );
}

function Bars({ rand }: { rand: () => number }) {
  const names = ["tenure", "usage_30d", "tickets", "plan_tier", "discount", "logins", "region", "age"];
  const values = names.map(() => 0.15 + rand() * 0.85).sort((a, b) => b - a);
  const barH = 17;
  return (
    <g>
      <line x1={110} y1={22} x2={110} y2={H - 34} className="stroke-line-strong" strokeWidth={1} />
      {names.map((name, i) => {
        const y = 26 + i * (barH + 7);
        const w = values[i] * 240;
        return (
          <g key={name}>
            <text x={102} y={y + barH * 0.68} textAnchor="end" className="fill-muted font-mono" fontSize={8.5}>
              {name}
            </text>
            <rect
              x={110}
              y={y}
              width={r1(w)}
              height={barH}
              className={i === 0 ? "fill-accent" : "fill-fg"}
              opacity={i === 0 ? 1 : 0.85 - i * 0.07}
            />
            <text x={r1(116 + w)} y={y + barH * 0.68} className="fill-fg font-mono" fontSize={8}>
              {values[i].toFixed(2)}
            </text>
          </g>
        );
      })}
      <Caption>feature importance · mean |SHAP|</Caption>
    </g>
  );
}

function Network({ rand }: { rand: () => number }) {
  const centers = [
    [110, 90],
    [270, 70],
    [300, 170],
    [140, 180],
  ];
  const nodes = Array.from({ length: 40 }, (_, i) => {
    const [cx, cy] = centers[i % centers.length];
    return { x: r1(cx + gaussian(rand) * 30), y: r1(cy + gaussian(rand) * 22), r: r1(2 + rand() * 3.5) };
  });
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    nodes.forEach((b, j) => {
      if (j <= i) return;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 58 && rand() > 0.3) edges.push([i, j]);
    });
  });
  const path = [0, 4, 8, 5, 9, 13];
  return (
    <g>
      {edges.map(([i, j]) => (
        <line
          key={`${i}-${j}`}
          x1={nodes[i].x}
          y1={nodes[i].y}
          x2={nodes[j].x}
          y2={nodes[j].y}
          className="stroke-fg"
          strokeWidth={0.6}
          opacity={0.35}
        />
      ))}
      <polyline
        points={path.map((i) => `${nodes[i].x},${nodes[i].y}`).join(" ")}
        fill="none"
        className="stroke-accent"
        strokeWidth={1.6}
      />
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={path.includes(i) ? n.r + 1.5 : n.r}
          className={path.includes(i) ? "fill-accent" : "fill-fg"}
        />
      ))}
      <Caption>retrieval graph · query → chunks → answer</Caption>
    </g>
  );
}

function Forecast({ rand }: { rand: () => number }) {
  const n = 60;
  const split = 44;
  const values: number[] = [];
  let level = 0;
  for (let i = 0; i < n; i++) {
    level += gaussian(rand) * 0.05;
    values.push(0.5 + level + Math.sin(i / 3.2) * 0.14 + gaussian(rand) * 0.03);
  }
  const x = (i: number) => r1(30 + (i / (n - 1)) * (W - 50));
  const y = (v: number) => r1(H - 40 - v * (H - 80));
  const history = values
    .slice(0, split + 1)
    .map((v, i) => `${x(i)},${y(v)}`)
    .join(" ");
  const future = values
    .slice(split)
    .map((v, i) => `${x(split + i)},${y(v)}`)
    .join(" ");
  const upper = values.slice(split).map((v, i) => `${x(split + i)},${y(v + 0.04 + i * 0.012)}`);
  const lower = values
    .slice(split)
    .map((v, i) => `${x(split + i)},${y(v - 0.04 - i * 0.012)}`)
    .reverse();
  return (
    <g>
      <polygon points={[...upper, ...lower].join(" ")} className="fill-accent" opacity={0.18} />
      <polyline points={history} fill="none" className="stroke-fg" strokeWidth={1.4} />
      <polyline points={future} fill="none" className="stroke-accent" strokeWidth={1.6} strokeDasharray="4 3" />
      <line
        x1={x(split)}
        y1={20}
        x2={x(split)}
        y2={H - 30}
        className="stroke-muted"
        strokeDasharray="2 3"
        strokeWidth={0.8}
      />
      <text x={x(split) + 4} y={30} className="fill-muted font-mono" fontSize={8}>
        now
      </text>
      <Caption>weekly demand · forecast with 80% interval</Caption>
    </g>
  );
}

function Heatmap({ rand }: { rand: () => number }) {
  const cols = 18;
  const rows = 10;
  const cw = (W - 60) / cols;
  const ch = (H - 60) / rows;
  const bx = 4 + rand() * 9;
  const by = 2 + rand() * 6;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = Math.exp(-((c - bx) ** 2) / 14 - (r - by) ** 2 / 6) * 0.95 + rand() * 0.12;
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={r1(30 + c * cw + 0.8)}
          y={r1(22 + r * ch + 0.8)}
          width={r1(cw - 1.6)}
          height={r1(ch - 1.6)}
          className={v > 0.62 ? "fill-accent" : "fill-fg"}
          opacity={r1(v > 0.62 ? 0.55 + v * 0.45 : 0.06 + v * 0.75)}
        />,
      );
    }
  }
  return (
    <g>
      {cells}
      <rect
        x={r1(30 + (bx - 2.5) * cw)}
        y={r1(22 + (by - 2) * ch)}
        width={r1(cw * 5)}
        height={r1(ch * 4)}
        fill="none"
        className="stroke-accent"
        strokeWidth={1.2}
      />
      <Caption>grad-cam activation · defect localised</Caption>
    </g>
  );
}

function Scatter({ rand }: { rand: () => number }) {
  const clusters = [
    { x: 110, y: 85, s: 22 },
    { x: 260, y: 70, s: 18 },
    { x: 300, y: 165, s: 24 },
    { x: 150, y: 175, s: 20 },
  ];
  const highlighted = Math.floor(rand() * clusters.length);
  return (
    <g>
      {clusters.map((cluster, ci) =>
        Array.from({ length: 42 }, (_, i) => (
          <circle
            key={`${ci}-${i}`}
            cx={r1(cluster.x + gaussian(rand) * cluster.s)}
            cy={r1(cluster.y + gaussian(rand) * cluster.s * 0.75)}
            r={ci === highlighted ? 2.4 : 1.9}
            className={ci === highlighted ? "fill-accent" : "fill-fg"}
            opacity={ci === highlighted ? 0.95 : 0.55}
          />
        )),
      )}
      {clusters.map((cluster, ci) => (
        <text
          key={ci}
          x={cluster.x + cluster.s + 6}
          y={cluster.y - cluster.s * 0.6}
          className={ci === highlighted ? "fill-accent font-mono" : "fill-muted font-mono"}
          fontSize={8}
        >
          c{ci + 1}
        </text>
      ))}
      <Caption>umap projection · hdbscan clusters</Caption>
    </g>
  );
}

function Roc({ rand }: { rand: () => number }) {
  const bend = 2.2 + rand() * 1.6;
  const pts = Array.from({ length: 41 }, (_, i) => {
    const fpr = i / 40;
    const tpr = 1 - Math.pow(1 - fpr, bend);
    return [r1(40 + fpr * 320), r1(H - 35 - tpr * 190)];
  });
  return (
    <g>
      <polygon
        points={[...pts.map((p) => p.join(",")), `360,${H - 35}`, `40,${H - 35}`].join(" ")}
        className="fill-accent"
        opacity={0.14}
      />
      <line
        x1={40}
        y1={H - 35}
        x2={360}
        y2={H - 225}
        className="stroke-muted"
        strokeDasharray="3 3"
        strokeWidth={0.8}
      />
      <polyline
        points={pts.map((p) => p.join(",")).join(" ")}
        fill="none"
        className="stroke-accent"
        strokeWidth={1.8}
      />
      <Caption>roc curve · auc {(1 - 1 / (bend + 1)).toFixed(2)}</Caption>
    </g>
  );
}
