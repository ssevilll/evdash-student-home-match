import { Link } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useAuthModal, useWishlist } from "@/lib/store";

const nav = [
  { to: "/homes", label: "Evlər" },
  { to: "/roommates", label: "Otaq yoldaşı" },
  { to: "/subscriptions", label: "Abunəlik" },
] as const;

export function Header() {
  const { list } = useWishlist();
  const auth = useAuthModal();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground" activeProps={{ className: "!text-primary-foreground bg-brand shadow-brand" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/wishlist" aria-label="İstək siyahısı" className="relative grid size-10 place-items-center rounded-full border border-border bg-card transition hover:border-primary hover:text-primary">
            <Heart className="size-[18px]" />
            {list.length > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-brand text-[11px] font-bold text-primary-foreground">{list.length}</span>}
          </Link>
          <button onClick={() => auth.show()} className="hidden rounded-full px-4 py-2 text-sm font-semibold hover:text-primary sm:block">Daxil ol</button>
          <button onClick={() => auth.show("signup")} className="hidden rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:bg-brand sm:block">Qeydiyyat</button>
          <button className="grid size-10 place-items-center rounded-full border border-border md:hidden" aria-label="Menyu" onClick={() => setOpen(!open)}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-medium" activeProps={{ className: "bg-primary-soft text-accent-foreground" }}>{n.label}</Link>
            ))}
            <Link to="/wishlist" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-medium">İstək siyahısı ({list.length})</Link>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button onClick={() => { setOpen(false); auth.show(); }} className="rounded-full border border-border py-3 font-semibold">Daxil ol</button>
              <button onClick={() => { setOpen(false); auth.show("signup"); }} className="rounded-full bg-brand py-3 font-semibold text-primary-foreground">Qeydiyyat</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
