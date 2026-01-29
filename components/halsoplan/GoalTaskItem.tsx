import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Goal } from '@/lib/types';

interface GoalTaskItemProps {
  goal: Goal;
}

export function GoalTaskItem({ goal }: GoalTaskItemProps) {
  const isCompleted = goal.status === 'completed';

  return (
    <div className="glass-card-compact hover-lift">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isCompleted}
          className="mt-1 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold">{goal.title}</h3>
            {goal.badgeText && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground flex-shrink-0">
                {goal.badgeText}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {goal.description}
          </p>

          {goal.progress > 0 && (
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground/70 rounded-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              {goal.currentValue && goal.targetValue && goal.unit && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {goal.currentValue}/{goal.targetValue} {goal.unit}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
