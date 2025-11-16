import TypewriterText from '@/components/TypewriterText';
import SearchBar from '@/components/SearchBar';
import { Check } from 'lucide-react';
import { displayFont } from '@/lib/fonts';

export default function HeroSection() {
  return (
    <section className="flex min-h-[78vh] flex-col items-center justify-center px-6 text-center">
      <h1 className={`${displayFont.className} text-7xl font-extrabold tracking-tight sm:text-8xl`}>SCHOLAR</h1>
      <TypewriterText />
      <div className="mt-2 h-0.5 w-28 rounded bg-accent" />
      <div className="mt-10 w-full max-w-4xl">
        <SearchBar large />
      </div>
      <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
        Your comprehensive research hub for peer‑reviewed articles across AI, medicine,
        physics, biology, and technology—all in one place.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Thousands of papers</span>
        <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Cross‑disciplinary search</span>
        <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Instant discovery</span>
      </div>
    </section>
  );
}