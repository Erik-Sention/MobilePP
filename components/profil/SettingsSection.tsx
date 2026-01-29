'use client';

import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Settings, Moon, ChevronRight, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SettingsSection() {
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div>
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        INSTÄLLNINGAR
      </h3>

      <Card className="divide-y">
        <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <span className="flex-1 text-left font-medium">Appinställningar</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="p-4 flex items-center gap-3">
          <Moon className="h-5 w-5 text-muted-foreground" />
          <span className="flex-1 font-medium">Mörkt tema</span>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>

        <button
          onClick={handleLogout}
          className="w-full p-4 flex items-center gap-3 hover:bg-destructive/10 transition-colors text-destructive"
        >
          <LogOut className="h-5 w-5" />
          <span className="flex-1 text-left font-medium">Logga ut</span>
        </button>
      </Card>
    </div>
  );
}
