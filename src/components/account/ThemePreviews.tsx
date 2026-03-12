export function LightPreview() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="120" height="80" rx="6" fill="#f5f5f5" />
      <rect width="120" height="16" rx="6" fill="#e0e0e0" />
      <rect width="120" height="10" y="6" fill="#e0e0e0" />
      <circle cx="10" cy="8" r="2.5" fill="#f87171" />
      <circle cx="18" cy="8" r="2.5" fill="#fbbf24" />
      <circle cx="26" cy="8" r="2.5" fill="#34d399" />
      <rect x="0" y="16" width="24" height="64" fill="#ebebeb" />
      <rect x="30" y="22" width="50" height="5" rx="2" fill="#d1d5db" />
      <rect x="30" y="32" width="70" height="4" rx="2" fill="#e5e7eb" />
      <rect x="30" y="40" width="60" height="4" rx="2" fill="#e5e7eb" />
      <rect x="30" y="48" width="75" height="4" rx="2" fill="#e5e7eb" />
      <rect x="30" y="58" width="30" height="10" rx="3" fill="#0088fc" opacity="0.8" />
    </svg>
  );
}

export function DarkPreview() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="120" height="80" rx="6" fill="#1a2232" />
      <rect width="120" height="16" rx="6" fill="#222c3c" />
      <rect width="120" height="10" y="6" fill="#222c3c" />
      <circle cx="10" cy="8" r="2.5" fill="#f87171" />
      <circle cx="18" cy="8" r="2.5" fill="#fbbf24" />
      <circle cx="26" cy="8" r="2.5" fill="#34d399" />
      <rect x="0" y="16" width="24" height="64" fill="#1e2a3a" />
      <rect x="30" y="22" width="50" height="5" rx="2" fill="#3d4e66" />
      <rect x="30" y="32" width="70" height="4" rx="2" fill="#2d3d52" />
      <rect x="30" y="40" width="60" height="4" rx="2" fill="#2d3d52" />
      <rect x="30" y="48" width="75" height="4" rx="2" fill="#2d3d52" />
      <rect x="30" y="58" width="30" height="10" rx="3" fill="#0088fc" opacity="0.8" />
    </svg>
  );
}

export function SystemPreview() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="leftHalf">
          <rect x="0" y="0" width="60" height="80" />
        </clipPath>
        <clipPath id="rightHalf">
          <rect x="60" y="0" width="60" height="80" />
        </clipPath>
      </defs>
      {/* Light half */}
      <rect width="120" height="80" rx="6" fill="#f5f5f5" clipPath="url(#leftHalf)" />
      <rect width="60" height="16" rx="6" fill="#e0e0e0" clipPath="url(#leftHalf)" />
      <rect width="60" height="10" y="6" fill="#e0e0e0" clipPath="url(#leftHalf)" />
      <rect x="0" y="16" width="14" height="64" fill="#ebebeb" clipPath="url(#leftHalf)" />
      <rect x="18" y="22" width="30" height="5" rx="2" fill="#d1d5db" clipPath="url(#leftHalf)" />
      <rect x="18" y="32" width="38" height="4" rx="2" fill="#e5e7eb" clipPath="url(#leftHalf)" />
      <rect x="18" y="40" width="32" height="4" rx="2" fill="#e5e7eb" clipPath="url(#leftHalf)" />
      <rect x="18" y="58" width="20" height="10" rx="3" fill="#0088fc" opacity="0.8" clipPath="url(#leftHalf)" />
      {/* Dark half */}
      <rect width="120" height="80" rx="6" fill="#1a2232" clipPath="url(#rightHalf)" />
      <rect x="60" y="0" width="60" height="16" fill="#222c3c" clipPath="url(#rightHalf)" />
      <rect x="60" y="6" width="60" height="10" fill="#222c3c" clipPath="url(#rightHalf)" />
      <rect x="60" y="16" width="14" height="64" fill="#1e2a3a" clipPath="url(#rightHalf)" />
      <rect x="78" y="22" width="30" height="5" rx="2" fill="#3d4e66" clipPath="url(#rightHalf)" />
      <rect x="78" y="32" width="38" height="4" rx="2" fill="#2d3d52" clipPath="url(#rightHalf)" />
      <rect x="78" y="40" width="32" height="4" rx="2" fill="#2d3d52" clipPath="url(#rightHalf)" />
      <rect x="78" y="58" width="20" height="10" rx="3" fill="#0088fc" opacity="0.8" clipPath="url(#rightHalf)" />
      <line x1="60" y1="0" x2="60" y2="80" stroke="#0088fc" strokeWidth="1.5" strokeDasharray="4 2" />
    </svg>
  );
}
