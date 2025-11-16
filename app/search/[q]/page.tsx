import type { Metadata } from 'next';
import { getSupabase } from '@/lib/supabase';
import type { Article } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';

type Props = { params: { q: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = `Search: ${decodeURIComponent(params.q)}`;
  const url = `${base}/search/${encodeURIComponent(params.q)}`;
  return {
    title,
    description: `Results for ${decodeURIComponent(params.q)} on ResearchHub`,
    alternates: { canonical: url },
    openGraph: { title, url, type: 'website' },
  };
}

export default async function SearchByParamPage({ params }: Props) {
  const q = decodeURIComponent(params.q || '').trim();
  let results: Article[] = [];
  if (q) {
    const res = await getSupabase()
      .from('articles')
      .select('*')
      .or(`title.ilike.%${q}%,description.ilike.%${q}%,content.ilike.%${q}%`)
      .limit(50);
    results = (res.data as Article[]) || [];
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6">
        <SearchBar />
      </div>
      {q && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Results for "{q}"</h2>
          <div className="mt-2 h-0.5 w-16 rounded bg-accent" />
        </div>
      )}
      {!results.length ? (
        <p className="text-center text-muted-foreground">No results found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {results.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}