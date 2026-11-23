
import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
    >
      <span className="text-2xl font-bold text-orange-600">
        EVDASH TEST
      </span>
    </Link>
  );
}
