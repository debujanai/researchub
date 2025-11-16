import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Spinner size={22} />
        <span>Loading…</span>
      </div>
    </div>
  );
}