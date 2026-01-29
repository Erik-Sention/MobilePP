'use client';

import { useState, use } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getPatientById } from '@/lib/mock-data/patients';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Paperclip, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock chat messages
const mockMessages = [
  {
    id: '1',
    content: 'Hej! Jag har en fråga om mina mediciner.',
    sender: 'patient',
    timestamp: new Date('2026-01-29T09:00:00'),
  },
  {
    id: '2',
    content: 'Hej Erik! Vad undrar du över?',
    sender: 'employee',
    timestamp: new Date('2026-01-29T09:05:00'),
  },
  {
    id: '3',
    content: 'Ska jag ta dem före eller efter mat?',
    sender: 'patient',
    timestamp: new Date('2026-01-29T09:07:00'),
  },
  {
    id: '4',
    content: 'Ta dem helst 30 minuter efter måltid. Jag har skickat en artikel med mer information i ditt bibliotek.',
    sender: 'employee',
    timestamp: new Date('2026-01-29T09:10:00'),
  },
  {
    id: '5',
    content: 'Tack för hjälpen!',
    sender: 'patient',
    timestamp: new Date('2026-01-29T10:30:00'),
  },
];

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const patient = getPatientById(id);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  if (!patient) {
    notFound();
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'employee' as const,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      return date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isYesterday) {
      return `Igår ${date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}`;
    }

    return date.toLocaleDateString('sv-SE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="icon">
          <Link href="/employee/messages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <div className="flex items-center gap-3 flex-1">
          <Avatar className="h-12 w-12">
            <AvatarImage src={patient.avatar} />
            <AvatarFallback>{patient.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{patient.name}</h1>
              {patient.isPremium && <Badge>Premium</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{patient.email}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/employee/patients/${patient.id}`}>
              Se profil
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => {
            const isEmployee = msg.sender === 'employee';
            const showDate = index === 0 ||
              new Date(messages[index - 1].timestamp).toDateString() !== new Date(msg.timestamp).toDateString();

            return (
              <div key={msg.id}>
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {new Date(msg.timestamp).toLocaleDateString('sv-SE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                <div className={`flex gap-3 ${isEmployee ? 'justify-end' : 'justify-start'}`}>
                  {!isEmployee && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback>{patient.name[0]}</AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`flex flex-col ${isEmployee ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isEmployee
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-2">
                      {formatMessageTime(msg.timestamp)}
                    </span>
                  </div>

                  {isEmployee && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>

        {/* Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSend} className="flex gap-3">
            <Button type="button" variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>

            <Textarea
              placeholder="Skriv ett meddelande..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              className="min-h-[44px] max-h-[120px] resize-none"
              rows={1}
            />

            <Button type="submit" disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Tryck Enter för att skicka, Shift+Enter för ny rad
          </p>
        </div>
      </Card>
    </div>
  );
}
