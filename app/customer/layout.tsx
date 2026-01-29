'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, isEmployee } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Not authenticated - redirect to login
        router.push('/login');
      } else if (isEmployee) {
        // Employee trying to access customer routes - redirect to employee dashboard
        router.push('/employee');
      }
    }
  }, [isAuthenticated, isLoading, isEmployee, router]);

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

  if (!isAuthenticated || isEmployee) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20 transition-colors duration-300">
      <main className="max-w-mobile mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
