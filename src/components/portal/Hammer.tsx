export default function Hammer({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 360"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="head-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8e8ec" />
          <stop offset="45%" stopColor="#9a9aa6" />
          <stop offset="100%" stopColor="#3a3a44" />
        </linearGradient>
        <linearGradient id="head-edge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1a1a1f" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="shaft-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3c2516" />
          <stop offset="50%" stopColor="#6b3f24" />
          <stop offset="100%" stopColor="#2a1a0e" />
        </linearGradient>
        <linearGradient id="wrap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0f08" />
          <stop offset="100%" stopColor="#3a2516" />
        </linearGradient>
        <filter id="head-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Wooden shaft */}
      <rect
        x="108"
        y="110"
        width="24"
        height="220"
        rx="3"
        fill="url(#shaft-grad)"
      />
      {/* Shaft wood grain */}
      <rect x="115" y="120" width="2" height="200" fill="#1d1208" opacity="0.5" />
      <rect x="123" y="120" width="1" height="200" fill="#1d1208" opacity="0.35" />

      {/* Grip wrap */}
      <rect x="102" y="240" width="36" height="90" rx="4" fill="url(#wrap-grad)" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={i}
          x1="102"
          y1={250 + i * 11}
          x2="138"
          y2={245 + i * 11}
          stroke="#0a0500"
          strokeWidth="1.5"
          opacity="0.7"
        />
      ))}
      {/* Pommel */}
      <ellipse cx="120" cy="332" rx="22" ry="8" fill="#1a0f08" />

      {/* Hammer head shadow */}
      <rect
        x="14"
        y="32"
        width="212"
        height="92"
        rx="6"
        fill="#000"
        opacity="0.35"
        filter="url(#head-shadow)"
      />

      {/* Hammer head */}
      <path
        d="M 18 40 L 60 30 L 180 30 L 222 40 L 226 110 L 180 120 L 60 120 L 14 110 Z"
        fill="url(#head-grad)"
        stroke="#1a1a20"
        strokeWidth="1.5"
      />
      {/* Highlight band */}
      <rect x="22" y="42" width="200" height="14" fill="url(#head-edge)" opacity="0.55" />
      {/* Rivets */}
      <circle cx="104" cy="75" r="5" fill="#23232a" stroke="#0a0a0e" strokeWidth="1" />
      <circle cx="136" cy="75" r="5" fill="#23232a" stroke="#0a0a0e" strokeWidth="1" />
      {/* Decorative rune lines */}
      <path
        d="M 40 90 L 60 100 M 60 90 L 80 100 M 160 90 L 180 100 M 180 90 L 200 100"
        stroke="#1f1f25"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
