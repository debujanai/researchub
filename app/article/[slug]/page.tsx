'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import type { Article } from '@/lib/types';
import ArticleDetail from '@/components/ArticleDetail';
import { Skeleton } from '@/components/ui/skeleton';
import Spinner from '@/components/Spinner';
import { useAuth } from '@/context/AuthContext';
import { siteUrl } from '@/lib/url';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
        const { data } = isUuid
          ? await getSupabase().from('articles').select('*').eq('id', slug).maybeSingle()
          : await getSupabase().from('articles').select('*').eq('slug', slug).maybeSingle();
        setArticle((data as Article) || null);
      } catch {
        setArticle(null);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  if (loading)
    return (
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Spinner />
          <span>Loading article…</span>
        </div>
      </div>
    );
  if (!article) return <p className="mx-auto mt-8 max-w-3xl text-muted-foreground">Article not found</p>;
  const url = siteUrl(`/article/${article.slug || article.id}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: article.title,
    description: article.description,
    articleSection: article.category,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.published_date,
    dateModified: article.updated_at,
    keywords: Array.isArray(article.tags) ? article.tags.join(', ') : undefined,
    url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ArticleDetail article={article} showEdit={isAdmin} />
    </>
  );
}