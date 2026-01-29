'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Appointment } from '@/lib/types';
import { useState } from 'react';

interface MonthCalendarProps {
  appointments: Appointment[];
}

export function MonthCalendar({ appointments }: MonthCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Get dates that have appointments
  const appointmentDates = appointments.map(apt => {
    const d = new Date(apt.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  });

  return (
    <Card className="p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md"
        modifiers={{
          appointment: (day) => {
            const dayTime = new Date(day);
            dayTime.setHours(0, 0, 0, 0);
            return appointmentDates.includes(dayTime.getTime());
          }
        }}
        modifiersStyles={{
          appointment: {
            fontWeight: 'bold',
            textDecoration: 'underline',
            textDecorationColor: 'oklch(0.79 0.14 189)',
            textDecorationThickness: '2px',
          }
        }}
      />
    </Card>
  );
}
