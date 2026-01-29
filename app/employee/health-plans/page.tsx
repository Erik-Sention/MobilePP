'use client';

import { mockHealthcareNotes } from '@/lib/mock-data/healthcare-notes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, FileText } from 'lucide-react';
import Link from 'next/link';

export default function HealthPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hälsoplaner</h1>
          <p className="text-muted-foreground">
            Hantera och skapa hälsoplaner och anteckningar
          </p>
        </div>
        <Button asChild>
          <Link href="/employee/health-plans/new">
            <Plus className="h-4 w-4 mr-2" />
            Skapa anteckning
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {mockHealthcareNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{note.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{note.author}</CardTitle>
                    <p className="text-sm text-muted-foreground">{note.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(note.date).toLocaleDateString('sv-SE', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <Badge>
                  {note.type === 'note' ? 'Anteckning' :
                   note.type === 'recommendation' ? 'Rekommendation' : 
                   'Observation'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm whitespace-pre-wrap">{note.content}</p>
              
              {note.attachments && note.attachments.length > 0 && (
                <div className="pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Bilagor:</p>
                  <div className="space-y-2">
                    {note.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                      >
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{attachment.fileName}</p>
                          <p className="text-xs text-muted-foreground">{attachment.fileSize}</p>
                        </div>
                        <Button variant="ghost" size="sm">Öppna</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
