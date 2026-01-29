import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LibraryContent } from '@/lib/types';
import { ChevronRight, Check } from 'lucide-react';
import Image from 'next/image';

interface ContentLibraryCardProps {
  content: LibraryContent;
}

export function ContentLibraryCard({ content }: ContentLibraryCardProps) {
  const isNew = content.status === 'new';
  const isCompleted = content.status === 'completed';

  return (
    <Card className="p-0 overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
      {/* Landscape Image */}
      <div className="relative w-full h-32 overflow-hidden bg-muted">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badge overlay */}
        <div className="absolute top-2 right-2">
          {isNew && (
            <Badge className="bg-foreground/90 text-background text-xs px-2 py-1">
              {content.badgeText}
            </Badge>
          )}
          {isCompleted && (
            <Badge className="bg-muted/80 text-muted-foreground text-xs px-2 py-1 flex items-center gap-1">
              <Check className="h-3 w-3" />
              {content.badgeText}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm leading-tight">{content.title}</h3>
          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </div>

        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {content.description}
        </p>

        {content.progress > 0 && content.progress < 100 && (
          <div className="flex items-center gap-2">
            <Progress value={content.progress} className="h-1 flex-1" />
            <span className="text-xs text-muted-foreground">{content.progress}%</span>
          </div>
        )}

        {isCompleted && (
          <Progress value={100} className="h-1" />
        )}
      </div>
    </Card>
  );
}
