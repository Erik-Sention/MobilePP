'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  Settings,
  LogOut,
  Sun,
  Moon,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/employee', label: 'Dashboard', icon: LayoutDashboard, exactMatch: true },
  { href: '/employee/patients', label: 'Patienter', icon: Users },
  { href: '/employee/messages', label: 'Meddelanden', icon: MessageSquare },
  { href: '/employee/kalender', label: 'Kalender', icon: Calendar },
  { href: '/employee/content', label: 'Innehåll', icon: FileText },
  { href: '/employee/settings', label: 'Inställningar', icon: Settings },
];

export function DesktopSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] border-r bg-card flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/employee" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-xl">SENTION</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exactMatch 
            ? pathname === item.href 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User profile section */}
      <div className="p-4 border-t space-y-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.employeeType === 'doctor' ? 'Läkare' : 
               user?.employeeType === 'nurse' ? 'Sjuksköterska' : 
               'Admin'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={toggleTheme} 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logga ut
          </Button>
        </div>
      </div>
    </aside>
  );
}
