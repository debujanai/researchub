import { getSupabase } from './supabase';

export async function isAdminEmail(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  const { data, error } = await getSupabase()
    .from('admin_users')
    .select('email')
    .eq('email', email)
    .limit(1)
    .maybeSingle();
  if (error) return false;
  return Boolean(data?.email);
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