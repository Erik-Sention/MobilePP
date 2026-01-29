'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { DesktopHeader } from '@/components/layout/DesktopHeader';

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, isCustomer } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (isCustomer) {
        router.push('/customer');
      }
    }
  }, [isAuthenticated, isLoading, isCustomer, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Laddar...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || isCustomer) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col ml-[280px]">
        <DesktopHeader />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
