import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
const AccountContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: true });
export function AccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true);
  const router = useRouter(); const query = useQueryClient();
  useEffect(() => {
    let alive = true;
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!['SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED'].includes(event)) return;
      setUser(session?.user ?? null); setLoading(false);
      if (event === 'SIGNED_OUT') query.clear(); else query.invalidateQueries();
      void router.invalidate();
    });
    void supabase.auth.getUser().then(({ data }) => { if (alive) { setUser(data.user); setLoading(false); } });
    return () => { alive = false; listener.subscription.unsubscribe(); };
  }, [query, router]);
  return <AccountContext.Provider value={{ user, loading }}>{children}</AccountContext.Provider>;
}
export const useAccount = () => useContext(AccountContext);
