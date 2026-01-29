import { User } from '../types';

// This is the original mock user - now also available in mockPatients
export const mockUser: User = {
  id: '1',
  name: 'Erik Svensson',
  email: 'erik@example.com',
  avatar: '/avatars/erik.jpg',
  isPremium: true,
  role: 'customer',
};
