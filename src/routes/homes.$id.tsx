import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Check, ChevronLeft, Heart, MapPin, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { getHome, reviews, uniName, universities } from "@/lib/data";
import { useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";


export const Route = createFileRoute("/homes/$id")({
  loader: ({ params }) => { const h = getHome(params.id); if (!h) throw notFound(); return h; },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: `${loaderData.title} — EvDash` },
      { name: "description", content: `${loaderData.price} ₼/ay · ${loaderData.district}. ${loaderData.description.slice(0, 120)}` },
      { property: "og:title", content: `${loaderData.title} — EvDash` },
      { property: "og:description", content: `${loaderData.price} ₼/ay · ${loaderData.district}` },
      { property: "og:image", content: loaderData.images[0] ?? "" },
      { name: "twitter:image", content: loaderData.images[0] ?? "" },
    ] : [{ title: "Elan tapılmadı — EvDash" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center"><h1 className="text-3xl font-extrabold">Elan tapılmadı</h1>
      <Link to="/homes" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-primary-foreground">Evlərə qayıt</Link></div>
  ),
  component: Details,
});

function Details() {
  const h = Route.useLoaderData();
  const { has, toggle } = useWishlist();
  const [img, setImg] = useState(0);
  const saved = has(h.id);


  return (
    <div className="container-page py-8">
      <Link to="/homes" className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary"><ChevronLeft className="size-4" />Bütün evlər</Link>
      <h1 className="mt-4 text-2xl font-extrabold sm:text-4xl">{h.title}</h1>
      <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><Star className="size-4 fill-primary stroke-primary" /><b className="text-foreground">{h.rating}</b> ({h.reviews} rəy)</span>
        <span className="flex items-center gap-1"><MapPin className="size-4" />{h.district}, {h.address}</span>
      </p>

      <div className="mt-6 grid gap-3 md:h-[520px] md:grid-cols-[2fr_1fr]">
        <img src={h.images[img]} alt={h.title} className="aspect-[16/10] w-full rounded-3xl object-cover md:aspect-auto md:h-full" />
        <div className="grid grid-cols-4 gap-3 md:min-h-0 md:grid-cols-1 md:grid-rows-3">
          {h.images.slice(0, 4).map((src, k) => (
            <button key={k} onClick={() => setImg(k)} className={`overflow-hidden rounded-2xl ring-offset-2 md:min-h-0 transition ${k === 3 ? "md:hidden" : ""} ${img === k ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100"}`} aria-label={`Şəkil ${k + 1}`}>
              <img src={src} alt="" className="aspect-square size-full object-cover md:aspect-auto md:h-full" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[["Otaq", h.rooms], ["Sahə", `${h.area} m²`], ["Mərtəbə", h.floor], ["Boş yer", h.spots]].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{k}</p><p className="mt-1 font-bold">{v}</p></div>
            ))}
          </section>
          <section><h2 className="text-xl font-bold">Təsvir</h2><p className="mt-3 leading-relaxed text-muted-foreground">{h.description}</p></section>
          <section><h2 className="text-xl font-bold">Şərait</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">{h.amenities.map((a) => <span key={a} className="flex items-center gap-2 text-sm"><span className="grid size-6 place-items-center rounded-full bg-primary-soft"><Check className="size-3.5 text-primary" /></span>{a}</span>)}</div>
          </section>
          <section><h2 className="text-xl font-bold">Yaxın universitetlər</h2>
            <div className="mt-4 space-y-2">{h.unis.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                <span className="font-medium">{universities.find((x) => x.id === u.id)?.name}</span><span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-accent-foreground">{u.minutes} dəq</span>
              </div>))}</div>
          </section>
          <section><h2 className="text-xl font-bold">Rəylər</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">{reviews.map((r) => (
              <div key={r.name} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className={`size-3.5 ${k < r.rating ? "fill-primary stroke-primary" : "stroke-muted-foreground"}`} />)}</div>
                <p className="mt-3 text-sm">{r.text}</p><p className="mt-3 text-xs font-semibold text-muted-foreground">{r.name} · {r.uni}</p>
              </div>))}</div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-lift">
            <p><span className="font-display text-3xl font-extrabold">{h.price} ₼</span><span className="text-muted-foreground"> / ay</span></p>
            <div className="mt-4 space-y-2 border-y border-border py-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Depozit</span><b>{h.deposit} ₼</b></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Mövcuddur</span><b>{h.available}</b></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Boş yer</span><b>{h.spots}</b></div>
            </div>
            <Button asChild className="mt-5 h-12 w-full bg-brand"><Link to="/messages" search={{ home: h.id }}><MessageCircle />Ev sahibi ilə görüş</Link></Button>
            <button onClick={() => toggle(h.id)} aria-pressed={saved} className={`mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border font-semibold transition ${saved ? "border-primary bg-primary-soft text-accent-foreground" : "border-border hover:border-primary"}`}>
              <Heart className={`size-4 ${saved ? "fill-primary stroke-primary" : ""}`} />{saved ? "İstək siyahısındadır" : "İstək siyahısına əlavə et"}
            </button>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-muted p-4">
              <div className="grid size-11 place-items-center rounded-full bg-secondary font-bold text-secondary-foreground">{h.landlord.name[0]}</div>
              <div className="text-sm"><p className="flex items-center gap-1 font-semibold">{h.landlord.name}<BadgeCheck className="size-4 text-primary" /></p><p className="text-xs text-muted-foreground">{h.landlord.since}-dən EvDash-da · Cavab: {h.landlord.response}</p></div>
            </div>
          </div>
        </aside>
      </div>


    </div>
  );
}
