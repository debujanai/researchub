import { getSupabase } from '@/lib/supabase';
import { siteUrl } from '@/lib/url';
export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  const urls: string[] = [siteUrl('/'), siteUrl('/search')];

  const pageSize = 1000;
  let from = 0;
  let total = Infinity;
  while (from < total) {
    const { data, count } = await getSupabase()
      .from('articles')
      .select('id, slug, updated_at', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .range(from, from + pageSize - 1);
    const batch = Array.isArray(data) ? data : [];
    urls.push(...batch.map((a: any) => siteUrl(`/article/${a.slug || a.id}`)));
    if (typeof count === 'number') total = count;
    if (!batch.length) break;
    from += pageSize;
  }

  const xmlItems = urls
    .map(
      (u) =>
        `<url><loc>${u}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlItems}\n</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}