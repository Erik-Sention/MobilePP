'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Activity, Target, Calendar, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export function WelcomeHeader() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="space-y-4 -mx-4 -mt-4 mb-4">
        {/* Hero Section with Background Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src="/examplepics/erre_A_calm_minimalistic_photograph_of_a_quiet_everyday_momen_dd0f80a5-8e6d-455e-81d4-34e54bea8d04_3.png"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent" />

          {/* Header content overlay - positioned lower for PWA safe area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 flex items-end justify-between">
            <div className="flex-1">
              <p className="text-white/90 text-sm uppercase tracking-wide">ÖVERSIKT</p>
              <h1 className="text-white text-2xl font-bold mt-1">
                Välkommen {user?.name?.split(' ')[0] || 'Erik'}
              </h1>
            </div>

            <div className="flex items-end gap-2">
              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                className="glass-card-compact p-2 hover-scale tap-effect"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-white/90" />
                ) : (
                  <Sun className="h-5 w-5 text-white/90" />
                )}
              </button>

              <Link href="/profil" className="relative group">
                <Avatar className="h-12 w-12 border-2 border-white/80 group-hover:border-white transition-colors">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-foreground/80 text-background">{user?.name?.[0] || 'E'}</AvatarFallback>
                </Avatar>
                {/* Notification badge */}
                <div className="absolute -top-1 -right-1 bg-foreground/80 rounded-full p-1 group-hover:scale-110 transition-transform">
                  <Bell className="h-3 w-3 text-background" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Quick Navigation */}
      <div className="sticky top-0 z-40 -mx-4 px-4 pb-3 pt-2 glass-card-strong border-b border-border/50 transition-all mb-4">
        <div className="grid grid-cols-3 gap-2 max-w-mobile mx-auto">
          <button
            onClick={() => scrollToSection('health-metrics')}
            className="glass-card-compact hover-lift tap-effect p-3 text-center"
          >
            <Activity className="h-5 w-5 text-foreground opacity-40 mx-auto mb-1" />
            <p className="text-xs font-medium text-foreground">Hälsodata</p>
          </button>
          <button
            onClick={() => scrollToSection('goals')}
            className="glass-card-compact hover-lift tap-effect p-3 text-center"
          >
            <Target className="h-5 w-5 text-foreground opacity-40 mx-auto mb-1" />
            <p className="text-xs font-medium text-foreground">Mål</p>
          </button>
          <button
            onClick={() => scrollToSection('appointments')}
            className="glass-card-compact hover-lift tap-effect p-3 text-center"
          >
            <Calendar className="h-5 w-5 text-foreground opacity-40 mx-auto mb-1" />
            <p className="text-xs font-medium text-foreground">Besök</p>
          </button>
        </div>
      </div>
    </>
  );
}
