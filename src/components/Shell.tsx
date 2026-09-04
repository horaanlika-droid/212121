'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Px, StatusIcons } from './ui';
import { BASE } from '@/lib/base';

const NAV = [
  { href: '/map', label: 'КАРТА', icon: 'nav-map' },
  { href: '/encyclopedia', label: 'ЭНЦИКЛОПЕДИЯ', icon: 'nav-book' },
  { href: '/forum', label: 'ФОРУМ', icon: 'nav-forum' },
  { href: '/profile', label: 'ПРОФИЛЬ', icon: 'nav-profile' },
];

export default function Shell({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <>
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b-2 border-ink">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-[11px] font-bold">21:21</span>
          <Link href="/" className="h1 flex items-center gap-2">
            <Px n="logo" size={14} />{title}
          </Link>
          <span className="flex items-center gap-2">
            {right}
            <StatusIcons />
          </span>
        </div>
      </header>
      <main className="px-4 pt-4 space-y-4">{children}</main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-card border-t-2 border-ink pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4">
          {NAV.map((n) => {
            const active = path.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href}
                className={`flex flex-col items-center gap-1 py-2 text-[9px] font-bold tracking-wider ${active ? 'bg-ink text-card' : 'text-ink'}`}>
                <Px n={n.icon} size={18} className={active ? 'invert' : ''} />
                {n.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
