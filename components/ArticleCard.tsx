'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';
import type { Article } from '@/lib/types';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug || article.id}`}>
      <div
        className={cn(
          "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
          "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
          "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
          "hover:-translate-y-0.5 will-change-transform"
        )}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
        </div>

        <div className="relative flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
              <FileText className="w-4 h-4 text-blue-500" />
            </div>
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
              )}
            >
              {new Date(article.published_date).toLocaleDateString()}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-[15px] line-clamp-2">
              {article.title}
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                {article.author}
              </span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425] line-clamp-3">
              {article.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              {article.tags?.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Read →
            </span>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
}