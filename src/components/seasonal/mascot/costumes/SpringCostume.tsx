"use client";

export default function SpringCostume() {
  return (
    <g>
      {/* Cherry blossoms tucked into the red hatband */}
      {[
        { cx: 30, cy: 22, color: "#ff8fb1", center: "#fff58a", scale: 0.95 },
        { cx: 42, cy: 19, color: "#ffd2e0", center: "#ffd66b", scale: 1 },
        { cx: 56, cy: 19, color: "#ff8fb1", center: "#fff58a", scale: 1 },
        { cx: 68, cy: 21, color: "#ffffff", center: "#ffd66b", scale: 0.85 },
      ].map((f, i) => (
        <g key={i} transform={`translate(${f.cx}, ${f.cy}) scale(${f.scale})`}>
          {[0, 72, 144, 216, 288].map((p) => (
            <ellipse
              key={p}
              cx="0"
              cy="-3.5"
              rx="2.2"
              ry="3.2"
              fill={f.color}
              stroke="rgba(180,80,110,0.4)"
              strokeWidth="0.5"
              transform={`rotate(${p})`}
            />
          ))}
          <circle cx="0" cy="0" r="1.6" fill={f.center} />
        </g>
      ))}
      {/* Tiny green leaf accent */}
      <path
        d="M22 24 Q18 22 20 19 Q24 19 24 23 Z"
        fill="#82bd5a"
        stroke="rgba(60,100,40,0.45)"
        strokeWidth="0.5"
      />
      <path
        d="M78 24 Q82 22 80 19 Q76 19 76 23 Z"
        fill="#82bd5a"
        stroke="rgba(60,100,40,0.45)"
        strokeWidth="0.5"
      />
    </g>
  );
}
