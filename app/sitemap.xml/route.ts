import { getSupabase } from '@/lib/supabase';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const { data } = await getSupabase().from('articles').select('id, slug, updated_at');
  const articles = Array.isArray(data) ? data : [];
  const urls = [
    `${base}/`,
    `${base}/search`,
    ...articles.map((a: any) => `${base}/article/${a.slug || a.id}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (u) =>
        `<url><loc>${u}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`
    )
    .join('\n')}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}