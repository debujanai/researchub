'use client';

import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const { signInWithGoogle, isAdmin, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && isAdmin) router.replace('/admin');
  }, [isAdmin, loading, router]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Admin Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={signInWithGoogle} className="w-full" variant="default">
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}