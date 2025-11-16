import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;
export const getSupabase = (): SupabaseClient => {
  if (client) return client;
  if (!url || !anonKey) {
    throw new Error('Supabase environment variables not configured');
  }
  client = createClient(url, anonKey);
  return client;
};

export const getSiteUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
};