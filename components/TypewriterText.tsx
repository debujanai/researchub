'use client';

import { useEffect, useState } from 'react';

const phrases = [
  'Search for AI research...',
  'Search for Medical studies...',
  'Search for Physics papers...',
  'Search for Biology articles...',
  'Search for Technology research...',
];

export default function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [mode, setMode] = useState<'typing' | 'deleting'>('typing');

  useEffect(() => {
    const current = phrases[index % phrases.length];
    const isTyping = mode === 'typing';
    const speed = isTyping ? 120 : 60;

    const timer = setTimeout(() => {
      if (isTyping) {
        const next = current.slice(0, display.length + 1);
        setDisplay(next);
        if (next === current) {
          setTimeout(() => setMode('deleting'), 2000);
        }
      } else {
        const next = current.slice(0, Math.max(0, display.length - 1));
        setDisplay(next);
        if (next.length === 0) {
          setTimeout(() => {
            setMode('typing');
            setIndex((i) => (i + 1) % phrases.length);
          }, 500);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [display, index, mode]);

  return (
    <div className="mt-4 text-2xl text-muted-foreground">
      {display}
      <span aria-hidden className="ml-1 inline-block animate-pulse">|</span>
    </div>
  );
}
