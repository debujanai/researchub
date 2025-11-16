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
    <form onSubmit={submit} className={`mx-auto ${large ? 'max-w-3xl' : 'max-w-xl'} w-full`}>
      <div className={`relative flex items-center rounded-full bg-card shadow-xl ${large ? 'p-2' : 'p-1'} ring-1 ring-border/60`}> 
        <div className={`pointer-events-none pl-4 ${large ? 'pr-2' : 'pr-1'}`}>
          <Search className={`h-5 w-5 text-muted-foreground`} />
        </div>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What are you looking for?"
          className={`flex-1 border-0 bg-transparent focus-visible:ring-0 ${large ? 'h-12 text-base' : 'h-10'} px-0`}
        />
        <button
          type="submit"
          className={`ml-2 mr-2 grid shrink-0 place-items-center rounded-full bg-primary text-primary-foreground ${large ? 'h-12 w-12' : 'h-10 w-10'} shadow-md`}
          aria-label="Search"
        >
          <Search className={`${large ? 'h-5 w-5' : 'h-4 w-4'}`} />
        </button>
      </div>
    </form>
  );
}