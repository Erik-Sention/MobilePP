'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Pencil } from 'lucide-react';

export function ProfileHeader() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="text-2xl">{user?.name?.[0] || 'E'}</AvatarFallback>
        </Avatar>
        <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors">
          <Pencil className="h-4 w-4" />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2">{user?.name || 'Erik Svensson'}</h2>

      {user?.isPremium && (
        <Badge className="bg-primary/10 text-primary border-primary/20">
          Premium Medlem
        </Badge>
      )}
    </div>
  );
}
