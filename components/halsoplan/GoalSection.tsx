import { Goal } from '@/lib/types';
import { GoalTaskItem } from './GoalTaskItem';
import { Calendar } from 'lucide-react';

interface GoalSectionProps {
  title: string;
  subtitle: string;
  goals: Goal[];
}

export function GoalSection({ title, subtitle, goals }: GoalSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-5 w-5 text-foreground opacity-40" />
        <div className="flex-1">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <GoalTaskItem key={goal.id} goal={goal} />
        ))}
      </div>
    </section>
  );
}
