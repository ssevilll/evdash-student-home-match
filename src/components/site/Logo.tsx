import { Link } from "@tanstack/react-router";
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="EvDash ana səhifə" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-brand shadow-brand">
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-primary-foreground" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11.5 12 5l8 6.5" /><path d="M7 10v9h10v-9" /></svg>
      </span>
      <span className="font-display text-2xl font-extrabold tracking-tight">
        <span className="text-brand">Ev</span><span className="text-foreground">Dash</span>
      </span>
    </Link>
  );
}
