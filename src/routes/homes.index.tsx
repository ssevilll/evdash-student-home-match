import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { amenityList, districts, homes, universities } from "@/lib/data";
import { PropertyCard } from "@/components/site/PropertyCard";

type S = { uni?: string; max?: number };
export const Route = createFileRoute("/homes/")({
  validateSearch: (s: Record<string, unknown>): S => ({
    ...(typeof s["uni"] === "string" && s["uni"] ? { uni: s["uni"] } : {}),
    ...(s["max"] && !isNaN(Number(s["max"])) ? { max: Number(s["max"]) } : {}),
  }),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Tələbə evləri Bakıda — EvDash" },
      { name: "description", content: "Universitetə yaxınlıq, qiymət, rayon və otaq yoldaşı imkanına görə Bakıda tələbə mənzilləri." },
      { property: "og:title", content: "Tələbə evləri Bakıda — EvDash" },
      { property: "og:description", content: "Universitetə yaxın tələbə mənzillərini filtrlə və müqayisə et." },
    ],
  }),
  component: HomesPage,
});

const sel = "h-11 rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary";

function HomesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/homes/" });
  const [district, setDistrict] = useState("");
  const [rooms, setRooms] = useState("");
  const [shared, setShared] = useState(false);
  const [amen, setAmen] = useState<string[]>([]);
  const [sort, setSort] = useState("rec");
  const [showMore, setShowMore] = useState(false);
  const uni = search.uni ?? "";
  const max = search.max ?? 1000;

  const list = useMemo(() => {
    let r = homes.filter((h) => h.price <= max && (!uni || h.unis.some((u) => u.id === uni)) && (!district || h.district === district)
      && (!rooms || (rooms === "3" ? h.rooms >= 3 : h.rooms === Number(rooms))) && (!shared || h.spots > 0) && amen.every((a) => h.amenities.includes(a)));
    const dist = (h: (typeof homes)[number]) => (uni ? h.unis.find((u) => u.id === uni)?.minutes : h.unis[0]?.minutes) ?? 99;
    if (sort === "asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "near") r = [...r].sort((a, b) => dist(a) - dist(b));
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [uni, max, district, rooms, shared, amen, sort]);

  const reset = () => { navigate({ search: {} }); setDistrict(""); setRooms(""); setShared(false); setAmen([]); };

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Bakıda tələbə evləri</h1>
      <p className="mt-2 text-muted-foreground">Universitetinə yaxın, yoxlanılmış mənzillər.</p>

      <div className="sticky top-16 z-30 -mx-5 mt-8 border-y border-border bg-background/90 px-5 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-3xl sm:border sm:bg-card sm:px-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto]">
          <select aria-label="Universitet" className={sel} value={uni} onChange={(e) => navigate({ search: (p) => { const { uni: _u, ...rest } = p; return e.target.value ? { ...rest, uni: e.target.value } : rest; } })}>
            <option value="">Bütün universitetlər</option>{universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <select aria-label="Rayon" className={sel} value={district} onChange={(e) => setDistrict(e.target.value)}>
            <option value="">Bütün rayonlar</option>{districts.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select aria-label="Otaq sayı" className={sel} value={rooms} onChange={(e) => setRooms(e.target.value)}>
            <option value="">Otaq sayı</option><option value="1">1 otaq</option><option value="2">2 otaq</option><option value="3">3+ otaq</option>
          </select>
          <select aria-label="Sırala" className={sel} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rec">Tövsiyə olunan</option><option value="asc">Qiymət: artan</option><option value="desc">Qiymət: azalan</option><option value="near">Universitetə yaxın</option><option value="rating">Ən yüksək reytinq</option>
          </select>
          <button onClick={() => setShowMore(!showMore)} className={`flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${showMore ? "border-primary bg-primary-soft text-accent-foreground" : "border-input"}`}><SlidersHorizontal className="size-4" />Filtrlər</button>
        </div>
        {showMore && (
          <div className="mt-4 grid gap-5 border-t border-border pt-4 md:grid-cols-[1fr_2fr]">
            <div>
              <div className="flex justify-between text-sm font-semibold"><span>Maksimum qiymət</span><span className="text-primary">{max} ₼</span></div>
              <input type="range" min={250} max={1000} step={50} value={max} onChange={(e) => navigate({ search: (p) => ({ ...p, max: Number(e.target.value) }) })} className="mt-3 w-full accent-primary" aria-label="Maksimum qiymət" />
              <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={shared} onChange={(e) => setShared(e.target.checked)} className="size-4 accent-primary" />Yalnız boş yeri olanlar</label>
            </div>
            <div>
              <p className="text-sm font-semibold">Şərait</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {amenityList.map((a) => { const on = amen.includes(a); return (
                  <button key={a} onClick={() => setAmen(on ? amen.filter((x) => x !== a) : [...amen, a])} aria-pressed={on} className={`rounded-full border px-3 py-1.5 text-sm transition ${on ? "border-transparent bg-brand text-primary-foreground" : "border-border hover:border-primary"}`}>{a}</button>
                ); })}
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{list.length} elan tapıldı</p>
      {list.length ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((h) => <PropertyCard key={h.id} home={h} />)}</div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-border bg-card py-20 text-center">
          <SearchX className="mx-auto size-10 text-primary" />
          <h3 className="mt-4 text-xl font-bold">Bu filtrlərə uyğun ev tapılmadı</h3>
          <p className="mt-1 text-muted-foreground">Filtrləri genişləndirməyə çalış.</p>
          <button onClick={reset} className="mt-6 rounded-full bg-brand px-6 py-3 font-semibold text-primary-foreground">Filtrləri sıfırla</button>
        </div>
      )}
    </div>
  );
}
