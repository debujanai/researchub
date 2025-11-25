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
    <div className="overflow-hidden rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/40 hover:bg-transparent">
              <TableHead className="font-medium">Title</TableHead>
              <TableHead className="font-medium">Author</TableHead>
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium">Category</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((a) => (
              <TableRow key={a.id} className="border-border/40 transition-colors hover:bg-accent/30">
                <TableCell className="max-w-xs truncate font-medium">{a.title}</TableCell>
                <TableCell className="text-muted-foreground">{a.author}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(a.published_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {a.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="secondary" size="sm">
                      <Link href={`/admin/edit/${a.id}`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => remove(a.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}