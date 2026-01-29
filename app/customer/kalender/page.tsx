import { AppointmentCard } from '@/components/kalender/AppointmentCard';
import { MonthCalendar } from '@/components/kalender/MonthCalendar';
import { mockAppointments } from '@/lib/mock-data/appointments';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function KalenderPage() {
  const upcomingAppointments = mockAppointments
    .filter(apt => apt.status === 'upcoming')
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-10 border-b">
        <Link href="/customer" className="p-2 -ml-2">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">Kalender</h1>
        <div className="w-10" />
      </header>

      <div className="p-4 space-y-6 bg-background">
        <MonthCalendar appointments={mockAppointments} />

        <section>
          <h2 className="text-lg font-bold mb-4">Kommande Besök</h2>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
