/**
 * Minimal monitor illustration for the final chapter: a screen where code
 * types itself, in a loop. Editorial line style — squared corners, thin ink
 * strokes, a single vermilion accent + blinking cursor.
 */
export function DevScreen() {
  const ink = "#111111";
  const red = "#E34234";
  const D = 9; // seconds for one full typing loop

  interface CodeLine {
    x: number;
    y: number;
    w: number;
    c: string;
    t: [number, number]; // start/end of its typing window (fraction of D)
  }
  const lines: CodeLine[] = [
    { x: 60, y: 62, w: 66, c: red, t: [0.14, 0.26] },
    { x: 78, y: 80, w: 118, c: ink, t: [0.26, 0.4] },
    { x: 78, y: 98, w: 84, c: ink, t: [0.4, 0.53] },
    { x: 96, y: 116, w: 136, c: ink, t: [0.53, 0.66] },
    { x: 78, y: 134, w: 56, c: red, t: [0.66, 0.78] },
    { x: 60, y: 152, w: 92, c: ink, t: [0.78, 0.9] },
  ];

  return (
    <svg viewBox="0 0 340 268" fill="none" aria-hidden="true" className="h-auto w-full">
      {/* screen */}
      <rect
        x="40"
        y="32"
        width="260"
        height="172"
        fill="#F5F4F0"
        stroke={ink}
        strokeWidth="1.5"
      />
      {/* window controls */}
      <rect x="52" y="44" width="6" height="6" stroke={ink} strokeWidth="1.5" />
      <rect x="62" y="44" width="6" height="6" stroke={ink} strokeWidth="1.5" />
      <rect x="72" y="44" width="6" height="6" fill={red} />

      {/* typing code lines — each sweeps 0 → width during its window of the loop */}
      {lines.map((line, i) => (
        <rect
          key={i}
          x={line.x}
          y={line.y}
          height="4"
          width={line.w}
          fill={line.c}
        >
          <animate
            attributeName="width"
            values={`0;0;${line.w};${line.w}`}
            keyTimes={`0;${line.t[0]};${line.t[1]};1`}
            dur={`${D}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      {/* stand */}
      <line x1="170" y1="204" x2="170" y2="228" stroke={ink} strokeWidth="1.5" />
      <line x1="126" y1="228" x2="214" y2="228" stroke={ink} strokeWidth="1.5" />
      <line x1="112" y1="238" x2="228" y2="238" stroke={ink} strokeWidth="1.5" />

      {/* baseline accent */}
      <rect x="252" y="228" width="10" height="10" fill={red} />
    </svg>
  );
}
