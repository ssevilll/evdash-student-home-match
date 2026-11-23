import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/lib/store";
import { AuthForm } from "./AuthForm";
import { Logo } from "./Logo";
export function AuthModal() {
  const { open, setOpen, reason } = useAuthModal(); const [switched, setSwitched] = useState(false);
  const signup = (reason === 'signup') !== switched;
  return <Dialog open={open} onOpenChange={v => { setOpen(v); if(!v) setSwitched(false); }}><DialogContent className="max-h-[90vh] max-w-md overflow-y-auto rounded-2xl p-7"><DialogHeader><Logo /><DialogTitle className="mt-4 text-2xl">{signup ? 'EvDash-a qoşul' : 'Yenidən xoş gəldin'}</DialogTitle><DialogDescription>{reason && reason !== 'signup' ? reason : 'EvDash hesabınla davam et.'}</DialogDescription></DialogHeader><AuthForm signup={signup} onSuccess={() => setOpen(false)} /><p className="text-center text-sm">{signup ? 'Artıq hesabın var?' : 'Hesabın yoxdur?'} <Button variant="link" onClick={() => setSwitched(!switched)}>{signup ? 'Daxil ol' : 'Qeydiyyat'}</Button></p></DialogContent></Dialog>;
}
