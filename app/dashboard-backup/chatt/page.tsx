import { ChatListItem } from '@/components/chatt/ChatListItem';
import { mockConversations } from '@/lib/mock-data/chats';
import { Search, Pencil } from 'lucide-react';
import Link from 'next/link';

export default function ChattPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-card-strong sticky top-0 z-10 border-b border-border/50 pt-6 pb-4 px-4 flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-foreground">Dina Konversationer</h1>
        <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
          <Search className="h-5 w-5 text-foreground" />
        </button>
      </header>

      <div className="p-2 min-h-[calc(100vh-73px)]">
        <div className="space-y-1">
          {mockConversations.map((conversation) => (
            <Link key={conversation.id} href={`/chatt/${conversation.id}`}>
              <ChatListItem conversation={conversation} />
            </Link>
          ))}
        </div>
      </div>

      <button className="fixed bottom-24 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors">
        <Pencil className="h-6 w-6" />
      </button>
    </div>
  );
}
