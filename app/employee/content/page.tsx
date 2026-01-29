'use client';

import { useState } from 'react';
import { mockContentLibrary } from '@/lib/mock-data/content-library';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = mockContentLibrary.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Innehåll</h1>
          <p className="text-muted-foreground">
            Hantera artiklar och innehåll
          </p>
        </div>
        <Button asChild>
          <Link href="/employee/content/new">
            <Plus className="h-4 w-4 mr-2" />
            Skapa artikel
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Sök artiklar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContent.map((content) => (
          <Card key={content.id} className="overflow-hidden group cursor-pointer">
            <Link href={`/employee/content/${content.id}`}>
              <div className="aspect-video relative bg-muted overflow-hidden">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <Link href={`/employee/content/${content.id}`} className="flex-1">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {content.title}
                  </CardTitle>
                </Link>
                <Badge variant={content.publishStatus === 'published' ? 'default' : 'outline'}>
                  {content.publishStatus}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {content.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Kategori:</span>
                <span className="font-medium">{content.category}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tilldelad till:</span>
                <span className="font-medium">{content.assignedTo.length} patienter</span>
              </div>

              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/employee/content/${content.id}/edit`}>
                  <Edit className="h-3 w-3 mr-2" />
                  Redigera
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
