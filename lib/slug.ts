export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function ensureUniqueSlug(base: string, get: () => import('@supabase/supabase-js').SupabaseClient, currentId?: string) {
  let candidate = base || 'article';
  let i = 1;
  while (true) {
    const { data } = await get().from('articles').select('id,slug').eq('slug', candidate).limit(1);
    const existing = Array.isArray(data) && data.length ? data[0] : null;
    if (!existing || existing.id === currentId) return candidate;
    i++;
    candidate = `${base}-${i}`;
  }
}