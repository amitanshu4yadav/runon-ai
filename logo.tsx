import Link from 'next/link';

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#rg)" />
      <path d="M11 23V9h6.2a4.3 4.3 0 0 1 1.3 8.4L22 23h-3l-3.1-5.2H13.6V23H11Zm2.6-7.6h3.4a1.9 1.9 0 0 0 0-3.8h-3.4v3.8Z" fill="#07070c" />
    </svg>
  );
}

export function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 font-semibold tracking-tight text-white">
      <LogoMark />
      <span>Runon AI</span>
    </Link>
  );
}
