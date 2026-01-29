'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

interface ChatInputProps {
  conversationId: string;
}

export function ChatInput({ conversationId }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Send message logic
      console.log('Sending message:', message, 'to', conversationId);
      setMessage('');
    }
  };

  return (
    <div className="border-t bg-white p-4 pb-safe">
      <div className="flex items-center gap-2 max-w-mobile mx-auto">
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Paperclip className="h-5 w-5" />
        </button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Skriv ett meddelande..."
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="bg-primary hover:bg-primary/90 rounded-full"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
