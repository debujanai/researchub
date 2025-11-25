'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import type { Article } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPage() {
  const params = useSearchParams();
  const q = useMemo(() => params.get('q') || '', [params]);
  const [results, setResults] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      setResults(null);
      const query = q.trim();
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      // Attempt full text search if available; fallback to ilike filters
      let data: Article[] | null = null;
      let error: any = null;
      try {
        const res = await getSupabase()
          .from('articles')
          .select('*')
          .or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`)
          .limit(50);
        data = (res.data as Article[]) || [];
        error = res.error;
      } catch (e) {
        error = e;
      }
      if (error) {
        setResults([]);
      } else {
        setResults(data || []);
      }
      setLoading(false);
    };
    search();
  }, [q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <SearchBar />
      </div>
      {q && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Results for "{q}"</h2>
          <div className="mt-2 h-0.5 w-16 rounded bg-accent" />
        </div>
      )}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      )}
      {!loading && results && results.length === 0 && (
        <p className="text-center text-muted-foreground">No results found</p>
      )}
      {!loading && results && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {results.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}