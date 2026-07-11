export default function HeroVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
      aria-hidden="true"
    >
      <div className="absolute inset-8 rounded-full bg-bonero-green/8 animate-pulse-ring" />
      <div className="absolute inset-16 rounded-full border border-bonero-green/20" />

      <div className="absolute inset-0 animate-orbit">
        <span className="absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-bonero-green" />
        <span className="absolute bottom-8 left-10 h-2 w-2 rounded-full bg-bonero-dark/40" />
        <span className="absolute right-6 top-1/3 h-1.5 w-1.5 rounded-full bg-bonero-green/70" />
      </div>

      <svg
        viewBox="0 0 400 400"
        className="relative z-10 h-full w-full animate-float"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#188347" />
            <stop offset="100%" stopColor="#1C2A2B" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        <path
          d="M200 90 L120 170 L200 250 L280 170 Z"
          stroke="#188347"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <path
          d="M200 90 L200 250 M120 170 L280 170"
          stroke="#1C2A2B"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <path
          d="M200 250 L140 320 M200 250 L260 320"
          stroke="#188347"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />

        {/* Outer hexagon frame */}
        <path
          d="M200 48 L312 112 L312 240 L200 304 L88 240 L88 112 Z"
          stroke="#1C2A2B"
          strokeOpacity="0.1"
          strokeWidth="1.5"
        />

        {/* Center core */}
        <circle cx="200" cy="200" r="42" fill="url(#nodeGrad)" filter="url(#softGlow)" />
        <circle cx="200" cy="200" r="28" fill="#FFFFFF" fillOpacity="0.15" />
        <circle cx="200" cy="200" r="14" fill="#FFFFFF" fillOpacity="0.9" />

        {/* Nodes */}
        <circle cx="200" cy="90" r="14" fill="#188347" />
        <circle cx="120" cy="170" r="11" fill="#1C2A2B" />
        <circle cx="280" cy="170" r="11" fill="#1C2A2B" />
        <circle cx="200" cy="250" r="12" fill="#188347" />
        <circle cx="140" cy="320" r="9" fill="#188347" fillOpacity="0.7" />
        <circle cx="260" cy="320" r="9" fill="#1C2A2B" fillOpacity="0.55" />

        {/* AI spark accents */}
        <path
          d="M318 78 L324 92 L338 98 L324 104 L318 118 L312 104 L298 98 L312 92 Z"
          fill="#188347"
          fillOpacity="0.85"
        />
        <path
          d="M72 248 L76 258 L86 262 L76 266 L72 276 L68 266 L58 262 L68 258 Z"
          fill="#1C2A2B"
          fillOpacity="0.35"
        />
      </svg>
    </div>
  );
}
