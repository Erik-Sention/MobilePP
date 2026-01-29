import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface QuickLinkCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  href: string;
  accent?: boolean;
}

export function QuickLinkCard({ title, subtitle, icon: Icon, href, accent }: QuickLinkCardProps) {
  return (
    <Link href={href}>
      <Card
        className={`p-4 h-full flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer ${
          accent ? 'border-primary/20 bg-primary/5' : ''
        }`}
      >
        <div className={`rounded-full p-3 mb-2 ${accent ? 'bg-primary/10' : 'bg-muted'}`}>
          <Icon className={`h-6 w-6 ${accent ? 'text-primary' : 'text-foreground'}`} />
        </div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </Card>
    </Link>
  );
}
