import { siteUrl } from '@/lib/url';

export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${siteUrl('/sitemap.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}