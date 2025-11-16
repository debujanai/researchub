import { getSupabase } from './supabase';

export async function isAdminCheck(userId: string | null | undefined, email?: string | null | undefined): Promise<boolean> {
  const client = getSupabase();
  if (userId) {
    const { data, error } = await client
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .limit(1)
      .maybeSingle();
    if (!error && data?.id) return true;
  }
  if (email) {
    const { data, error } = await client
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .limit(1)
      .maybeSingle();
    if (!error && data?.email) return true;
  }
  return false;
}

export function sanitizeContent(input: string): string {
  if (!input) return '';
  let output = input;
  output = output.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  output = output.replace(/on\w+\s*=\s*"[^"]*"/gi, '');
  output = output.replace(/on\w+\s*=\s*'[^']*'/gi, '');
  output = output.replace(/javascript:/gi, '');
  return output;
}