import { Link } from "@tanstack/react-router";
import logo from "@/assets/evdash-logo-compact.png.asset.json";
export function Logo({ className = "" }: { className?: string }) {
  return <Link to="/" aria-label="EvDash ana səhifə" className={`inline-flex shrink-0 items-center ${className}`}><img src={logo.url} alt="EvDash — Student Housing. Made Easy." className="h-12 w-44 object-contain" /></Link>;
}
