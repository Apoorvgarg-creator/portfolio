"use client";

export default function WinterCostume() {
  return (
    <g>
      {/* Snow accents on the brim */}
      <circle cx="14" cy="26" r="1.6" fill="#ffffff" />
      <circle cx="86" cy="26" r="1.6" fill="#ffffff" />
      <circle cx="32" cy="29" r="1.2" fill="#ffffff" />
      <circle cx="68" cy="29" r="1.2" fill="#ffffff" />
      <path
        d="M50 5 L50 11 M47 8 L53 8"
        stroke="#ffffff"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Red & white striped scarf wrapped around neck (over vest collar) */}
      <path
        d="M22 70 Q34 78 50 78 Q66 78 78 70 L80 80 Q66 86 50 86 Q34 86 20 80 Z"
        fill="#d83a3a"
        stroke="rgba(80,15,15,0.5)"
        strokeWidth="0.8"
      />
      {/* Scarf white stripes */}
      <path
        d="M28 76 L31 80 M40 78 L43 82 M58 78 L61 82 M70 76 L73 80"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Trailing scarf tail */}
      <path
        d="M70 80 L86 96 L82 102 L66 86 Z"
        fill="#d83a3a"
        stroke="rgba(80,15,15,0.5)"
        strokeWidth="0.7"
      />
      <path
        d="M74 88 L78 92 M70 84 L74 88"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Fringes at scarf end */}
      <path
        d="M82 102 L80 106 M84 100 L83 105 M86 98 L86 103"
        stroke="#d83a3a"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </g>
  );
}
