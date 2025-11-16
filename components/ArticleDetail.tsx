import Link from 'next/link';
import type { Article } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export default function ArticleDetail({ article, showEdit }: { article: Article; showEdit?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link href="/">Home</Link> <span className="mx-1">›</span>{' '}
        <Link href={`/search?q=${encodeURIComponent(article.title)}`}>Search</Link>{' '}
        <span className="mx-1">›</span> <span>{article.title}</span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{article.title}</h1>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>
          {article.author} • {new Date(article.published_date).toLocaleDateString()}
        </span>
        <span className="ml-2">Category: {article.category}</span>
        <div className="ml-auto flex gap-2">
          {article.tags?.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </div>
      <div className="prose max-w-none dark:prose-invert">
        <p className="whitespace-pre-wrap leading-relaxed">{article.content}</p>
      </div>
      {showEdit && (
        <div className="mt-6">
          <Link href={`/admin/edit/${article.id}`} className="text-sm font-medium text-primary">
            Edit Article
          </Link>
        </div>
      )}
      <div className="mt-8">
        <Link href="/search" className="text-sm text-muted-foreground">
          ← Back to Search
        </Link>
      </div>
    </div>
  );
}
