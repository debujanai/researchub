import { AnimatedSearchBar } from '@/components/ui/animated-search-bar';
import { Check } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pointer-events-none flex min-h-[78vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-light tracking-tight sm:text-8xl">SCHOLAR</h1>
      <div className="pointer-events-auto mt-10 w-full max-w-4xl">
        <AnimatedSearchBar className="mx-auto" />
      </div>
      <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
        Your comprehensive hub for peer‑reviewed civil engineering articles and papers—
        structural, geotechnical, transportation, water resources, environmental, materials, and construction.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Codes & standards</span>
        <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Discipline filters</span>
        <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Instant discovery</span>
      </div>
    </section>
  );
}