import { ChatConversation, ChatMessage } from '../types';

export const mockConversations: ChatConversation[] = [
  {
    id: '1',
    participantId: '1',
    participantName: 'Dr. Sara Blank',
    participantAvatar: '/avatars/sara.jpg',
    participantRole: 'Specialistläkare',
    isOnline: true,
    lastMessage: 'Hur mår du idag?',
    lastMessageTime: new Date(2026, 0, 26, 10, 42),
    unreadCount: 1,
  },
  {
    id: '2',
    participantId: '3',
    participantName: 'Sjuksköterska Erik',
    participantAvatar: '/avatars/nurse.jpg',
    participantRole: 'Sjuksköterska',
    isOnline: false,
    lastMessage: 'Din tid är bokad.',
    lastMessageTime: new Date(2026, 0, 26, 8, 30),
    unreadCount: 0,
  },
  {
    id: '3',
    participantId: '4',
    participantName: 'Receptionen',
    participantAvatar: '/avatars/reception.jpg',
    participantRole: 'Reception',
    isOnline: false,
    lastMessage: 'Tack, vi har mottagit din betalning.',
    lastMessageTime: new Date(2026, 0, 25, 15, 20),
    unreadCount: 0,
  },
  {
    id: '4',
    participantId: '5',
    participantName: 'Fysioterapeut Anna',
    participantAvatar: '/avatars/anna.jpg',
    participantRole: 'Fysioterapeut',
    isOnline: true,
    lastMessage: 'Här är övningarna vi pratade om.',
    lastMessageTime: new Date(2026, 0, 22, 14, 10),
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: 'm1',
      conversationId: '1',
      senderId: '1',
      content: 'Hej! Hur har din sömn varit de senaste dagarna?',
      timestamp: new Date(2026, 0, 26, 14, 28),
      isRead: true,
      isSent: false,
    },
    {
      id: 'm2',
      conversationId: '1',
      senderId: 'current-user',
      content: 'Det har varit lite bättre, tack. Jag vaknade bara en gång inatt.',
      timestamp: new Date(2026, 0, 26, 14, 30),
      isRead: true,
      isSent: true,
    },
  ],
  '2': [
    {
      id: 'm3',
      conversationId: '2',
      senderId: '3',
      content: 'Din tid för blodprov är bokad till tisdag kl 09:00.',
      timestamp: new Date(2026, 0, 26, 8, 30),
      isRead: true,
      isSent: false,
    },
  ],
  '3': [
    {
      id: 'm4',
      conversationId: '3',
      senderId: '4',
      content: 'Tack för din betalning. Ditt kvitto finns under Mina dokument.',
      timestamp: new Date(2026, 0, 25, 15, 20),
      isRead: true,
      isSent: false,
    },
  ],
  '4': [
    {
      id: 'm5',
      conversationId: '4',
      senderId: '5',
      content: 'Här är de övningar vi diskuterade: 1) Nacksträck 2) Axelrullningar 3) Ryggsträck',
      timestamp: new Date(2026, 0, 22, 14, 10),
      isRead: true,
      isSent: false,
    },
  ],
};
