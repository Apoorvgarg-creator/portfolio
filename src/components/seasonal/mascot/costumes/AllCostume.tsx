"use client";

export default function AllCostume() {
  return (
    <g>
      {/* Mixed mini accents tucked into the red hatband */}
      {/* Snowflake */}
      <g transform="translate(28, 22)">
        <path
          d="M0 -4 L0 4 M-4 0 L4 0 M-2.8 -2.8 L2.8 2.8 M2.8 -2.8 L-2.8 2.8"
          stroke="#7cc8ff"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      {/* Cherry blossom */}
      <g transform="translate(42, 21)">
        {[0, 72, 144, 216, 288].map((d) => (
          <ellipse
            key={d}
            cx="0"
            cy="-2.6"
            rx="1.7"
            ry="2.4"
            fill="#ff8fb1"
            transform={`rotate(${d})`}
            stroke="rgba(180,80,110,0.45)"
            strokeWidth="0.35"
          />
        ))}
        <circle cx="0" cy="0" r="1.2" fill="#fff58a" />
      </g>
      {/* Sun */}
      <g transform="translate(58, 21)">
        <circle cx="0" cy="0" r="2.6" fill="#ffd66b" stroke="#e8a92a" strokeWidth="0.5" />
        <path
          d="M0 -5 L0 -3.4 M0 3.4 L0 5 M-5 0 L-3.4 0 M3.4 0 L5 0 M-3.6 -3.6 L-2.4 -2.4 M2.4 2.4 L3.6 3.6 M-3.6 3.6 L-2.4 2.4 M2.4 -2.4 L3.6 -3.6"
          stroke="#e8a92a"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </g>
      {/* Maple leaf */}
      <g transform="translate(72, 22) scale(0.42)">
        <path
          d="M0 -10 L3 -4 L8 -2 L4 1 L9 4 L3 4 L3 9 L0 6 L-3 9 L-3 4 L-9 4 L-4 1 L-8 -2 L-3 -4 Z"
          fill="#ff7733"
          stroke="#a83a14"
          strokeWidth="1.1"
        />
      </g>
    </g>
  );
}
