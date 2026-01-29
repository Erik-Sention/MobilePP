'use client';

import { useState } from 'react';
import { mockPatients } from '@/lib/mock-data/patients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Mock data för senaste meddelanden
const mockLastMessages = [
  { patientId: '1', message: 'Tack för hjälpen!', timestamp: new Date('2026-01-29T10:30:00'), unread: 2 },
  { patientId: 'p2', message: 'När är nästa besök?', timestamp: new Date('2026-01-29T09:15:00'), unread: 1 },
  { patientId: 'p3', message: 'Okej, jag förstår', timestamp: new Date('2026-01-28T16:20:00'), unread: 0 },
  { patientId: 'p4', message: 'Kan vi boka om?', timestamp: new Date('2026-01-28T14:10:00'), unread: 3 },
  { patientId: 'p5', message: 'Har läst artikeln', timestamp: new Date('2026-01-27T11:00:00'), unread: 0 },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const patientsWithMessages = mockPatients.map(patient => {
    const lastMessage = mockLastMessages.find(m => m.patientId === patient.id);
    return {
      ...patient,
      lastMessage: lastMessage?.message || 'Ingen konversation ännu',
      timestamp: lastMessage?.timestamp || null,
      unread: lastMessage?.unread || 0
    };
  }).sort((a, b) => {
    if (!a.timestamp) return 1;
    if (!b.timestamp) return -1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const filteredPatients = patientsWithMessages.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = patientsWithMessages.reduce((sum, p) => sum + p.unread, 0);

  const formatTime = (date: Date | null) => {
    if (!date) return '';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just nu';
    if (hours < 24) return `${hours}h sedan`;
    if (days === 1) return 'Igår';
    if (days < 7) return `${days} dagar sedan`;
    return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Meddelanden</h1>
          {totalUnread > 0 && (
            <Badge variant="destructive" className="text-base px-3 py-1">
              {totalUnread} olästa
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          Kommunicera med dina patienter
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Sök patient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Konversationer</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredPatients.map((patient) => (
              <Link
                key={patient.id}
                href={`/employee/messages/${patient.id}`}
                className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                  patient.unread > 0 ? 'bg-primary/5' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback>{patient.name[0]}</AvatarFallback>
                  </Avatar>
                  {patient.unread > 0 && (
                    <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {patient.unread}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-medium truncate ${patient.unread > 0 ? 'font-semibold' : ''}`}>
                      {patient.name}
                    </p>
                    {patient.timestamp && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatTime(patient.timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm truncate ${
                      patient.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}>
                      {patient.lastMessage}
                    </p>
                    {patient.isPremium && (
                      <Badge variant="outline" className="shrink-0 text-xs">Premium</Badge>
                    )}
                  </div>
                </div>

                <MessageSquare className="h-5 w-5 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              Inga konversationer hittades
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
