"use client";

export default function SummerCostume() {
  return (
    <g>
      {/* Sunglasses pushed up onto the brim of the straw hat */}
      <path
        d="M30 27 L70 27"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="40" cy="27" rx="7.5" ry="5" fill="#1a1a1a" stroke="#000" strokeWidth="0.7" />
      <ellipse cx="40" cy="26" rx="2.5" ry="1.6" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="60" cy="27" rx="7.5" ry="5" fill="#1a1a1a" stroke="#000" strokeWidth="0.7" />
      <ellipse cx="60" cy="26" rx="2.5" ry="1.6" fill="rgba(255,255,255,0.4)" />
      {/* Earpieces */}
      <path
        d="M14 28 L32 28"
        stroke="#1a1a1a"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M68 28 L86 28"
        stroke="#1a1a1a"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Tropical flower tucked into the hatband */}
      <g transform="translate(72, 22)">
        {[0, 72, 144, 216, 288].map((d) => (
          <ellipse
            key={d}
            cx="0"
            cy="-3"
            rx="2.2"
            ry="3.2"
            fill="#ff5e87"
            stroke="rgba(120,40,60,0.5)"
            strokeWidth="0.4"
            transform={`rotate(${d})`}
          />
        ))}
        <circle cx="0" cy="0" r="1.5" fill="#ffd66b" />
      </g>
    </g>
  );
}
