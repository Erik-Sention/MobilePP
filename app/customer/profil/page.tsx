import { ProfileHeader } from '@/components/profil/ProfileHeader';
import { QuickLinkCard } from '@/components/profil/QuickLinkCard';
import { SettingsSection } from '@/components/profil/SettingsSection';
import { Calendar, FileText, FolderOpen } from 'lucide-react';

export default function ProfilPage() {
  const quickLinks = [
    {
      id: '1',
      title: 'Boka tid / Besök',
      subtitle: 'Tillgängliga tider idag',
      icon: Calendar,
      href: '/customer/kalender',
      accent: true,
    },
    {
      id: '2',
      title: 'Mina recept',
      icon: FileText,
      href: '#',
    },
    {
      id: '3',
      title: 'Mina dokument',
      icon: FolderOpen,
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white p-4 text-center border-b sticky top-0 z-10">
        <h1 className="text-xl font-bold">Profil</h1>
      </header>

      <div className="p-4 space-y-6 bg-background">
        <ProfileHeader />

        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            SNABBLÄNKAR
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.slice(0, 1).map((link) => (
              <div key={link.id} className="col-span-2">
                <QuickLinkCard {...link} />
              </div>
            ))}
            {quickLinks.slice(1).map((link) => (
              <QuickLinkCard key={link.id} {...link} />
            ))}
          </div>
        </section>

        <SettingsSection />
      </div>
    </div>
  );
}
