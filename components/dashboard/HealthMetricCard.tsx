'use client';

import { HealthMetric } from '@/lib/types';

interface HealthMetricCardProps {
  metric: HealthMetric;
}

export function HealthMetricCard({ metric }: HealthMetricCardProps) {
  // Subtle contextual colors for different metric types
  const getIconColor = (type: string) => {
    switch (type) {
      case 'steps':
        return 'text-blue-500/50';
      case 'bpm':
        return 'text-rose-500/50';
      case 'sleep':
        return 'text-indigo-500/50';
      default:
        return 'text-foreground/50';
    }
  };

  return (
    <button
      className="w-full"
      onClick={() => {
        // TODO: Navigate to detailed metric view
        console.log('View details for:', metric.type);
      }}
    >
      <div className="glass-card-compact hover-lift tap-effect p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[120px] border border-border/30">
        <div className={`text-2xl mb-2 ${getIconColor(metric.type)}`}>{metric.icon}</div>
        <div className="text-2xl font-bold text-foreground">
          {metric.value.toLocaleString('sv-SE')}{metric.type === 'sleep' ? '%' : ''}
        </div>
        <div className="text-xs mt-1 uppercase tracking-wide text-muted-foreground">
          {metric.unit}
        </div>
      </div>
    </button>
  );
}
