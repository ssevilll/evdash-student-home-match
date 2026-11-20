import { Moon, Sparkles, Wallet } from "lucide-react";
import type { Roommate } from "@/lib/data";
import { uniName } from "@/lib/data";

export function Avatar({ r, size = "size-14" }: { r: Roommate; size?: string }) {
  const initials = r.name.split(" ").map((p) => p[0]).join("");
  return <div className={`${size} grid shrink-0 place-items-center rounded-2xl font-display text-lg font-bold`} style={{ background: `oklch(0.93 0.05 ${r.hue})`, color: `oklch(0.4 0.12 ${r.hue})` }}>{initials}</div>;
}

export function CompatRing({ value, size = 56 }: { value: number; size?: number }) {
  const r = size / 2 - 5, c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs><linearGradient id="cg" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#D84A30" /><stop offset="100%" stopColor="#F18A64" /></linearGradient></defs>
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth="5" className="fill-none stroke-muted" />
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth="5" fill="none" stroke="url(#cg)" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <span className="absolute text-sm font-extrabold">{value}%</span>
    </div>
  );
}

export function RoommateCard({ r, onOpen }: { r: Roommate; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="group flex h-full flex-col rounded-3xl border border-border bg-card p-5 text-left shadow-card transition hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start gap-4">
        <Avatar r={r} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">{r.name}, {r.age}</h3>
          <p className="text-sm text-muted-foreground">{uniName(r.uni)} · {r.course}</p>
        </div>
        <CompatRing value={r.compat} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-xl bg-muted p-2.5"><Wallet className="mb-1 size-3.5 text-primary" />{r.budget[0]}–{r.budget[1]} ₼</div>
        <div className="rounded-xl bg-muted p-2.5"><Moon className="mb-1 size-3.5 text-primary" />{r.sleep.split(" · ")[1]}</div>
        <div className="rounded-xl bg-muted p-2.5"><Sparkles className="mb-1 size-3.5 text-primary" />Təmizlik {r.clean}/5</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">{r.habits.map((h) => <span key={h} className="rounded-full border border-border px-2.5 py-1 text-xs">{h}</span>)}</div>
      <p className="mt-auto pt-4 text-sm font-semibold text-primary">Profilə bax →</p>
    </button>
  );
}
