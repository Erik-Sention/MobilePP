import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TeamMember } from '@/lib/types';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-14 w-14">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          {member.isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-success border-2 border-white rounded-full" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.title}</p>
          <p className="text-xs text-muted-foreground">{member.specialty}</p>
        </div>

        <Link href="/chatt">
          <Button size="icon" className="bg-blue-500 hover:bg-blue-600 rounded-lg">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
