import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-flex rounded-2xl bg-background px-3 py-2"><Logo /></div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-70">Bakıda tələbələr üçün etibarlı ev və uyğun otaq yoldaşı tapmağın ən rahat yolu.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Platforma</h4>
          <ul className="mt-4 space-y-2.5 text-sm opacity-70">
            <li><Link to="/homes" className="hover:text-primary-light">Evlər</Link></li>
            <li><Link to="/roommates" className="hover:text-primary-light">Otaq yoldaşı</Link></li>
            <li><Link to="/wishlist" className="hover:text-primary-light">İstək siyahısı</Link></li>
            <li><Link to="/subscriptions" className="hover:text-primary-light">EvDash Student</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Universitetlər</h4>
          <ul className="mt-4 space-y-2.5 text-sm opacity-70">
            {["bdu", "ada", "unec", "aztu"].map((u) => (
              <li key={u}><Link to="/homes" search={{ uni: u }} className="hover:text-primary-light">{u.toUpperCase()} yaxınlığında</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Əlaqə</h4>
          <ul className="mt-4 space-y-2.5 text-sm opacity-70">
            <li>salam@evdash.az</li><li>+994 12 555 00 00</li><li>Bakı, Azərbaycan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="container-page flex flex-col justify-between gap-2 py-6 text-xs opacity-60 sm:flex-row">
          <span>© 2026 EvDash. Bütün hüquqlar qorunur.</span><span>Məxfilik siyasəti · İstifadə şərtləri</span>
        </div>
      </div>
    </footer>
  );
}
