import React from "react";

/**
 * Dwell brand mark (same SVG path as USA repo Navbar).
 * Use className to control sizing via CSS.
 */
export default function DwellLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="dwell-logo-mark"
        d="M12 0.78L2.22 9.56a.75.75 0 0 0-.22.53V22.5c0 .41.34.75.75.75h7.5a.75.75 0 0 0 .75-.75v-6h2v6c0 .41.34.75.75.75h7.5c.41 0 .75-.34.75-.75V10.09a.75.75 0 0 0-.22-.53L12.78.78a.75.75 0 0 0-1.06 0z"
      />
    </svg>
  );
}
