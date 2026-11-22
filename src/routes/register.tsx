import { createFileRoute, Link } from '@tanstack/react-router';
import { AuthForm } from '@/components/site/AuthForm';
import { Logo } from '@/components/site/Logo';
import { pageMeta } from '@/lib/meta';
export const Route = createFileRoute('/register')({ head: () => pageMeta('Hesab yarat', 'EvDash-a qoşul, profilini yarat və tələbə mənzillərini tap.'), component: Register });
function Register() { return <div className="mx-auto max-w-md px-5 py-14"><Logo className="mb-8" /><h1 className="text-3xl font-bold">EvDash-a qoşul</h1><p className="mb-8 mt-2 text-muted-foreground">Yeni evinə ilk addım.</p><AuthForm signup /><p className="mt-6 text-center text-sm">Artıq hesabın var? <Link to="/auth" className="font-semibold text-primary">Daxil ol</Link></p></div>; }
