import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { LovableMark } from '@lovable.dev/cloud-auth-js/react';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { Button } from '@/components/ui/button';
import { isPromoCode } from '@/lib/account-rules';
const input = 'h-12 w-full rounded-lg border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring/30';
export function AuthForm({ signup = false, onSuccess }: { signup?: boolean; onSuccess?: () => void }) {
  const [busy, setBusy] = useState(false); const [confirmed, setConfirmed] = useState(false); const [error, setError] = useState('');
  const navigate = useNavigate();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget); const email = String(f.get('email')); const password = String(f.get('password')); const code = String(f.get('promo') ?? '').trim();
    if (code && !isPromoCode(code)) { setError('Promo kod 8 simvollu olmalı və son iki simvolu rəqəm olmalıdır.'); return; }
    setBusy(true); setError('');
    try {
      if (signup) {
        const { data, error: err } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth`, data: { full_name: String(f.get('name')), promo_code: code.toUpperCase() } } });
        if (err) throw err;
        if (!data.session) { setConfirmed(true); return; }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password }); if (err) throw err;
      }
      onSuccess?.(); await navigate({ to: '/dashboard' });
    } catch (err) { setError(err instanceof Error ? err.message : 'Daxil olmaq mümkün olmadı.'); } finally { setBusy(false); }
  };
  const social = async (provider: 'google' | 'lovable') => {
    setBusy(true); const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
    if (result.error) { toast.error(result.error.message); setBusy(false); return; }
    if (result.redirected) return; onSuccess?.(); await navigate({ to: '/dashboard' }); setBusy(false);
  };
  if (confirmed) return <div role="status" className="space-y-4 py-6 text-center"><h2 className="text-xl font-bold">E-poçtunu yoxla</h2><p className="text-muted-foreground">Hesabını aktivləşdirmək üçün göndərdiyimiz təsdiq linkinə toxun.</p><Button variant="outline" onClick={() => setConfirmed(false)}>Girişə qayıt</Button></div>;
  return <div className="space-y-5">
    <form onSubmit={submit} className="space-y-4">
      {signup && <label className="block text-sm font-medium">Ad və soyad<input name="name" required autoComplete="name" className={`${input} mt-2`} /></label>}
      <label className="block text-sm font-medium">E-poçt<input name="email" type="email" required autoComplete="email" className={`${input} mt-2`} /></label>
      <label className="block text-sm font-medium">Şifrə<input name="password" type="password" minLength={8} required autoComplete={signup ? 'new-password' : 'current-password'} className={`${input} mt-2`} /></label>
      {signup && <label className="block text-sm font-medium">Promo kod <span className="text-muted-foreground">(istəyə bağlı)</span><input name="promo" maxLength={8} placeholder="ABCDEF12" className={`${input} mt-2 uppercase`} /><span className="mt-2 block text-xs text-muted-foreground">8 simvol, son iki simvol rəqəm · abunəlik 2 AZN/ay</span></label>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button disabled={busy} className="h-12 w-full bg-brand">{busy ? 'Gözlə…' : signup ? 'Hesab yarat' : 'Daxil ol'}</Button>
    </form>
    {!signup && <><Link to="/forgot-password" onClick={onSuccess} className="block text-right text-sm font-medium text-primary">Şifrəni unutdun?</Link><div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />və ya<span className="h-px flex-1 bg-border" /></div><Button variant="outline" disabled={busy} onClick={() => social('google')} className="h-12 w-full"><svg aria-hidden="true" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>Google ilə davam et</Button><Button variant="outline" disabled={busy} onClick={() => social('lovable')} className="h-12 w-full"><LovableMark />Lovable ilə davam et</Button></>}
  </div>;
}
