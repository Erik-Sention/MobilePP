import { Appointment } from '../types';

// Customer appointments (for patient view)
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Rutinkontroll',
    providerId: '1',
    providerName: 'Dr. Sara Blank',
    providerAvatar: '/avatars/sara.jpg',
    type: 'Konsultation',
    date: new Date(2026, 1, 3, 10, 0),
    duration: 30,
    location: 'Vårdcentralen Norr',
    notes: 'Årlig hälsokontroll',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Uppföljning',
    providerId: '2',
    providerName: 'Johan Svensson',
    providerAvatar: '/avatars/johan.jpg',
    type: 'KBT-session',
    date: new Date(2026, 1, 10, 14, 0),
    duration: 45,
    location: 'Psykologmottagningen',
    notes: 'Fortsatt stresshantering',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Blodprov',
    providerId: '3',
    providerName: 'Sjuksköterska Erik',
    providerAvatar: '/avatars/nurse.jpg',
    type: 'Provtagning',
    date: new Date(2026, 1, 6, 9, 0),
    duration: 15,
    location: 'Vårdcentralen Norr',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Fysioterapi',
    providerId: '5',
    providerName: 'Fysioterapeut Anna',
    providerAvatar: '/avatars/anna.jpg',
    type: 'Behandling',
    date: new Date(2026, 1, 15, 11, 30),
    duration: 60,
    location: 'Fysioterapimottagningen',
    notes: 'Behandling för ryggbesvär',
    status: 'upcoming',
  },
];

// Employee calendar appointments (for staff view)
export interface EmployeeAppointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  type: 'video' | 'in-person';
  duration: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export const mockEmployeeAppointments: EmployeeAppointment[] = [
  // This week
  {
    id: 'ea1',
    patientId: '1',
    date: '2026-01-29',
    time: '09:00',
    type: 'video',
    duration: '30',
    notes: 'Uppföljning av mediciner',
    status: 'upcoming',
  },
  {
    id: 'ea2',
    patientId: '2',
    date: '2026-01-29',
    time: '10:30',
    type: 'in-person',
    duration: '45',
    notes: 'Rutinkontroll',
    status: 'upcoming',
  },
  {
    id: 'ea3',
    patientId: '3',
    date: '2026-01-29',
    time: '14:00',
    type: 'video',
    duration: '30',
    status: 'upcoming',
  },
  {
    id: 'ea4',
    patientId: '1',
    date: '2026-01-30',
    time: '11:00',
    type: 'in-person',
    duration: '60',
    notes: 'Blodprov och allmän hälsokontroll',
    status: 'upcoming',
  },
  {
    id: 'ea5',
    patientId: '4',
    date: '2026-01-30',
    time: '13:30',
    type: 'video',
    duration: '30',
    status: 'upcoming',
  },
  {
    id: 'ea6',
    patientId: '2',
    date: '2026-01-31',
    time: '09:30',
    type: 'in-person',
    duration: '45',
    notes: 'Uppföljning av behandling',
    status: 'upcoming',
  },
  {
    id: 'ea7',
    patientId: '5',
    date: '2026-01-31',
    time: '15:00',
    type: 'video',
    duration: '30',
    status: 'upcoming',
  },
  // Next week
  {
    id: 'ea8',
    patientId: '3',
    date: '2026-02-03',
    time: '10:00',
    type: 'in-person',
    duration: '30',
    status: 'upcoming',
  },
  {
    id: 'ea9',
    patientId: '1',
    date: '2026-02-04',
    time: '14:30',
    type: 'video',
    duration: '30',
    notes: 'Diskutera testresultat',
    status: 'upcoming',
  },
  {
    id: 'ea10',
    patientId: '4',
    date: '2026-02-05',
    time: '11:00',
    type: 'in-person',
    duration: '45',
    status: 'upcoming',
  },
  // Past appointments
  {
    id: 'ea11',
    patientId: '2',
    date: '2026-01-22',
    time: '09:00',
    type: 'video',
    duration: '30',
    status: 'completed',
  },
  {
    id: 'ea12',
    patientId: '5',
    date: '2026-01-23',
    time: '13:00',
    type: 'in-person',
    duration: '60',
    status: 'completed',
  },
];
