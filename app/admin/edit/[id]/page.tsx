'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ArticleForm from '@/components/admin/ArticleForm';
import { getSupabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<any | null>(null);
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getSupabase().from('articles').select('*').eq('id', id).maybeSingle();
        if (data) {
          setInitial({
            title: (data as any).title,
            description: (data as any).description,
            content: (data as any).content,
            author: (data as any).author,
            published_date: (data as any).published_date,
            category: (data as any).category,
            tags: ((data as any).tags || []).join(', '),
          });
        }
      } catch {
        setInitial(null);
      }
    };
    load();
  }, [id]);

  return (
    <ProtectedRoute>
      <div className="mx-auto flex max-w-6xl px-4">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Edit Article</h2>
          {initial && <ArticleForm initial={initial} mode="edit" articleId={id} />}
        </main>
      </div>
    </ProtectedRoute>
  );
}