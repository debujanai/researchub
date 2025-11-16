'use client';

import { useEffect, useState } from 'react';

const phrases = [
  'Search for AI Research...',
  'Search for Medical Studies...',
  'Search for Physics Papers...',
  'Search for Biology Articles...',
  'Search for Technology Research...',
];

export default function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    const typeSpeed = deleting ? 60 : 120;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, display.length + 1);
        setDisplay(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        const next = current.slice(0, display.length - 1);
        setDisplay(next);
        if (next.length === 0) {
          setTimeout(() => {
            setDeleting(false);
            setIndex((i) => (i + 1) % phrases.length);
          }, 500);
        }
      }
    }, typeSpeed);
    return () => clearTimeout(timeout);
  }, [display, deleting, index]);

  return (
    <div className="mt-4 text-xl text-muted-foreground">
      {display}
      <span className="ml-1 inline-block animate-pulse">|</span>
    </div>
  );
}
