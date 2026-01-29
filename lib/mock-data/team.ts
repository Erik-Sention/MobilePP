import { TeamMember } from '../types';

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Sara Blank',
    title: 'Specialistläkare',
    specialty: 'Allmänmedicin',
    avatar: '/avatars/sara.jpg',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Johan Svensson',
    title: 'Psykolog',
    specialty: 'KBT',
    avatar: '/avatars/johan.jpg',
    isOnline: false,
  },
];
