'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ImagePicker } from '@/components/ui/image-picker';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewContentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Nutrition',
    thumbnail: '',
    tags: '',
    publishStatus: 'draft' as 'draft' | 'published'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // I ett riktigt system skulle vi spara detta till backend
    alert(`Artikel "${formData.title}" skapad som ${formData.publishStatus === 'published' ? 'publicerad' : 'utkast'}!`);
    router.push('/employee/content');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/employee/content">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Skapa ny artikel</h1>
          <p className="text-muted-foreground">Lägg till nytt innehåll till biblioteket</p>
        </div>
      </div>

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
                <Label htmlFor="publish">Publicera direkt</Label>
                <p className="text-sm text-muted-foreground">
                  Gör artikeln synlig för patienter direkt
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
                {formData.publishStatus === 'published' ? 'Skapa och publicera' : 'Skapa utkast'}
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
