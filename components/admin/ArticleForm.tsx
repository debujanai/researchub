'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSupabase } from '@/lib/supabase';
import { sanitizeContent } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ensureUniqueSlug, slugify } from '@/lib/slug';

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  content: z.string().min(20),
  author: z.string().min(2),
  published_date: z.string().min(4),
  category: z.string().min(2),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ArticleForm({ initial, mode = 'create', articleId }: { initial?: Partial<FormValues>; mode?: 'create' | 'edit'; articleId?: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: initial });

  const onSubmit = async (values: FormValues) => {
    const {
      data: { user },
    } = await getSupabase().auth.getUser();
    const baseSlug = slugify(values.title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug, () => getSupabase(), mode === 'edit' ? articleId : undefined);
    const payload = {
      title: values.title,
      description: values.description,
      content: sanitizeContent(values.content),
      author: values.author,
      published_date: values.published_date,
      category: values.category,
      tags: (values.tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      slug: uniqueSlug,
      uploaded_by: user?.id || null,
    } as any;

    if (mode === 'create') {
      const { error } = await getSupabase().from('articles').insert(payload);
      if (error) {
        toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Article uploaded', description: values.title });
      router.push('/admin/articles');
    } else {
      const { error } = await getSupabase()
        .from('articles')
        .update(payload)
        .eq('id', articleId);
      if (error) {
        toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Article updated', description: values.title });
      router.push('/admin/articles');
    }
  };

  return (
    <div className="rounded-xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-sm font-medium">Title</Label>
          <Input id="title" {...register('title')} className="mt-2 bg-background/50" />
          {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="description" className="text-sm font-medium">Description / Abstract</Label>
          <Textarea id="description" rows={3} {...register('description')} className="mt-2 bg-background/50" />
          {errors.description && (
            <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="content" className="text-sm font-medium">Full Content</Label>
          <Textarea id="content" rows={10} {...register('content')} className="mt-2 bg-background/50" />
          {errors.content && <p className="mt-1 text-sm text-destructive">{errors.content.message}</p>}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="author" className="text-sm font-medium">Author</Label>
            <Input id="author" {...register('author')} className="mt-2 bg-background/50" />
            {errors.author && <p className="mt-1 text-sm text-destructive">{errors.author.message}</p>}
          </div>
          <div>
            <Label htmlFor="date" className="text-sm font-medium">Publication Date</Label>
            <Input type="date" id="date" {...register('published_date')} className="mt-2 bg-background/50" />
            {errors.published_date && (
              <p className="mt-1 text-sm text-destructive">{errors.published_date.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label className="text-sm font-medium">Category</Label>
            <Select onValueChange={(v) => setValue('category', v)}>
              <SelectTrigger className="mt-2 bg-background/50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'Structural',
                  'Geotechnical',
                  'Transportation',
                  'Water Resources',
                  'Environmental',
                  'Construction Management',
                  'Materials',
                  'Coastal',
                  'Surveying',
                ].map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="mt-1 text-sm text-destructive">{errors.category.message}</p>}
          </div>
          <div>
            <Label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</Label>
            <Input id="tags" placeholder="machine learning, healthcare" {...register('tags')} className="mt-2 bg-background/50" />
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="px-6">
            {isSubmitting ? 'Uploading…' : mode === 'create' ? 'Upload Article' : 'Save Changes'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => history.back()} className="px-6">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}