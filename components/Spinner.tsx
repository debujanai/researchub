export default function Spinner({ size = 20 }: { size?: number }) {
  const s = `${size}px`;
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary"
      style={{ width: s, height: s }}
      aria-label="Loading"
    />
  );
}