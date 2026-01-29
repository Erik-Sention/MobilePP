'use client';

import { ContentLibraryCard } from '@/components/bibliotek/ContentLibraryCard';
import { TeamMemberCard } from '@/components/bibliotek/TeamMemberCard';
import { getContentForPatient } from '@/lib/mock-data/content-library';
import { mockTeamMembers } from '@/lib/mock-data/team';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function BibliotekPage() {
  const { user } = useAuth();

  // Get only content assigned to this patient
  const assignedContent = user ? getContentForPatient(user.id) : [];

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-card-strong sticky top-0 z-10 border-b border-border/50 pt-6 pb-4 px-4 flex items-center justify-between mb-4">
        <Link href="/customer" className="p-2 -ml-2 hover:bg-muted/50 rounded-lg transition-colors">
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
          {assignedContent.length > 0 ? (
            <div className="space-y-3">
              {assignedContent.map((content) => (
                <ContentLibraryCard key={content.id} content={content} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Inga artiklar tilldelade än. Din vårdgivare kommer tilldela relevant innehåll till dig.
            </p>
          )}
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
