'use client';

import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
    return (
        <header className="fixed top-6 left-6 z-30">
            <ThemeToggle />
        </header>
    );
}