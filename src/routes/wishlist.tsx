import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { homes } from "@/lib/data";
import { useWishlist } from "@/lib/store";
import { PropertyCard } from "@/components/site/PropertyCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "İstək siyahısı — EvDash" },
      { name: "description", content: "Bəyəndiyin tələbə evlərini bir yerdə saxla və müqayisə et." },
      { property: "og:title", content: "İstək siyahısı — EvDash" },
      { property: "og:description", content: "Saxladığın tələbə evləri." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { list } = useWishlist();
  const saved = homes.filter((h) => list.includes(h.id));
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-extrabold sm:text-4xl">İstək siyahısı</h1>
      <p className="mt-2 text-muted-foreground">{saved.length} saxlanılmış ev</p>
      {saved.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{saved.map((h) => <PropertyCard key={h.id} home={h} />)}</div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-border bg-card py-20 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary-soft"><Heart className="size-7 text-primary" /></div>
          <h2 className="mt-5 text-xl font-bold">Hələ heç nə saxlamamısan</h2>
          <p className="mt-1 text-muted-foreground">Bəyəndiyin evlərdə ürək işarəsinə toxun.</p>
          <Link to="/homes" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-primary-foreground shadow-brand">Evlərə bax</Link>
        </div>
      )}
    </div>
  );
}
