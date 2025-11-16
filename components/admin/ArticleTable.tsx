import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Article } from '@/lib/types';
import { getSupabase } from '@/lib/supabase';

export default function ArticleTable({ items, onRefresh }: { items: Article[]; onRefresh: () => void }) {
  const remove = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    const { error } = await getSupabase().from('articles').delete().eq('id', id);
    if (error) alert('Delete failed: ' + error.message);
    else onRefresh();
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="max-w-xs truncate">{a.title}</TableCell>
              <TableCell>{a.author}</TableCell>
              <TableCell>{new Date(a.published_date).toLocaleDateString()}</TableCell>
              <TableCell>{a.category}</TableCell>
              <TableCell className="text-right">
                <Button asChild variant="secondary" size="sm" className="mr-2">
                  <Link href={`/admin/edit/${a.id}`}>Edit</Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => remove(a.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}