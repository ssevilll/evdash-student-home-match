import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { pageMeta } from '@/lib/meta';
export const Route = createFileRoute('/forgot-password')({ head: () => pageMeta('Şifrəni bərpa et', 'EvDash hesabının şifrəsini e-poçt vasitəsilə bərpa et.'), component: Forgot });
function Forgot() { const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false); return <div className="mx-auto max-w-md px-5 py-16"><h1 className="mb-8 text-3xl font-bold">Şifrəni bərpa et</h1><form className="space-y-4" onSubmit={async e => { e.preventDefault(); setBusy(true); const email = String(new FormData(e.currentTarget).get('email')); const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` }); setMessage(error?.message ?? 'Bərpa linki üçün e-poçtunu yoxla.'); setBusy(false); }}><label className="block">E-poçt<input name="email" required type="email" className="mt-2 h-12 w-full rounded-lg border bg-card px-4" /></label><Button disabled={busy} className="h-12 w-full">Bərpa linki göndər</Button><p role="status">{message}</p></form><Link to="/auth" className="mt-6 block text-primary">Girişə qayıt</Link></div>; }
