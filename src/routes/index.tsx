import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Heart, KeyRound, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { homes, universities } from "@/lib/data";
import { PropertyCard } from "@/components/site/PropertyCard";


const HERO = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "EvDash — Bakıda tələbə evləri" },
      { name: "description", content: "Universitetinə yaxın ev tap və ev sahibi ilə birbaşa əlaqə saxla. EvDash — tələbələr üçün mənzil platforması." },
      { property: "og:title", content: "EvDash — Bakıda tələbə evləri" },
      { property: "og:description", content: "Universitetinə yaxın ev tap və ev sahibi ilə birbaşa əlaqə saxla." },
      { property: "og:image", content: HERO },
      { name: "twitter:image", content: HERO },
    ],
  }),
  component: Index,
});

function Index() {
  const nav = useNavigate();
  const [uni, setUni] = useState("");
  const [budget, setBudget] = useState("");
  const featured = homes.filter((h) => h.featured);

  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="container-page grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1.5 text-xs font-semibold text-accent-foreground"><ShieldCheck className="size-3.5" />Tələbələr üçün ev axtarışı</span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-6xl">EvDash<br /><span className="text-brand">Universitetinə yaxın ev.</span></h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">Bakıda tələbə mənzillərini kəşf et, bəyəndiklərini saxla və ev sahibi ilə görüş.</p>

            <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/homes", search: { ...(uni ? { uni } : {}), ...(budget ? { max: Number(budget) } : {}) } }); }}
              className="mt-8 grid gap-2 rounded-3xl border border-border bg-card p-2 shadow-lift sm:grid-cols-[1.4fr_1fr_auto]">
              <label className="flex items-center gap-3 rounded-2xl px-4 py-2.5 hover:bg-muted">
                <GraduationCap className="size-5 shrink-0 text-primary" />
                <span className="flex-1"><span className="block text-xs font-semibold">Universitet</span>
                  <select value={uni} onChange={(e) => setUni(e.target.value)} className="w-full bg-transparent text-sm text-muted-foreground outline-none" aria-label="Universitet">
                    <option value="">Hamısı</option>{universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select></span>
              </label>
              <label className="flex items-center gap-3 rounded-2xl px-4 py-2.5 hover:bg-muted">
                <span className="text-lg font-bold text-primary">₼</span>
                <span className="flex-1"><span className="block text-xs font-semibold">Büdcə</span>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-transparent text-sm text-muted-foreground outline-none" aria-label="Büdcə">
                    <option value="">İstənilən</option><option value="350">350 ₼-a qədər</option><option value="550">550 ₼-a qədər</option><option value="800">800 ₼-a qədər</option>
                  </select></span>
              </label>
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 font-semibold text-primary-foreground shadow-brand transition hover:brightness-105"><Search className="size-4" />Axtar</button>
            </form>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {universities.slice(0, 4).map((u) => <Link key={u.id} to="/homes" search={{ uni: u.id }} className="rounded-full border border-border bg-card px-3 py-1.5 transition hover:border-primary hover:text-primary">{u.short}</Link>)}
            </div>
          </div>

          <div className="relative fade-up [animation-delay:150ms]">
            <img src={HERO} alt="İşıqlı tələbə mənzili" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift sm:aspect-[5/5]" />
            <div className="absolute -right-2 top-8 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:-right-6">
              <p className="text-xs text-muted-foreground">Yasamal · BDU 8 dəq</p><p className="font-display text-xl font-extrabold">650 ₼<span className="text-sm font-normal text-muted-foreground"> / ay</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex items-end justify-between gap-4">
          <div><p className="text-sm font-semibold text-primary">Seçilmiş elanlar</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Bu həftənin ən populyar evləri</h2></div>
          <Link to="/homes" className="hidden items-center gap-1 font-semibold hover:text-primary sm:flex">Hamısına bax <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featured.map((h) => <PropertyCard key={h.id} home={h} />)}</div>
      </section>

      <section className="bg-card py-20">
        <div className="container-page">
          <p className="text-center text-sm font-semibold text-primary">Necə işləyir</p>
          <h2 className="mt-2 text-center text-3xl font-extrabold sm:text-4xl">EvDash ilə 3 addımda yeni evə</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { i: Search, t: "Universitetinə görə axtar", d: "Universitetini seç, büdcəni və rayonu müəyyən et — sənə ən yaxın evləri göstərək." },
              { i: Heart, t: "Bəyəndiyin evləri saxla", d: "İstək siyahısında mənzilləri bir araya gətir və müqayisə et." },
              { i: KeyRound, t: "Ev sahibi ilə görüş", d: "Yoxlanılmış ev sahibləri ilə birbaşa əlaqə saxla və köçməyə hazırlaş." },
            ].map((s, k) => (
              <div key={s.t} className="relative rounded-3xl border border-border bg-background p-8">
                <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-muted">0{k + 1}</span>
                <div className="grid size-12 place-items-center rounded-2xl bg-brand shadow-brand"><s.i className="size-6 text-primary-foreground" /></div>
                <h3 className="mt-6 text-xl font-bold">{s.t}</h3><p className="mt-2 text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand p-8 text-primary-foreground shadow-brand sm:p-14">
          <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold"><ShieldCheck className="size-3.5" />EvDash Student</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Ayda 8 AZN-ə fərdi ev axtarışı</h2>
              <p className="mt-3 opacity-90">Fərdi seçimlərini saxla. Promo kodla abunəlik ayda 2 AZN.</p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <p className="font-display text-5xl font-extrabold">8 ₼<span className="text-lg font-medium opacity-80"> / ay</span></p>
              <Link to="/subscriptions" className="rounded-full bg-background px-6 py-3.5 text-center font-semibold text-foreground transition hover:scale-105">Planı gör</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
