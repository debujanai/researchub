'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getSupabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{ total: number } | null>(null);
  useEffect(() => {
    const load = async () => {
      try {
        const { count } = await getSupabase().from('articles').select('*', { count: 'exact', head: true });
        setStats({ total: count || 0 });
      } catch {
        setStats({ total: 0 });
      }
    };
    load();
  }, []);

  return (
    <ProtectedRoute>
      <div className="mx-auto flex max-w-6xl px-4">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Welcome</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded border p-4">
              <div className="text-sm text-muted-foreground">Total Articles</div>
              <div className="text-3xl font-bold">{stats?.total ?? '—'}</div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}