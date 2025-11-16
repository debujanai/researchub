'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ArticleForm from '@/components/admin/ArticleForm';

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto flex max-w-6xl px-4">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Upload Article</h2>
          <ArticleForm />
        </main>
      </div>
    </ProtectedRoute>
  );
}