export function normalizeBase(base?: string): string {
  const b = (base || '').trim();
  const fallback = 'http://localhost:3000';
  const v = b || fallback;
  return v.endsWith('/') ? v.slice(0, -1) : v;
}

export function siteUrl(path = ''): string {
  const base = normalizeBase(process.env.NEXT_PUBLIC_SITE_URL);
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}