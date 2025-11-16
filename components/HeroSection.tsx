import TypewriterText from '@/components/TypewriterText';
import SearchBar from '@/components/SearchBar';

export default function HeroSection() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">ResearchHub</h1>
      <TypewriterText />
      <div className="mt-10 w-full">
        <SearchBar large />
      </div>
    </section>
  );
}