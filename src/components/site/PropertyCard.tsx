import { Link } from "@tanstack/react-router";
import { BedDouble, Heart, MapPin, Star, Users } from "lucide-react";
import type { Home } from "@/lib/data";
import { uniName } from "@/lib/data";
import { useWishlist } from "@/lib/store";

export function HeartButton({ id, className = "" }: { id: string; className?: string }) {
  const { has, toggle } = useWishlist();
  const on = has(id);
  return (
    <button aria-label={on ? "İstək siyahısından çıxar" : "İstək siyahısına əlavə et"} aria-pressed={on}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(id); }}
      className={`grid size-10 place-items-center rounded-full bg-background/90 backdrop-blur transition hover:scale-110 ${className}`}>
      <Heart className={`size-[18px] transition ${on ? "fill-primary stroke-primary" : "stroke-foreground"}`} />
    </button>
  );
}

export function CompatPill({ value }: { value: number }) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-brand">{value}% uyğun</span>;
}

export function PropertyCard({ home }: { home: Home }) {
  const near = home.unis[0]!;
  return (
    <Link to="/homes/$id" params={{ id: home.id }} className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={home.images[0]} alt={home.title} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {home.spots > 0 ? <span className="rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold">{home.spots} boş yer</span>
            : <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">Fərdi</span>}
          {home.compat && <CompatPill value={home.compat} />}
        </div>
        <HeartButton id={home.id} className="absolute right-3 top-3" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 font-semibold">{home.title}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm"><Star className="size-3.5 fill-primary stroke-primary" />{home.rating}</span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-3.5" />{home.district}, {home.address}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-primary-soft px-2.5 py-1 font-semibold text-accent-foreground">{uniName(near.id)} · {near.minutes} dəq</span>
          <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1"><BedDouble className="size-3.5" />{home.rooms} otaq</span>
          <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1"><Users className="size-3.5" />{home.available}</span>
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
          <p><span className="font-display text-2xl font-extrabold">{home.price} ₼</span><span className="text-sm text-muted-foreground"> / ay</span></p>
          <span className="text-sm font-semibold text-primary opacity-0 transition group-hover:opacity-100">Ətraflı →</span>
        </div>
      </div>
    </Link>
  );
}
