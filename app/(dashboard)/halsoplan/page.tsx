import { HealthcareNotesSection } from '@/components/halsoplan/HealthcareNotesSection';
import { mockHealthcareNotes } from '@/lib/mock-data/healthcare-notes';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function HalsoplanPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-card-strong sticky top-0 z-10 border-b border-border/50 pt-6 pb-4 px-4 flex items-center justify-between mb-4">
        <Link href="/" className="p-2 -ml-2 hover:bg-muted/50 rounded-lg transition-colors">
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Hälsoplan</h1>
        <div className="w-10"></div>
      </header>

      <div className="p-4 space-y-6 pb-24">
        <HealthcareNotesSection notes={mockHealthcareNotes} />
      </div>
    </div>
  );
}
