import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/types';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug || article.id}`}>
      <Card className="transition hover:shadow-md">
        <CardHeader>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 line-clamp-3 text-sm text-muted-foreground">
            {article.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>
              {article.author} • {new Date(article.published_date).toLocaleDateString()}
            </span>
            {article.tags?.slice(0, 4).map((t) => (
              <Badge key={t} variant="secondary" className="text-[10px]">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}