import { type ReactNode } from "react";

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    activity: <path d="M2 12h5l3-8 4 16 3-8h5" />,
    charge: <path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z" />,
    chart: (
      <>
        <path d="M4 3v17h17M8 16v-5m5 5V7m5 9V4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    flow: (
      <>
        <rect x="8" y="2" width="8" height="5" rx="1" />
        <rect x="2" y="17" width="8" height="5" rx="1" />
        <rect x="14" y="17" width="8" height="5" rx="1" />
        <path d="M12 7v5H6v5m6-5h6v5" />
      </>
    ),
    folder: <path d="M3 6h7l2 3h9v12H3V6Zm0 0V3h7l2 3h9v3" />,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    logout: <path d="M10 3H3v18h7m4-14 5 5-5 5m-7-5h12" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    close: <path d="m5 5 14 14M5 19 19 5" />,
  };
  return (
    <svg
      className="shrink-0"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.grid}
    </svg>
  );
}
