'use client';

import { useState } from 'react';
import { mockPatients } from '@/lib/mock-data/patients';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPatient, setShowNewPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    personnummer: '',
    dateOfBirth: '',
    gender: 'man' as 'man' | 'kvinna' | 'annat',
    phoneNumber: '',
    email: '',
    street: '',
    postalCode: '',
    city: '',
    employer: '',
    department: '',
    jobTitle: '',
    manager: '',
    workPhone: '',
    workEmail: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    insuranceProvider: '',
    insuranceNumber: '',
    bloodType: '',
    allergies: '',
  });

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePatient = () => {
    alert(`Ny patient ${newPatient.firstName} ${newPatient.lastName} skapad!`);
    setShowNewPatient(false);
    // Reset form
    setNewPatient({
      firstName: '',
      lastName: '',
      personnummer: '',
      dateOfBirth: '',
      gender: 'man',
      phoneNumber: '',
      email: '',
      street: '',
      postalCode: '',
      city: '',
      employer: '',
      department: '',
      jobTitle: '',
      manager: '',
      workPhone: '',
      workEmail: '',
      emergencyName: '',
      emergencyPhone: '',
      emergencyRelation: '',
      insuranceProvider: '',
      insuranceNumber: '',
      bloodType: '',
      allergies: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patienter</h1>
          <p className="text-muted-foreground">
            {mockPatients.length} patienter totalt
          </p>
        </div>
        <Dialog open={showNewPatient} onOpenChange={setShowNewPatient}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Lägg till patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Lägg till ny patient</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Personuppgifter */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personuppgifter</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Förnamn *</Label>
                    <Input
                      value={newPatient.firstName}
                      onChange={(e) => setNewPatient({...newPatient, firstName: e.target.value})}
                      placeholder="Erik"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Efternamn *</Label>
                    <Input
                      value={newPatient.lastName}
                      onChange={(e) => setNewPatient({...newPatient, lastName: e.target.value})}
                      placeholder="Svensson"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Personnummer *</Label>
                    <Input
                      value={newPatient.personnummer}
                      onChange={(e) => setNewPatient({...newPatient, personnummer: e.target.value})}
                      placeholder="YYYYMMDD-XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Födelsedatum *</Label>
                    <Input
                      type="date"
                      value={newPatient.dateOfBirth}
                      onChange={(e) => setNewPatient({...newPatient, dateOfBirth: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Kön *</Label>
                    <Select
                      value={newPatient.gender}
                      onValueChange={(value: any) => setNewPatient({...newPatient, gender: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="man">Man</SelectItem>
                        <SelectItem value="kvinna">Kvinna</SelectItem>
                        <SelectItem value="annat">Annat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Telefon *</Label>
                    <Input
                      value={newPatient.phoneNumber}
                      onChange={(e) => setNewPatient({...newPatient, phoneNumber: e.target.value})}
                      placeholder="070-123 45 67"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>E-post *</Label>
                    <Input
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                      placeholder="erik@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Adress */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Adress</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Gatuadress *</Label>
                    <Input
                      value={newPatient.street}
                      onChange={(e) => setNewPatient({...newPatient, street: e.target.value})}
                      placeholder="Storgatan 12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Postnummer *</Label>
                    <Input
                      value={newPatient.postalCode}
                      onChange={(e) => setNewPatient({...newPatient, postalCode: e.target.value})}
                      placeholder="111 22"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stad *</Label>
                    <Input
                      value={newPatient.city}
                      onChange={(e) => setNewPatient({...newPatient, city: e.target.value})}
                      placeholder="Stockholm"
                    />
                  </div>
                </div>
              </div>

              {/* Arbetsuppgifter */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Arbetsuppgifter (valfritt)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Arbetsgivare</Label>
                    <Input
                      value={newPatient.employer}
                      onChange={(e) => setNewPatient({...newPatient, employer: e.target.value})}
                      placeholder="Tech Solutions AB"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Avdelning</Label>
                    <Input
                      value={newPatient.department}
                      onChange={(e) => setNewPatient({...newPatient, department: e.target.value})}
                      placeholder="IT-avdelningen"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Befattning</Label>
                    <Input
                      value={newPatient.jobTitle}
                      onChange={(e) => setNewPatient({...newPatient, jobTitle: e.target.value})}
                      placeholder="Systemutvecklare"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Närmaste chef</Label>
                    <Input
                      value={newPatient.manager}
                      onChange={(e) => setNewPatient({...newPatient, manager: e.target.value})}
                      placeholder="Anna Lindqvist"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Arbetstelefon</Label>
                    <Input
                      value={newPatient.workPhone}
                      onChange={(e) => setNewPatient({...newPatient, workPhone: e.target.value})}
                      placeholder="08-123 456 78"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Arbets e-post</Label>
                    <Input
                      type="email"
                      value={newPatient.workEmail}
                      onChange={(e) => setNewPatient({...newPatient, workEmail: e.target.value})}
                      placeholder="erik@company.com"
                    />
                  </div>
                </div>
              </div>

              {/* Nödkontakt */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Nödkontakt *</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Namn *</Label>
                    <Input
                      value={newPatient.emergencyName}
                      onChange={(e) => setNewPatient({...newPatient, emergencyName: e.target.value})}
                      placeholder="Maria Svensson"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefon *</Label>
                    <Input
                      value={newPatient.emergencyPhone}
                      onChange={(e) => setNewPatient({...newPatient, emergencyPhone: e.target.value})}
                      placeholder="070-234 56 78"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Relation *</Label>
                    <Input
                      value={newPatient.emergencyRelation}
                      onChange={(e) => setNewPatient({...newPatient, emergencyRelation: e.target.value})}
                      placeholder="Maka"
                    />
                  </div>
                </div>
              </div>

              {/* Medicinsk information & Försäkring */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Medicinsk information & Försäkring (valfritt)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Blodgrupp</Label>
                    <Input
                      value={newPatient.bloodType}
                      onChange={(e) => setNewPatient({...newPatient, bloodType: e.target.value})}
                      placeholder="A+"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Allergier (separera med komma)</Label>
                    <Input
                      value={newPatient.allergies}
                      onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
                      placeholder="Penicillin, Jordnötter"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Försäkringsbolag</Label>
                    <Input
                      value={newPatient.insuranceProvider}
                      onChange={(e) => setNewPatient({...newPatient, insuranceProvider: e.target.value})}
                      placeholder="Folksam"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Försäkringsnummer</Label>
                    <Input
                      value={newPatient.insuranceNumber}
                      onChange={(e) => setNewPatient({...newPatient, insuranceNumber: e.target.value})}
                      placeholder="FS-123456789"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCreatePatient}
                disabled={
                  !newPatient.firstName ||
                  !newPatient.lastName ||
                  !newPatient.personnummer ||
                  !newPatient.dateOfBirth ||
                  !newPatient.phoneNumber ||
                  !newPatient.email ||
                  !newPatient.street ||
                  !newPatient.postalCode ||
                  !newPatient.city ||
                  !newPatient.emergencyName ||
                  !newPatient.emergencyPhone ||
                  !newPatient.emergencyRelation
                }
                className="w-full"
              >
                Skapa patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Sök patient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <div className="divide-y">
          {filteredPatients.map((patient) => (
            <Link
              key={patient.id}
              href={`/employee/patients/${patient.id}`}
              className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={patient.avatar} />
                <AvatarFallback>{patient.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{patient.name}</p>
                <p className="text-sm text-muted-foreground truncate">{patient.email}</p>
              </div>

              <div className="flex items-center gap-3">
                {patient.isPremium && (
                  <Badge variant="default">Premium</Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  {patient.assignedArticleIds.length} artiklar
                </span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {filteredPatients.length === 0 && (
        <Card className="p-12 text-center text-muted-foreground">
          Inga patienter hittades
        </Card>
      )}
    </div>
  );
}
