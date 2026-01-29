import { ContentLibraryCard } from '@/components/bibliotek/ContentLibraryCard';
import { TeamMemberCard } from '@/components/bibliotek/TeamMemberCard';
import { mockLibraryContent } from '@/lib/mock-data/library';
import { mockTeamMembers } from '@/lib/mock-data/team';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function BibliotekPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-card-strong sticky top-0 z-10 border-b border-border/50 pt-6 pb-4 px-4 flex items-center justify-between mb-4">
        <Link href="/" className="p-2 -ml-2 hover:bg-muted/50 rounded-lg transition-colors">
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Bibliotek</h1>
        <div className="w-10" />
      </header>

      <div className="p-4 space-y-6">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Mitt Bibliotek</h2>
            <Link href="#" className="text-foreground opacity-60 hover:opacity-100 text-sm font-medium transition-opacity">
              Se alla
            </Link>
          </div>
          <div className="space-y-3">
            {mockLibraryContent.map((content) => (
              <ContentLibraryCard key={content.id} content={content} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">Ditt Team</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Dina tillgängliga specialister och vårdgivare.
          </p>
          <div className="space-y-3">
            {mockTeamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
