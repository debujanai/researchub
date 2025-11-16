'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Header() {
  const { profile, isAdmin, signOut } = useAuth();
  const initials = (profile?.name || profile?.email || 'AU')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur">
      <div className="flex w-full items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-semibold">
          ResearchHub
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/search" className="hidden sm:inline-flex">
            <Button variant="outline" className="rounded-full">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </Link>
          <ThemeToggle />
          {profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-6 w-6">
                    {profile.avatar_url ? (
                      <AvatarImage src={profile.avatar_url} alt="avatar" />
                    ) : (
                      <AvatarFallback>{initials}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="hidden sm:inline">{profile.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                {isAdmin && <DropdownMenuItem asChild><Link href="/admin">Dashboard</Link></DropdownMenuItem>}
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/admin/login" className="text-sm">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}