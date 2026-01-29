'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon, Check } from 'lucide-react';

// Bilder från projektet
const availableImages = [
  '/examplepics/erre_A_calm_minimalistic_photograph_of_a_quiet_everyday_momen_dd0f80a5-8e6d-455e-81d4-34e54bea8d04_3.png',
  '/examplepics/erre_A_calm_serene_photograph_of_a_peaceful_wellness_moment__2b3b0f89-8d56-486e-8f46-e7166ae20737_0.png',
  '/examplepics/erre_A_high-quality_photograph_of_a_friendly_approachable_do_e2c1f8e9-b3f5-431b-99d1-e43f08ec4d05_0.png',
  '/placeholder.svg',
];

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImagePicker({ value, onChange }: ImagePickerProps) {
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  const handleSelectImage = (url: string) => {
    onChange(url);
    setOpen(false);
  };

  const handleCustomUrl = () => {
    if (customUrl) {
      onChange(customUrl);
      setCustomUrl('');
      setOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Bild</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Bild-URL eller välj från biblioteket"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline">
              <ImageIcon className="h-4 w-4 mr-2" />
              Välj bild
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Välj bild från biblioteket</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Bildgalleri */}
              <div>
                <h3 className="text-sm font-medium mb-3">Tillgängliga bilder</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {availableImages.map((url) => (
                    <button
                      key={url}
                      type="button"
                      onClick={() => handleSelectImage(url)}
                      className={`relative aspect-video rounded-lg border-2 overflow-hidden transition-all ${
                        value === url
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      {value === url && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Anpassad URL */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Eller ange en anpassad URL</h3>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                  />
                  <Button type="button" onClick={handleCustomUrl}>
                    Använd
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Förhandsgranskning */}
      {value && (
        <div className="mt-2">
          <div className="relative aspect-video w-full max-w-sm rounded-lg border overflow-hidden bg-muted">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
