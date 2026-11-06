/**
 * The 404 illustration, built on the app's best-known moment: a check-in refused because you are
 * outside the venue's radius. A sweep turns over the rings, the venue sits inside its 100m circle,
 * and "you" are out at 404m. Purely decorative, and not a product screen.
 */
export function NotFoundRadar() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className="mx-auto w-full max-w-[26rem]">
      <defs>
        <radialGradient id="radar-ground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FE9A02" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FE9A02" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="radar-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FE9A02" stopOpacity="0" />
          <stop offset="100%" stopColor="#FE9A02" stopOpacity="0.32" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="195" fill="url(#radar-ground)" />

      {/* Distance rings */}
      <circle cx="200" cy="200" r="185" fill="none" stroke="#333336" />
      <circle cx="200" cy="200" r="130" fill="none" stroke="#333336" />
      <line x1="15" y1="200" x2="385" y2="200" stroke="#242427" />
      <line x1="200" y1="15" x2="200" y2="385" stroke="#242427" />

      {/* Sweep */}
      <path className="radar-sweep" d="M200 200 L385 200 A185 185 0 0 0 331 69 Z" fill="url(#radar-beam)" />

      {/* The check-in radius */}
      <circle cx="200" cy="200" r="72" fill="#FE9A02" fillOpacity="0.08" stroke="#FE9A02" strokeDasharray="5 6" />
      <text x="200" y="118" textAnchor="middle" fill="#FE9A02" fontSize="13" fontWeight="600">
        100m
      </text>

      {/* From the venue to you */}
      <line x1="200" y1="200" x2="318" y2="96" stroke="#A6A6AC" strokeDasharray="3 6" />

      {/* The venue */}
      <circle className="radar-ping" cx="200" cy="200" r="11" fill="none" stroke="#FE9A02" strokeWidth="2" />
      <circle cx="200" cy="200" r="8" fill="#FE9A02" />
      <text x="200" y="232" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="600">
        Venue
      </text>

      {/* You */}
      <circle className="radar-blink" cx="318" cy="96" r="8" fill="#FFFFFF" />
      <text x="318" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="600">
        You · 404m
      </text>
    </svg>
  );
}
