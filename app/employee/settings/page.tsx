'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Inställningar</h1>
        <p className="text-muted-foreground">
          Hantera ditt konto och preferenser
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profilinformation</CardTitle>
          <CardDescription>Din personliga information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Namn</Label>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <Input id="name" defaultValue={user?.name} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-post</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" defaultValue={user?.email} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Roll</Label>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="capitalize">
                {user?.employeeType === 'doctor' ? 'Läkare' :
                 user?.employeeType === 'nurse' ? 'Sjuksköterska' :
                 'Admin'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Behörigheter</CardTitle>
          <CardDescription>Dina åtkomsträttigheter i systemet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm">Visa patienter</span>
            <Badge variant="default">Aktiverad</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm">Hantera innehåll</span>
            <Badge variant="default">Aktiverad</Badge>
          </div>
          {user?.employeeType === 'doctor' && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Uppdatera hälsoplaner</span>
              <Badge variant="default">Aktiverad</Badge>
            </div>
          )}
          {user?.employeeType === 'admin' && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Ta bort innehåll</span>
              <Badge variant="default">Aktiverad</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            SENTION MPH Prototype v1.0
          </p>
          <Button variant="outline">
            Kontakta Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
