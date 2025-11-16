'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Spinner from '@/components/Spinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !isAdmin) router.replace('/admin/login');
  }, [isAdmin, loading, router]);
  if (loading)
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Spinner />
          <span>Checking admin access…</span>
        </div>
      </div>
    );
  if (!isAdmin) return null;
  return <>{children}</>;
}