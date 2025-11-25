'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
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
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="ml-64 mt-16 flex-1 p-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-3xl font-light tracking-tight">Manage Articles</h2>
            <div className="mb-6 max-w-md">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Filter by title, author, category"
                className="bg-card/50 backdrop-blur-sm"
              />
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
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}