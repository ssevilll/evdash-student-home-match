import { useSyncExternalStore } from "react";

const KEY = "evdash:wishlist";
let wish: string[] = [];
let loaded = false;
let authOpen = false;
let authReason = "";
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
const subscribe = (f: () => void) => {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try { wish = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { wish = []; }
    queueMicrotask(emit);
  }
  subs.add(f);
  return () => subs.delete(f);
};
const EMPTY: string[] = [];

export function useWishlist() {
  const list = useSyncExternalStore(subscribe, () => wish, () => EMPTY);
  const toggle = (id: string) => {
    wish = wish.includes(id) ? wish.filter((x) => x !== id) : [...wish, id];
    localStorage.setItem(KEY, JSON.stringify(wish));
    emit();
  };
  return { list, has: (id: string) => list.includes(id), toggle };
}

export function useAuthModal() {
  const open = useSyncExternalStore(subscribe, () => authOpen, () => false);
  const reason = useSyncExternalStore(subscribe, () => authReason, () => "");
  return {
    open, reason,
    show: (r = "") => { authOpen = true; authReason = r; emit(); },
    setOpen: (v: boolean) => { authOpen = v; emit(); },
  };
}
