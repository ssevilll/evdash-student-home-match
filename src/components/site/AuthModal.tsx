import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuthModal } from "@/lib/store";
import { Logo } from "./Logo";

export function AuthModal() {
  const { open, setOpen, reason } = useAuthModal();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const m = reason === "signup" ? "signup" : mode;
  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setMode("login"); }}>
      <DialogContent className="max-w-md rounded-3xl p-8">
        <DialogHeader className="items-center text-center">
          <Logo />
          <DialogTitle className="mt-4 text-2xl">{m === "login" ? "Yenidən xoş gəldin" : "EvDash-a qoşul"}</DialogTitle>
          <DialogDescription>{reason && reason !== "signup" ? reason : "Ev saxlamaq, ev sahibi ilə əlaqə və otaq yoldaşı sorğuları üçün hesabına daxil ol."}</DialogDescription>
        </DialogHeader>
        <form className="mt-2 space-y-3" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Hesablar tezliklə aktiv olacaq. Maraq üçün təşəkkürlər!"); }}>
          {m === "signup" && <input required placeholder="Ad Soyad" className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" />}
          <input required type="email" placeholder="E-poçt" className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" />
          <input required type="password" minLength={6} placeholder="Şifrə" className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" />
          <button className="h-12 w-full rounded-xl bg-brand font-semibold text-primary-foreground shadow-brand transition hover:brightness-105">{m === "login" ? "Daxil ol" : "Qeydiyyatdan keç"}</button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          {m === "login" ? "Hesabın yoxdur? " : "Artıq hesabın var? "}
          <button className="font-semibold text-primary" onClick={() => { setMode(m === "login" ? "signup" : "login"); if (reason === "signup") setOpen(true); }}>
            {m === "login" ? "Qeydiyyat" : "Daxil ol"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
