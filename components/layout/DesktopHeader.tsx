'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const routeLabels: Record<string, string> = {
  '/employee': 'Dashboard',
  '/employee/patients': 'Patienter',
  '/employee/content': 'Innehåll',
  '/employee/health-plans': 'Hälsoplaner',
  '/employee/settings': 'Inställningar',
};

export function DesktopHeader() {
  const pathname = usePathname();
  const currentLabel = routeLabels[pathname] || 'SENTION Admin';

  // Generate breadcrumbs
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = routeLabels[path] || segment;
    return { path, label };
  });

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-8">
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.length > 1 ? (
            <>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} className="flex items-center gap-2">
                  {index > 0 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-semibold text-foreground">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </div>
              ))}
            </>
          ) : (
            <h1 className="text-xl font-semibold">{currentLabel}</h1>
          )}
        </div>
      </div>
    </header>
  );
}
