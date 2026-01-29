'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BloodAnalysisItem } from '@/lib/types';
import { Droplet } from 'lucide-react';
import Link from 'next/link';

interface BloodAnalysisSectionProps {
  items: BloodAnalysisItem[];
}

export function BloodAnalysisSection({ items }: BloodAnalysisSectionProps) {
  return (
    <div className="glass-card-strong">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplet className="h-5 w-5 text-foreground opacity-40" />
          <h3 className="font-semibold">Senaste Blodanalys</h3>
        </div>
        <Link href="#" className="text-sm text-foreground opacity-60 font-medium hover:opacity-100 transition-opacity">
          SE ALLA
        </Link>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const percentage = ((item.value - item.min) / (item.max - item.min)) * 100;
          const isNormal = item.status === 'normal';

          return (
            <button
              key={item.id}
              className="w-full space-y-2 text-left p-3 -mx-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all tap-effect group"
              onClick={() => {
                // TODO: Navigate to detailed blood analysis
                console.log('View details for:', item.name);
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm font-bold">
                  {item.value} <span className="font-normal text-muted-foreground">{item.unit}</span>
                </span>
              </div>

              <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    isNormal ? 'bg-emerald-500/60' : 'bg-amber-500/60'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {item.statusText && (
                <span className={`text-xs ${isNormal ? 'text-emerald-600/80 dark:text-emerald-400/80' : 'text-muted-foreground'}`}>
                  {item.statusText}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
