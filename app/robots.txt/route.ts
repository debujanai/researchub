import { siteUrl } from '@/lib/url';
export const dynamic = 'force-dynamic';

export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${siteUrl('/sitemap.xml')}\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
    },
  });
}