'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { mockContentLibrary } from '@/lib/mock-data/content-library';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ImagePicker } from '@/components/ui/image-picker';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { canDeleteContent } = useAuth();
  const content = mockContentLibrary.find(c => c.id === id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Nutrition',
    thumbnail: '',
    tags: '',
    publishStatus: 'draft' as 'draft' | 'published'
  });

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title,
        description: content.description,
        category: content.category,
        thumbnail: content.thumbnail,
        tags: content.tags.join(', '),
        publishStatus: content.publishStatus
      });
    }
  }, [content]);

  if (!content) {
    notFound();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Artikel "${formData.title}" uppdaterad!`);
    router.push('/employee/content');
  };

  const handleDelete = () => {
    if (confirm('Är du säker på att du vill ta bort denna artikel?')) {
      alert(`Artikel "${content.title}" borttagen!`);
      router.push('/employee/content');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/employee/content">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Redigera artikel</h1>
          <p className="text-muted-foreground">Uppdatera artikelinformation</p>
        </div>
        {canDeleteContent() && (
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Ta bort
          </Button>
        )}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tilldelad till</p>
              <p className="font-medium">{content.assignedTo.length} patienter</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Skapad av</p>
              <p className="font-medium">{content.createdByName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Senast uppdaterad</p>
              <p className="font-medium">{new Date(content.updatedAt).toLocaleDateString('sv-SE')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Artikel Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                placeholder="t.ex. Kostråd för diabetes"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beskrivning *</Label>
              <Textarea
                id="description"
                placeholder="Beskriv artikelns innehåll..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nutrition">Nutrition</SelectItem>
                  <SelectItem value="Exercise">Träning</SelectItem>
                  <SelectItem value="Mental Health">Mental hälsa</SelectItem>
                  <SelectItem value="Sleep">Sömn</SelectItem>
                  <SelectItem value="Medication">Medicinering</SelectItem>
                  <SelectItem value="General Health">Allmän hälsa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ImagePicker
              value={formData.thumbnail}
              onChange={(value) => setFormData({...formData, thumbnail: value})}
            />

            <div className="space-y-2">
              <Label htmlFor="tags">Taggar</Label>
              <Input
                id="tags"
                placeholder="kost, hälsa, diabetes (separera med komma)"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Separera taggar med kommatecken
              </p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="publish">Publicerad</Label>
                <p className="text-sm text-muted-foreground">
                  Gör artikeln synlig för patienter
                </p>
              </div>
              <Switch
                id="publish"
                checked={formData.publishStatus === 'published'}
                onCheckedChange={(checked) =>
                  setFormData({...formData, publishStatus: checked ? 'published' : 'draft'})
                }
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Spara ändringar
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/employee/content">Avbryt</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
