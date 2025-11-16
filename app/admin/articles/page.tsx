'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ArticleTable from '@/components/admin/ArticleTable';
import { getSupabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { useEffect, useMemo, useState } from 'react';
import type { Article } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ManageArticlesPage() {
  const [items, setItems] = useState<Article[]>([]);
  const [q, setQ] = useState('');
  const load = async () => {
    try {
      const { data } = await getSupabase()
        .from('articles')
        .select('*')
        .order('published_date', { ascending: false });
      setItems((data as Article[]) || []);
    } catch {
      setItems([]);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return items.filter(
      (a) => a.title.toLowerCase().includes(s) || a.author.toLowerCase().includes(s) || a.category.toLowerCase().includes(s)
    );
  }, [items, q]);
  return (
    <ProtectedRoute>
      <div className="mx-auto flex max-w-6xl px-4">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Manage Articles</h2>
          <div className="mb-4 max-w-sm">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by title, author, category" />
          </div>
          {!items.length ? (
            <div className="grid gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <ArticleTable items={filtered} onRefresh={load} />
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}