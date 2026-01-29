'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, ClipboardList, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/customer', label: 'Hem', icon: Home },
  { href: '/customer/bibliotek', label: 'Bibliotek', icon: BookOpen },
  { href: '/customer/halsoplan', label: 'Hälsoplan', icon: ClipboardList },
  { href: '/customer/chatt', label: 'Chatt', icon: MessageSquare },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bottom-nav-premium pb-safe z-50">
      <div className="max-w-mobile mx-auto px-2">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href ||
              (item.href !== '/customer' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center py-2 px-1 transition-all relative',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5 transition-all" strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn(
                  "text-[10px] mt-0.5",
                  isActive ? "font-bold" : "font-medium"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
