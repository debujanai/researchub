import HeroSection from '@/components/HeroSection';
import { DotScreenShader } from '@/components/ui/dot-shader-background';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <DotScreenShader />
      </div>
      <HeroSection />
    </main>
  );
}
