'use client';

import { use } from 'react';
import { mockContentLibrary } from '@/lib/mock-data/content-library';
import { mockPatients } from '@/lib/mock-data/patients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Edit, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const content = mockContentLibrary.find(c => c.id === id);

  if (!content) {
    notFound();
  }

  const assignedPatients = mockPatients.filter(p =>
    content.assignedTo.includes(p.id)
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/employee/content">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{content.title}</h1>
        </div>
        <Button asChild>
          <Link href={`/employee/content/${content.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Redigera
          </Link>
        </Button>
      </div>

      {/* Article Preview */}
      <Card>
        <div className="aspect-video relative bg-muted overflow-hidden">
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant={content.publishStatus === 'published' ? 'default' : 'outline'}>
              {content.publishStatus === 'published' ? 'Publicerad' : 'Utkast'}
            </Badge>
            <Badge variant="outline">{content.category}</Badge>
          </div>
          <CardTitle className="text-2xl">{content.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {content.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Skapad av</span>
              </div>
              <p className="font-medium">{content.createdByName}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Senast uppdaterad</span>
              </div>
              <p className="font-medium">
                {new Date(content.updatedAt).toLocaleDateString('sv-SE')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Patients */}
      <Card>
        <CardHeader>
          <CardTitle>Tilldelad till ({assignedPatients.length} patienter)</CardTitle>
        </CardHeader>
        <CardContent>
          {assignedPatients.length > 0 ? (
            <div className="space-y-2">
              {assignedPatients.map((patient) => (
                <Link
                  key={patient.id}
                  href={`/employee/patients/${patient.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar>
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback>{patient.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{patient.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{patient.email}</p>
                  </div>
                  {patient.isPremium && (
                    <Badge variant="default">Premium</Badge>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Denna artikel är inte tilldelad till några patienter än
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
