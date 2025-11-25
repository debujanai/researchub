'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ArticleForm from '@/components/admin/ArticleForm';

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="ml-64 mt-16 flex-1 p-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-3xl font-light tracking-tight">Upload Article</h2>
            <ArticleForm />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}