import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, GraduationCap, HeartHandshake, KeyRound, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { homes, roommates, universities } from "@/lib/data";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Avatar, CompatRing } from "@/components/site/RoommateCard";

const HERO = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EvDash — Bakıda tələbə evləri və otaq yoldaşı" },
      { name: "description", content: "Universitetinə yaxın ev tap, uyğun otaq yoldaşı ilə tanış ol. EvDash — tələbələr üçün mənzil platforması." },
      { property: "og:title", content: "EvDash — Bakıda tələbə evləri və otaq yoldaşı" },
      { property: "og:description", content: "Universitetinə yaxın ev tap, uyğun otaq yoldaşı ilə tanış ol." },
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
  const forYou = [...homes].filter((h) => h.compat).sort((a, b) => (b.compat ?? 0) - (a.compat ?? 0)).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="container-page grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1.5 text-xs font-semibold text-accent-foreground"><Sparkles className="size-3.5" />Ev + otaq yoldaşı, bir platformada</span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-6xl">Universitetinə yaxın ev.<br /><span className="text-brand">Uyğun otaq yoldaşı.</span></h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">Bakıda 1 200+ yoxlanılmış tələbə mənzili və həyat tərzinə uyğun otaq yoldaşları — hamısı bir yerdə.</p>

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
            <div className="absolute -left-4 bottom-10 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-5 shadow-lift sm:-left-10">
              <CompatRing value={94} size={52} />
              <div><p className="text-sm font-semibold">Aysel ilə uyğunluq</p><p className="text-xs text-muted-foreground">Eyni yuxu rejimi · BDU</p></div>
            </div>
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
              { i: HeartHandshake, t: "Uyğun otaq yoldaşı tap", d: "Yuxu rejimi, təmizlik və vərdişlərə görə uyğunluq faizini gör." },
              { i: KeyRound, t: "Ev sahibi ilə məsləhətləş", d: "Yoxlanılmış ev sahibləri ilə birbaşa əlaqə saxla və köçməyə hazırlaş." },
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

      <section className="container-page py-20">
        <div className="grid overflow-hidden rounded-[2rem] bg-secondary text-secondary-foreground lg:grid-cols-2">
          <div className="p-8 sm:p-14">
            <p className="text-sm font-semibold text-primary-light">Otaq yoldaşı uyğunlaşdırma</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Sadəcə ev yox — <span className="text-brand">doğru insanlar</span> da.</h2>
            <p className="mt-4 opacity-70">Həyat tərzi anketini doldur, alqoritmimiz yuxu saatı, təmizlik, büdcə və vərdişlərə görə sənə ən uyğun tələbələri təklif etsin.</p>
            <ul className="mt-6 space-y-3">{["Uyğunluq faizi və izahı", "Yoxlanılmış tələbə profilləri", "Mövcud kirayəçilərin qaydaları əvvəlcədən görünür"].map((x) => <li key={x} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full bg-brand"><Check className="size-3.5" /></span>{x}</li>)}</ul>
            <Link to="/roommates" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-primary-foreground shadow-brand">Otaq yoldaşlarını kəşf et <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid content-center gap-3 p-8 sm:p-14 lg:pl-0">
            {roommates.slice(0, 3).map((r, k) => (
              <Link key={r.id} to="/roommates" className={`flex items-center gap-4 rounded-2xl bg-background p-4 text-foreground transition hover:-translate-y-0.5 ${k === 1 ? "lg:ml-10" : ""}`}>
                <Avatar r={r} size="size-12" />
                <div className="flex-1"><p className="font-semibold">{r.name.split(" ")[0]}, {r.age}</p><p className="text-xs text-muted-foreground">{r.why[0]}</p></div>
                <CompatRing value={r.compat} size={48} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <p className="text-sm font-semibold text-primary">Sənin üçün</p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Həyat tərzinə uyğun evlər</h2>
        <p className="mt-2 text-muted-foreground">Mövcud kirayəçilərlə uyğunluğa görə sıralanıb.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{forYou.map((h) => <PropertyCard key={h.id} home={h} />)}</div>
      </section>

      <section className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand p-8 text-primary-foreground shadow-brand sm:p-14">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-background/10" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold"><ShieldCheck className="size-3.5" />EvDash Student</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Ayda cəmi 10 AZN-ə premium uyğunlaşdırma</h2>
              <p className="mt-3 opacity-90">Qabaqcıl otaq yoldaşı filtrləri, fərdi tövsiyələr və yeni elanlara ilk sən çat.</p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <p className="font-display text-5xl font-extrabold">10 ₼<span className="text-lg font-medium opacity-80"> / ay</span></p>
              <Link to="/subscriptions" className="rounded-full bg-background px-6 py-3.5 text-center font-semibold text-foreground transition hover:scale-105">Planı gör</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
