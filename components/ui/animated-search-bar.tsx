'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface AnimatedSearchBarProps {
    onSearch?: (query: string) => void;
    className?: string;
}

export function AnimatedSearchBar({ onSearch, className }: AnimatedSearchBarProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            onSearch?.(trimmedQuery);
            router.push(`/search/${encodeURIComponent(trimmedQuery)}`);
        }
    };


    // Collapse when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (!query) {
                    setIsExpanded(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [query]);

    return (
        <form
            ref={containerRef}
            onSubmit={handleSubmit}
            className={cn(
                'relative flex items-center justify-center',
                className
            )}
            onClick={() => {
                if (!isExpanded) {
                    setIsExpanded(true);
                    inputRef.current?.focus();
                }
            }}
        >
            <motion.div
                initial={false}
                animate={{
                    width: isExpanded ? '100%' : '300px',
                    maxWidth: isExpanded ? '600px' : '300px',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative flex items-center bg-card rounded-full shadow-md border border-border/50"
            >
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 h-12 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-6 text-base placeholder:text-muted-foreground/70"
                />
            </motion.div>

            <div className="ml-3 w-12 h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {isExpanded && (
                        <motion.button
                            key="search-button"
                            type="submit"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white shadow-lg hover:bg-black/90 transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </form>
    );
}
