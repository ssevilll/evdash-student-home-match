import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { getHome } from './data';
export const getAccount = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { supabase, userId } = context;
  const results = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase.from('subscriptions').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    supabase.from('rentals').select('*').eq('user_id', userId).order('starts_on', { ascending: false }),
    supabase.from('payments').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    supabase.from('preferences').select('*').eq('user_id', userId).maybeSingle(),
  ]);
  for (const result of results) if (result.error) throw new Error(result.error.message);
  const [profile, subscriptions, rentals, payments, preferences] = results;
  return { profile: profile?.data ?? null, subscriptions: subscriptions?.data ?? [], rentals: rentals?.data ?? [], payments: payments?.data ?? [], preferences: preferences?.data ?? null };
});
export const getConversations = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data, error } = await context.supabase.from('conversations').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message); return data;
});
export const openConversation = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator((data: { home: string }) => { if (!getHome(data.home)) throw new Error('Elan tapılmadı'); return data; }).handler(async ({ context, data }) => {
  const result = await context.supabase.rpc('open_conversation', { p_home: data.home });
  if (result.error) throw new Error(result.error.message); return result.data;
});
