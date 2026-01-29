import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/lib/types';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={appointment.providerAvatar} alt={appointment.providerName} />
          <AvatarFallback>{appointment.providerName[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-semibold">{appointment.title}</h3>
              <p className="text-sm text-muted-foreground">{appointment.providerName}</p>
            </div>
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
              {appointment.type}
            </Badge>
          </div>

          <div className="space-y-1 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(appointment.date, 'EEEE d MMMM', { locale: sv })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{format(appointment.date, 'HH:mm', { locale: sv })} ({appointment.duration} min)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{appointment.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
