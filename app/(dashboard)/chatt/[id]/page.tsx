import { ChatBubble } from '@/components/chatt/ChatBubble';
import { ChatInput } from '@/components/chatt/ChatInput';
import { mockConversations, mockMessages } from '@/lib/mock-data/chats';
import { ChevronLeft, Video, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { notFound } from 'next/navigation';

export default function ChatDetailPage({ params }: { params: { id: string } }) {
  const conversation = mockConversations.find(c => c.id === params.id);
  const messages = mockMessages[params.id] || [];

  if (!conversation) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-white p-4 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Link href="/chatt" className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.participantAvatar} />
            <AvatarFallback>{conversation.participantName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold truncate">{conversation.participantName}</h1>
            <p className="text-xs text-success">Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2">
            <Video className="h-5 w-5" />
          </button>
          <button className="p-2">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-mobile mx-auto w-full">
        <div className="flex justify-center">
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
            IDAG
          </span>
        </div>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>

      <ChatInput conversationId={params.id} />
    </div>
  );
}
