import { Bell, CheckCheck } from 'lucide-react';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from './AccountProvider';
export function Notifications() {
  const { user } = useAccount(); const query = useQueryClient();
  const { data: items = [], error } = useQuery({ queryKey: ['notifications', user?.id], enabled: Boolean(user), queryFn: async () => { const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(50); if(error) throw error; return data; } });
  useEffect(() => { if(!user) return; const channel = supabase.channel(`notifications-${user.id}-${crypto.randomUUID()}`).on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, () => { void query.invalidateQueries({ queryKey: ['notifications'] }); }).subscribe(); return () => { void supabase.removeChannel(channel); }; }, [user, query]);
  const unread = items.filter(n => !n.is_read).length;
  return <Popover><PopoverTrigger asChild><Button variant="outline" size="icon" className="relative rounded-full" aria-label="Bildirişlər" title="Bildirişlər"><Bell />{unread > 0 && <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{unread}</span>}</Button></PopoverTrigger><PopoverContent align="end" className="w-80 max-w-[90vw] p-0"><div className="flex items-center justify-between border-b border-border p-4"><h2 className="font-bold">Bildirişlər</h2><Button disabled={!unread} size="icon" variant="ghost" title="Hamısını oxunmuş et" aria-label="Hamısını oxunmuş et" onClick={async () => { if(!user) return; const { error } = await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false); if(error) toast.error(error.message); else await query.invalidateQueries({ queryKey: ['notifications'] }); }}><CheckCheck /></Button></div><div className="max-h-80 overflow-y-auto">{error ? <p className="p-5 text-sm text-destructive">Bildirişlər yüklənmədi.</p> : items.length ? items.map(n => <div key={n.id} className={`border-b border-border p-4 ${n.is_read ? '' : 'bg-primary-soft'}`}><p className="text-sm font-medium">{n.title}</p><p className="mt-1 text-xs text-muted-foreground">{new Date(n.created_at).toLocaleDateString('az-AZ')}</p></div>) : <p className="p-6 text-center text-sm text-muted-foreground">{user ? 'Yeni bildiriş yoxdur.' : 'Bildirişlər üçün hesabına daxil ol.'}</p>}</div></PopoverContent></Popover>;
}
