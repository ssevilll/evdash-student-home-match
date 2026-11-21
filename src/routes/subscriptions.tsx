import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useAuthModal } from "@/lib/store";

export const Route = createFileRoute("/subscriptions")({
  head: () => ({
    meta: [
      { title: "EvDash Student — 10 AZN / ay" },
      { name: "description", content: "Qabaqcıl otaq yoldaşı uyğunlaşdırması, fərdi tövsiyələr və premium tələbə alətləri ayda 10 AZN-ə." },
      { property: "og:title", content: "EvDash Student — 10 AZN / ay" },
      { property: "og:description", content: "Premium otaq yoldaşı uyğunlaşdırması və fərdi tövsiyələr." },
    ],
  }),
  component: Subs,
});

const rows: [string, boolean, boolean][] = [
  ["Ev axtarışı və filtrlər", true, true], ["İstək siyahısı", true, true], ["Ev sahibi ilə məsləhət", true, true],
  ["Qabaqcıl otaq yoldaşı filtrləri", false, true], ["Uyğunluq səbəblərinin tam izahı", false, true],
  ["Fərdi “Sənin üçün” tövsiyələri", false, true], ["Yeni elanlara 24 saat erkən giriş", false, true], ["Prioritet dəstək", false, true],
];
const faq = [
  ["İstənilən vaxt ləğv edə bilərəm?", "Bəli, abunəliyi bir kliklə dayandıra bilərsən, növbəti ay ödəniş alınmır."],
  ["Kimlər abunə ola bilər?", "Bakıda təhsil alan bütün bakalavr və magistr tələbələri."],
  ["Ödəniş necə edilir?", "Yerli bank kartları ilə təhlükəsiz ödəniş tezliklə aktiv olacaq."],
];

function Subs() {
  const auth = useAuthModal();
  return (
    <div className="container-page py-14">
      <div className="text-center">
        <p className="text-sm font-semibold text-primary">Abunəlik</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Daha ağıllı axtarış, <span className="text-brand">daha uyğun</span> otaq yoldaşı</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Pulsuz plan ilə başla, hazır olanda EvDash Student-ə keç.</p>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold">Pulsuz</h2><p className="mt-1 text-sm text-muted-foreground">Əsas axtarış üçün</p>
          <p className="mt-6 font-display text-5xl font-extrabold">0 ₼</p>
          <button onClick={() => auth.show("signup")} className="mt-6 h-12 w-full rounded-xl border border-border font-semibold hover:border-primary">Pulsuz başla</button>
          <ul className="mt-6 space-y-3 text-sm">{rows.map(([t, f]) => <li key={t} className={`flex items-center gap-3 ${f ? "" : "text-muted-foreground"}`}>{f ? <Check className="size-4 text-primary" /> : <X className="size-4" />}{t}</li>)}</ul>
        </div>
        <div className="relative rounded-3xl bg-brand p-[2px] shadow-brand">
          <div className="h-full rounded-[calc(1.5rem-2px)] bg-card p-8">
            <span className="absolute -top-3 right-8 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">Ən populyar</span>
            <h2 className="text-xl font-bold">EvDash Student</h2><p className="mt-1 text-sm text-muted-foreground">Ciddi axtaranlar üçün</p>
            <p className="mt-6 font-display text-5xl font-extrabold"><span className="text-brand">10 ₼</span><span className="text-lg font-medium text-muted-foreground"> / ay</span></p>
            <button onClick={() => auth.show("EvDash Student-ə abunə olmaq üçün hesabına daxil ol.")} className="mt-6 h-12 w-full rounded-xl bg-brand font-semibold text-primary-foreground shadow-brand transition hover:brightness-105">Abunə ol</button>
            <ul className="mt-6 space-y-3 text-sm">{rows.map(([t]) => <li key={t} className="flex items-center gap-3"><span className="grid size-5 place-items-center rounded-full bg-brand"><Check className="size-3 text-primary-foreground" /></span>{t}</li>)}</ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-center text-2xl font-extrabold">Tez-tez verilən suallar</h2>
        <div className="mt-6 space-y-3">{faq.map(([q, a]) => (
          <details key={q} className="group rounded-2xl border border-border bg-card p-5"><summary className="cursor-pointer list-none font-semibold group-open:text-primary">{q}</summary><p className="mt-2 text-sm text-muted-foreground">{a}</p></details>
        ))}</div>
      </div>
    </div>
  );
}
