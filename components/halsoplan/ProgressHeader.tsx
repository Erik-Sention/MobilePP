import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ProgressHeaderProps {
  progress: number;
}

export function ProgressHeader({ progress }: ProgressHeaderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">DIN RESA</p>
          <h1 className="text-2xl font-bold mt-1">Hälsoplan</h1>
        </div>
        <Badge variant="secondary" className="text-primary bg-primary/10 text-base px-3 py-1">
          {progress}% avklarat
        </Badge>
      </div>

      <Progress value={progress} className="h-3 mt-3" />
    </div>
  );
}
