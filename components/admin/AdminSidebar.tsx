import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r">
      <nav className="space-y-1 p-4">
        <Link href="/admin" className="block rounded px-3 py-2 hover:bg-accent">
          Dashboard
        </Link>
        <Link href="/admin/upload" className="block rounded px-3 py-2 hover:bg-accent">
          Upload Article
        </Link>
        <Link href="/admin/articles" className="block rounded px-3 py-2 hover:bg-accent">
          Manage Articles
        </Link>
        <Link href="/admin/login" className="block rounded px-3 py-2 hover:bg-accent">
          Logout
        </Link>
      </nav>
    </aside>
  );
}