import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Moon, Sparkles, UserPlus, Wallet } from "lucide-react";
import { useState } from "react";
import { roommates, uniName, universities, type Roommate } from "@/lib/data";
import { useAuthModal } from "@/lib/store";
import { Avatar, CompatRing, RoommateCard } from "@/components/site/RoommateCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/roommates")({
  head: () => ({
    meta: [
      { title: "Otaq yoldaşı tap — EvDash" },
      { name: "description", content: "Yuxu rejimi, təmizlik, büdcə və vərdişlərə görə uyğun tələbə otaq yoldaşları." },
      { property: "og:title", content: "Otaq yoldaşı tap — EvDash" },
      { property: "og:description", content: "Uyğunluq faizi ilə tələbə otaq yoldaşı profilləri." },
    ],
  }),
  component: Roommates,
});

function Roommates() {
  const auth = useAuthModal();
  const [uni, setUni] = useState("");
  const [sleep, setSleep] = useState("");
  const [open, setOpen] = useState<Roommate | null>(null);
  const list = roommates.filter((r) => (!uni || r.uni === uni) && (!sleep || r.sleep.startsWith(sleep))).sort((a, b) => b.compat - a.compat);

  return (
    <>
      <section className="bg-hero">
        <div className="container-page grid items-center gap-8 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-primary">Otaq yoldaşı uyğunlaşdırma</p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Birlikdə yaşamağa <span className="text-brand">uyğun</span> insanlar</h1>
            <p className="mt-4 max-w-lg text-muted-foreground">Profilləri araşdır, uyğunluq faizini və səbəblərini gör. Sorğu göndərmək üçün hesab lazımdır.</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <UserPlus className="size-8 text-primary" />
            <h2 className="mt-3 text-lg font-bold">Öz profilini yarat</h2>
            <p className="mt-1 text-sm text-muted-foreground">Həyat tərzi anketini 2 dəqiqəyə doldur və dəqiq uyğunluq faizləri al.</p>
            <button onClick={() => auth.show("Otaq yoldaşı profili yaratmaq üçün qeydiyyatdan keç.")} className="mt-4 w-full rounded-xl bg-brand py-3 font-semibold text-primary-foreground shadow-brand">Profil yarat / yenilə</button>
          </div>
        </div>
      </section>
      <div className="container-page py-10">
        <div className="flex flex-wrap gap-3">
          <select aria-label="Universitet" value={uni} onChange={(e) => setUni(e.target.value)} className="h-11 rounded-xl border border-input bg-card px-3 text-sm"><option value="">Bütün universitetlər</option>{universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</select>
          {["", "Erkən", "Balanslı", "Gecə"].map((s) => <button key={s} onClick={() => setSleep(s)} className={`h-11 rounded-full border px-4 text-sm font-medium ${sleep === s ? "border-transparent bg-brand text-primary-foreground" : "border-border bg-card"}`}>{s || "Hamısı"}{s === "Erkən" ? " quş" : s === "Gecə" ? " bayquşu" : ""}</button>)}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((r) => <RoommateCard key={r.id} r={r} onOpen={() => setOpen(r)} />)}</div>
        {!list.length && <p className="mt-10 rounded-3xl border border-dashed border-border py-16 text-center text-muted-foreground">Bu filtrlərə uyğun profil yoxdur.</p>}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        {open && (
          <DialogContent className="max-w-lg rounded-3xl p-7">
            <DialogHeader className="flex-row items-center gap-4 space-y-0 text-left">
              <Avatar r={open} size="size-16" />
              <div className="flex-1"><DialogTitle className="text-xl">{open.name}, {open.age}</DialogTitle><DialogDescription>{uniName(open.uni)} · {open.course} · {open.district}</DialogDescription></div>
              <CompatRing value={open.compat} size={64} />
            </DialogHeader>
            <p className="text-sm">{open.bio}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-xl bg-muted p-3"><Wallet className="mb-1 size-4 text-primary" />{open.budget[0]}–{open.budget[1]} ₼</div>
              <div className="rounded-xl bg-muted p-3"><Moon className="mb-1 size-4 text-primary" />{open.sleep}</div>
              <div className="rounded-xl bg-muted p-3"><Sparkles className="mb-1 size-4 text-primary" />Təmizlik {open.clean}/5</div>
            </div>
            <div><p className="text-sm font-semibold">Niyə uyğunsunuz</p>
              <ul className="mt-2 space-y-1.5">{open.why.map((w) => <li key={w} className="flex items-center gap-2 text-sm"><Check className="size-4 text-primary" />{w}</li>)}</ul></div>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/homes" className="rounded-xl border border-border py-3 text-center font-semibold">Birlikdə ev axtar</Link>
              <button onClick={() => { setOpen(null); auth.show("Otaq yoldaşı sorğusu göndərmək üçün hesabına daxil ol."); }} className="rounded-xl bg-brand py-3 font-semibold text-primary-foreground shadow-brand">Sorğu göndər</button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
