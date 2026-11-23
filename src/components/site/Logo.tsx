
import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="EvDash ana səhifə"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <img
        src="/evdash-logo-compact.png"
        alt="EvDash — Student Housing. Made Easy."
        className="h-12 w-44 object-contain"
      />
    </Link>
  );
}
