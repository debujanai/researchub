'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
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
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="ml-64 mt-16 flex-1 p-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-3xl font-light tracking-tight">Dashboard</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Total Articles</div>
                <div className="text-4xl font-light tracking-tight">{stats?.total ?? '—'}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}