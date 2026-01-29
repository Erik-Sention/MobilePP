// User & Authentication
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
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
