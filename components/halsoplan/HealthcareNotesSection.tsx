'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download } from 'lucide-react';
import { HealthcareNote } from '@/lib/mock-data/healthcare-notes';

interface HealthcareNotesSectionProps {
  notes: HealthcareNote[];
}

export function HealthcareNotesSection({ notes }: HealthcareNotesSectionProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recommendation':
        return 'bg-secondary/10 text-muted-foreground';
      case 'observation':
        return 'bg-secondary/10 text-muted-foreground';
      default:
        return 'bg-secondary/10 text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'recommendation':
        return 'REKOMMENDATION';
      case 'observation':
        return 'OBSERVATION';
      default:
        return 'NOTAT';
    }
  };

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <Card key={note.id} className="card-premium p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-sm text-gray-900">{note.author}</p>
              <p className="text-xs text-gray-600">{note.role}</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className={`text-xs ${getTypeColor(note.type)}`}>
                {getTypeLabel(note.type)}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(note.date).toLocaleDateString('sv-SE', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Attachments */}
          {note.attachments && note.attachments.length > 0 && (
            <div className="mb-3 space-y-2">
              {note.attachments.map((attachment) => (
                <button
                  key={attachment.id}
                  className="w-full group relative overflow-hidden rounded-lg border border-border/50 hover:border-foreground/30 transition-all"
                  onClick={() => {
                    // TODO: Implement file download
                    alert(`Öppnar ${attachment.fileName}`);
                  }}
                >
                  {/* Landscape Image */}
                  <div className="relative w-full h-32 overflow-hidden">
                    <img
                      src={attachment.thumbnailUrl}
                      alt={attachment.fileName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* File info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-medium text-white">{attachment.fileName}</p>
                          <p className="text-[10px] text-white/80">{attachment.fileSize}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Download className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <p className="text-sm leading-relaxed text-gray-900">{note.content}</p>
        </Card>
      ))}
    </div>
  );
}
