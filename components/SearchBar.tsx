'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [q, setQ] = useState('');
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={submit} className={`mx-auto flex items-center gap-2 ${large ? 'max-w-2xl' : 'max-w-xl'} w-full`}>\
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What are you looking for?"
          className={`pl-10 ${large ? 'h-12 text-lg' : 'h-10'} rounded-full shadow-sm`}
        />
      </div>
    </form>
  );
}