'use client';

import { useAuth } from '@/context/AuthContext';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminHeader() {
    const { profile, signOut } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await signOut();
        router.push('/admin/login');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-light tracking-tight">SCHOLAR</h1>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Admin
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 px-4 py-2 transition-all hover:border-border hover:bg-card"
                        >
                            <div className="flex items-center gap-3">
                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt={profile.name || profile.email || 'Admin'}
                                        className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20">
                                        <User className="h-4 w-4 text-primary" />
                                    </div>
                                )}
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-medium">
                                        {profile?.name || 'Admin'}
                                    </span>
                                    {profile?.email && (
                                        <span className="text-xs text-muted-foreground">
                                            {profile.email}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 origin-top-right animate-in fade-in slide-in-from-top-2 rounded-lg border border-border/60 bg-card/95 backdrop-blur-xl shadow-lg">
                                <div className="p-2">
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
