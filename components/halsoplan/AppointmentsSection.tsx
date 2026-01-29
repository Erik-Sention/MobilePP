'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Plus, Video } from 'lucide-react';
import { Appointment } from '@/lib/types';

interface AppointmentsSectionProps {
  appointments: Appointment[];
}

export function AppointmentsSection({ appointments }: AppointmentsSectionProps) {
  const upcomingAppointments = appointments
    .filter(apt => apt.status === 'upcoming' && new Date(apt.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const handleBookAppointment = () => {
    // TODO: Implement booking modal or navigation
    alert('Bokningsfunktion kommer snart!');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-foreground opacity-40" />
          <h2 className="text-lg font-semibold">Kommande Besök</h2>
        </div>
        <Button
          size="sm"
          className="bg-foreground/90 text-background hover:bg-foreground flex items-center gap-1"
          onClick={handleBookAppointment}
        >
          <Plus className="h-4 w-4" />
          Boka Tid
        </Button>
      </div>

      {upcomingAppointments.length === 0 ? (
        <Card className="card-glass p-6 text-center">
          <p className="text-muted-foreground mb-4">Inga kommande besök inbokade</p>
          <Button
            variant="outline"
            onClick={handleBookAppointment}
            className="mx-auto"
          >
            Boka ditt första besök
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="card-glass hover-scale p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-foreground opacity-50" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm">{appointment.type}</h3>
                      <p className="text-xs text-muted-foreground">{appointment.providerName}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                      {appointment.status === 'upcoming' ? 'KOMMANDE' : appointment.status === 'completed' ? 'GENOMFÖRD' : 'INSTÄLLD'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(appointment.date).toLocaleDateString('sv-SE', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        })} • {new Date(appointment.date).toLocaleTimeString('sv-SE', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })} ({appointment.duration} min)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {appointment.location === 'Video' ? (
                        <>
                          <Video className="h-3 w-3" />
                          <span>Videomöte</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-3 w-3" />
                          <span>{appointment.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
