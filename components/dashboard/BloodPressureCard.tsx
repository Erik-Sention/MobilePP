'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BloodPressure } from '@/lib/types';
import { Activity } from 'lucide-react';

interface BloodPressureCardProps {
  data: BloodPressure;
}

export function BloodPressureCard({ data }: BloodPressureCardProps) {
  // Simple SVG line chart
  const maxValue = Math.max(...data.history.map(h => h.value));
  const minValue = Math.min(...data.history.map(h => h.value));
  const range = maxValue - minValue || 10;

  const points = data.history.map((h, i) => {
    const x = (i / (data.history.length - 1)) * 100;
    const y = 100 - ((h.value - minValue) / range) * 60 - 20; // 20-80% range
    return `${x},${y}`;
  }).join(' ');

  return (
    <button
      className="w-full text-left"
      onClick={() => {
        // TODO: Navigate to detailed blood pressure history
        console.log('View blood pressure history');
      }}
    >
      <Card className="card-glass hover-scale p-4 transition-all active:scale-[0.98]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-foreground opacity-40" />
            <span className="text-sm font-medium text-muted-foreground uppercase">BLODTRYCK</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {data.changePercent}%
          </span>
        </div>

        <div className="mb-3">
          <div className="text-3xl font-bold">
            {data.systolic}/{data.diastolic}
            <span className="text-sm font-normal text-muted-foreground ml-2">{data.unit}</span>
          </div>
        </div>

        {/* Simple line chart */}
        <div className="h-24 w-full">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <polyline
              points={points}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              className="text-blue-500/60"
            />
            {/* Dots at each point */}
            {data.history.map((h, i) => {
              const x = (i / (data.history.length - 1)) * 100;
              const y = 100 - ((h.value - minValue) / range) * 60 - 20;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill="currentColor"
                  className="text-blue-500/60"
                />
              );
            })}
          </svg>
        </div>
      </Card>
    </button>
  );
}
