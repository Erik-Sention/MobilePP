import { ChatMessage } from '@/lib/types';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isSent = message.isSent;

  return (
    <div className={cn('flex', isSent ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[80%] space-y-1', isSent ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-2',
            isSent
              ? 'bg-primary text-white rounded-br-sm'
              : 'bg-muted text-foreground rounded-bl-sm'
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className={cn('flex items-center gap-1 px-2', isSent ? 'justify-end' : 'justify-start')}>
          <span className="text-xs text-muted-foreground">
            {format(message.timestamp, 'HH:mm')}
          </span>
          {isSent && (
            <div>
              {message.isRead ? (
                <CheckCheck className="h-3 w-3 text-primary" />
              ) : (
                <Check className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
