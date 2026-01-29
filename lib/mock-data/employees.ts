import { User } from '../types';

// Mock employee users for authentication and admin interface
export const mockEmployees: User[] = [
  {
    id: 'e1',
    name: 'Dr. Sara Blank',
    email: 'sara.blank@sention.se',
    avatar: '/avatars/sara.jpg',
    isPremium: true,
    role: 'employee',
    employeeType: 'doctor',
  },
  {
    id: 'e2',
    name: 'Emma Lundgren',
    email: 'emma.lundgren@sention.se',
    avatar: '/avatars/default-avatar.jpg',
    isPremium: true,
    role: 'employee',
    employeeType: 'nurse',
  },
  {
    id: 'e3',
    name: 'Admin User',
    email: 'admin@sention.se',
    avatar: '/avatars/default-avatar.jpg',
    isPremium: true,
    role: 'employee',
    employeeType: 'admin',
  },
];

// Helper function to get employee by ID
export function getEmployeeById(employeeId: string): User | undefined {
  return mockEmployees.find(e => e.id === employeeId);
}

// Helper function to get employee by email (for login)
export function getEmployeeByEmail(email: string): User | undefined {
  return mockEmployees.find(e => e.email === email);
}
