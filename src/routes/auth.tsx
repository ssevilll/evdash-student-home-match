import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { AuthForm } from '@/components/site/AuthForm';
import { Logo } from '@/components/site/Logo';
import { useAccount } from '@/components/site/AccountProvider';
import { pageMeta } from '@/lib/meta';
export const Route = createFileRoute('/auth')({ head: () => pageMeta('Hesabına daxil ol', 'EvDash hesabına daxil ol, kirayəni və ödənişlərini idarə et.'), component: AuthPage });
function AuthPage() { const { user, loading } = useAccount(); const nav = useNavigate(); useEffect(() => { if (!loading && user) void nav({ to: '/dashboard' }); }, [loading, user, nav]); return <div className="mx-auto max-w-md px-5 py-14"><Logo className="mb-8" /><h1 className="text-3xl font-bold">Yenidən xoş gəldin</h1><p className="mb-8 mt-2 text-muted-foreground">EvDash hesabına daxil ol.</p><AuthForm /><p className="mt-6 text-center text-sm">Hesabın yoxdur? <Link to="/register" className="font-semibold text-primary">Qeydiyyatdan keç</Link></p></div>; }
