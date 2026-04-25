"use client";

export default function AutumnCostume() {
  return (
    <g>
      {/* Maple leaf pinned to the side of the red hatband */}
      <g transform="translate(74, 22) rotate(20) scale(0.6)">
        <path
          d="M0 -16 L4 -7 L11 -4 L6 0 L13 5 L5 5 L4 14 L0 9 L-4 14 L-5 5 L-13 5 L-6 0 L-11 -4 L-4 -7 Z"
          fill="#ff7733"
          stroke="#a83a14"
          strokeWidth="1.1"
        />
        <path d="M0 -16 L0 14" stroke="#a83a14" strokeWidth="0.9" />
      </g>
      {/* Smaller secondary maple on the other side */}
      <g transform="translate(28, 23) rotate(-12) scale(0.4)">
        <path
          d="M0 -16 L4 -7 L11 -4 L6 0 L13 5 L5 5 L4 14 L0 9 L-4 14 L-5 5 L-13 5 L-6 0 L-11 -4 L-4 -7 Z"
          fill="#fcb75b"
          stroke="#a86b1c"
          strokeWidth="1.2"
        />
      </g>
      {/* A few drifting leaves around shoulder */}
      <g transform="translate(86, 78) rotate(40) scale(0.35)">
        <path
          d="M0 -16 L4 -7 L11 -4 L6 0 L13 5 L5 5 L4 14 L0 9 L-4 14 L-5 5 L-13 5 L-6 0 L-11 -4 L-4 -7 Z"
          fill="#d44a1e"
          stroke="#7a2410"
          strokeWidth="1.5"
        />
      </g>
    </g>
  );
}
