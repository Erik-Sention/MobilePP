import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChatConversation } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';

interface ChatListItemProps {
  conversation: ChatConversation;
}

export function ChatListItem({ conversation }: ChatListItemProps) {
  const timeAgo = formatDistanceToNow(conversation.lastMessageTime, {
    addSuffix: false,
    locale: sv,
  });

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
          <AvatarFallback>{conversation.participantName[0]}</AvatarFallback>
        </Avatar>
        {conversation.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="font-semibold truncate">{conversation.participantName}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {timeAgo}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {conversation.lastMessage}
        </p>
      </div>

      {conversation.unreadCount > 0 && (
        <Badge className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center p-0">
          {conversation.unreadCount}
        </Badge>
      )}
    </div>
  );
}
