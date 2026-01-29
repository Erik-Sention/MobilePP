// User & Authentication
export type UserRole = 'customer' | 'employee';
export type EmployeeType = 'doctor' | 'nurse' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
  role: UserRole;
  employeeType?: EmployeeType; // Only for employees
}

// Patient Profile (extends User with health data for admin views)
export interface PatientProfile extends User {
  role: 'customer';
  assignedArticleIds: string[];
  lastActivity?: Date;
  // Personal information
  firstName: string;
  lastName: string;
  personnummer: string; // Swedish personal number (YYYYMMDD-XXXX)
  dateOfBirth: string;
  gender: 'man' | 'kvinna' | 'annat';
  phoneNumber: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  // Work information
  employer?: string;
  department?: string;
  jobTitle?: string;
  manager?: string; // Immediate supervisor
  workPhone?: string;
  workEmail?: string;
  // Emergency contact
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  // Medical/Insurance
  insuranceProvider?: string;
  insuranceNumber?: string;
  bloodType?: string;
  allergies?: string[];
}

// Health Metrics
export interface HealthMetric {
  id: string;
  type: 'steps' | 'bpm' | 'sleep';
  value: number;
  unit: string;
  icon: string;
  lastUpdated: Date;
}

export interface BloodPressure {
  systolic: number;
  diastolic: number;
  unit: string;
  timestamp: Date;
  changePercent: number;
  history: { timestamp: Date; value: number }[];
}

export interface BloodAnalysisItem {
  id: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: 'normal' | 'low' | 'high';
  statusText?: string;
}

// Library
export interface LibraryContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  progress: number; // 0-100
  status: 'new' | 'in-progress' | 'completed';
  badgeText?: string;
}

// Enhanced Content for Admin Management
export interface ContentArticle extends LibraryContent {
  createdBy: string; // Employee ID
  createdByName: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo: string[]; // Patient IDs
  category: string;
  tags: string[];
  publishStatus: 'draft' | 'published';
}

// Team
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  isOnline: boolean;
}

// Goals
export interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  progress: number; // 0-100
  currentValue?: number;
  targetValue?: number;
  unit?: string;
  status: 'completed' | 'in-progress' | 'pending';
  badgeText?: string;
}

// Chat
export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isSent: boolean; // true if sent by current user
}

// Calendar
export interface Appointment {
  id: string;
  title: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  type: string; // "Konsultation", "Uppföljning", etc.
  date: Date;
  duration: number; // minutes
  location: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}
