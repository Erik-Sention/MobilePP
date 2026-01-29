'use client';

import { useState, use } from 'react';
import { getPatientById } from '@/lib/mock-data/patients';
import { getContentForPatient, mockContentLibrary } from '@/lib/mock-data/content-library';
import { mockEmployeeAppointments } from '@/lib/mock-data/appointments';
import { getNotesForPatient } from '@/lib/mock-data/healthcare-notes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { FileUpload } from '@/components/ui/file-upload';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeft,
  Mail,
  Plus,
  FileText,
  Activity,
  Heart,
  Droplet,
  Weight,
  Calendar,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Upload,
  Paperclip,
  Phone,
  MapPin,
  Briefcase,
  AlertCircle,
  Shield,
  User,
  Clock,
  Video,
  Check,
  Target,
  Trash2,
  Eye,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock health data
const mockHealthData = {
  bloodPressure: [
    { date: '2026-01-29', systolic: 120, diastolic: 80, time: '08:00' },
    { date: '2026-01-28', systolic: 118, diastolic: 78, time: '08:15' },
    { date: '2026-01-27', systolic: 122, diastolic: 82, time: '07:45' },
  ],
  bloodGlucose: [
    { date: '2026-01-29', value: 5.2, time: '08:30', note: 'Fasta' },
    { date: '2026-01-28', value: 5.4, time: '08:20', note: 'Fasta' },
    { date: '2026-01-27', value: 5.1, time: '08:10', note: 'Fasta' },
  ],
  weight: [
    { date: '2026-01-29', value: 75.2 },
    { date: '2026-01-22', value: 75.8 },
    { date: '2026-01-15', value: 76.1 },
  ],
};

type TabType = 'overview' | 'health-data' | 'articles' | 'health-plans' | 'calendar' | 'goals';

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const patient = getPatientById(id);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [healthPlanContent, setHealthPlanContent] = useState('');
  const [healthPlanType, setHealthPlanType] = useState<'note' | 'recommendation' | 'observation'>('note');
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [publishToPatient, setPublishToPatient] = useState(true);

  // Health data form states
  const [showBPDialog, setShowBPDialog] = useState(false);
  const [bpData, setBpData] = useState({ systolic: '', diastolic: '', date: '', time: '' });
  const [showGlucoseDialog, setShowGlucoseDialog] = useState(false);
  const [glucoseData, setGlucoseData] = useState({ value: '', date: '', time: '', note: '' });
  const [showWeightDialog, setShowWeightDialog] = useState(false);
  const [weightData, setWeightData] = useState({ value: '', date: '' });

  // File upload states
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [excelFiles, setExcelFiles] = useState<File[]>([]);
  const [healthPlanAttachments, setHealthPlanAttachments] = useState<File[]>([]);

  // Health plan note dialog
  const [showNewNoteDialog, setShowNewNoteDialog] = useState(false);

  // Goal management states
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    type: 'daily' as 'daily' | 'weekly',
    targetValue: '',
    unit: '',
  });

  if (!patient) {
    notFound();
  }

  const assignedContent = getContentForPatient(patient.id);
  const availableContent = mockContentLibrary.filter(c => !patient.assignedArticleIds.includes(c.id));

  // Get patient's appointments
  const patientAppointments = mockEmployeeAppointments.filter(apt => apt.patientId === patient.id);

  const handleSaveHealthPlan = () => {
    const attachmentText = healthPlanAttachments.length > 0
      ? ` med ${healthPlanAttachments.length} bilaga(or)`
      : '';
    const publishText = publishToPatient ? ' (Publicerad till patient)' : ' (Endast intern)';
    alert(`Hälsoplan sparad för ${patient.name}${attachmentText}${publishText}!`);
    setHealthPlanContent('');
    setHealthPlanAttachments([]);
    setPublishToPatient(true);
  };

  const handleExcelUpload = (files: File[]) => {
    setExcelFiles(files);
    if (files.length > 0) {
      alert(`Excel-fil "${files[0].name}" uppladdad! Blodpanel kommer att importeras.`);
      setShowExcelUpload(false);
    }
  };

  const handleAssignArticles = () => {
    alert(`${selectedArticles.length} artiklar tilldelade!`);
    setSelectedArticles([]);
  };

  const handleAddBP = () => {
    alert(`Blodtryck ${bpData.systolic}/${bpData.diastolic} tillagt!`);
    setShowBPDialog(false);
    setBpData({ systolic: '', diastolic: '', date: '', time: '' });
  };

  const handleAddGlucose = () => {
    alert(`Blodsockervärde ${glucoseData.value} mmol/L tillagt!`);
    setShowGlucoseDialog(false);
    setGlucoseData({ value: '', date: '', time: '', note: '' });
  };

  const handleAddWeight = () => {
    alert(`Vikt ${weightData.value} kg tillagd!`);
    setShowWeightDialog(false);
    setWeightData({ value: '', date: '' });
  };

  const handleCreateGoal = () => {
    alert(`Hälsomål "${newGoal.title}" skapat för ${patient.name}!`);
    setShowNewGoalDialog(false);
    setNewGoal({
      title: '',
      description: '',
      type: 'daily',
      targetValue: '',
      unit: '',
    });
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Översikt', icon: Activity },
    { id: 'health-data' as TabType, label: 'Hälsodata', icon: Heart },
    { id: 'articles' as TabType, label: 'Artiklar', icon: FileText },
    { id: 'health-plans' as TabType, label: 'Hälsoplaner', icon: FileText },
    { id: 'goals' as TabType, label: 'Hälsomål & Rutiner', icon: Target },
    { id: 'calendar' as TabType, label: 'Kalender', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/employee/patients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{patient.name}</h1>
        </div>
        <Button asChild variant="outline">
          <Link href={`/employee/messages/${patient.id}`}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Skicka meddelande
          </Link>
        </Button>
      </div>

      {/* Patient Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={patient.avatar} />
              <AvatarFallback className="text-2xl">{patient.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{patient.name}</CardTitle>
                {patient.isPremium && <Badge>Premium</Badge>}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {patient.email}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <Button
            onClick={() => setShowNewNoteDialog(true)}
            size="sm"
            className="mb-[-2px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Skapa anteckning
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Personuppgifter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personuppgifter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Förnamn</p>
                    <p className="font-medium">{patient.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Efternamn</p>
                    <p className="font-medium">{patient.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Personnummer</p>
                    <p className="font-medium font-mono">{patient.personnummer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kön</p>
                    <p className="font-medium capitalize">{patient.gender}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Telefon
                    </p>
                    <p className="font-medium">{patient.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      E-post
                    </p>
                    <p className="font-medium">{patient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Adress
                    </p>
                    <p className="font-medium">{patient.address.street}</p>
                    <p className="font-medium">{patient.address.postalCode} {patient.address.city}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Arbetsuppgifter */}
          {patient.employer && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Arbetsuppgifter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Arbetsgivare</p>
                      <p className="font-medium">{patient.employer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avdelning</p>
                      <p className="font-medium">{patient.department || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Befattning</p>
                      <p className="font-medium">{patient.jobTitle || '-'}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Närmaste chef</p>
                      <p className="font-medium">{patient.manager || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Arbetstelefon</p>
                      <p className="font-medium">{patient.workPhone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Arbets e-post</p>
                      <p className="font-medium">{patient.workEmail || '-'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Nödkontakt & Medicinsk info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nödkontakt */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Nödkontakt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Namn</p>
                  <p className="font-medium">{patient.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-medium">{patient.emergencyContact.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Relation</p>
                  <p className="font-medium">{patient.emergencyContact.relation}</p>
                </div>
              </CardContent>
            </Card>

            {/* Medicinsk & Försäkring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Medicinsk information & Försäkring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Blodgrupp</p>
                  <p className="font-medium">{patient.bloodType || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Allergier</p>
                  <p className="font-medium">
                    {patient.allergies && patient.allergies.length > 0
                      ? patient.allergies.join(', ')
                      : 'Inga kända allergier'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Försäkringsbolag</p>
                  <p className="font-medium">{patient.insuranceProvider || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Försäkringsnummer</p>
                  <p className="font-medium font-mono">{patient.insuranceNumber || '-'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'health-data' && (
        <div className="space-y-6">
          {/* Excel Upload for Blood Panel */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Importera blodpanel</CardTitle>
                  <CardDescription>
                    Ladda upp en Excel-fil med blodprov (HB, LDL, HDL, HbA1c, etc.)
                  </CardDescription>
                </div>
                <Dialog open={showExcelUpload} onOpenChange={setShowExcelUpload}>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Ladda upp Excel
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Ladda upp blodpanel (Excel)</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Ladda upp en Excel-fil (.xlsx, .xls eller .csv) med patientens blodprovresultat.
                        Filen kan innehålla värden som HB, LDL, HDL, HbA1c, glukos, etc.
                      </p>
                      <FileUpload
                        accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
                        multiple={false}
                        maxSize={5}
                        onFilesSelected={handleExcelUpload}
                        value={excelFiles}
                      />
                      {excelFiles.length > 0 && (
                        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                          <p className="text-sm text-green-800">
                            ✓ Fil uppladdad! Blodpanelen kommer att parsas och sparas automatiskt.
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
          </Card>

          {/* Blood Pressure */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Blodtryck</CardTitle>
                  <CardDescription>Registrera och följ blodtrycksmätningar</CardDescription>
                </div>
                <Dialog open={showBPDialog} onOpenChange={setShowBPDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Lägg till
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrera blodtryck</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="systolic">Systoliskt (övre)</Label>
                          <Input
                            id="systolic"
                            type="number"
                            placeholder="120"
                            value={bpData.systolic}
                            onChange={(e) => setBpData({...bpData, systolic: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="diastolic">Diastoliskt (nedre)</Label>
                          <Input
                            id="diastolic"
                            type="number"
                            placeholder="80"
                            value={bpData.diastolic}
                            onChange={(e) => setBpData({...bpData, diastolic: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bp-date">Datum</Label>
                          <Input
                            id="bp-date"
                            type="date"
                            value={bpData.date}
                            onChange={(e) => setBpData({...bpData, date: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bp-time">Tid</Label>
                          <Input
                            id="bp-time"
                            type="time"
                            value={bpData.time}
                            onChange={(e) => setBpData({...bpData, time: e.target.value})}
                          />
                        </div>
                      </div>
                      <Button onClick={handleAddBP} className="w-full">Spara</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHealthData.bloodPressure.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{entry.systolic}/{entry.diastolic} mmHg</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('sv-SE')} {entry.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Normal</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Blood Glucose */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Blodsocker</CardTitle>
                  <CardDescription>Registrera och följ blodsockervärden</CardDescription>
                </div>
                <Dialog open={showGlucoseDialog} onOpenChange={setShowGlucoseDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Lägg till
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrera blodsocker</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="glucose">Värde (mmol/L)</Label>
                        <Input
                          id="glucose"
                          type="number"
                          step="0.1"
                          placeholder="5.2"
                          value={glucoseData.value}
                          onChange={(e) => setGlucoseData({...glucoseData, value: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="glucose-date">Datum</Label>
                          <Input
                            id="glucose-date"
                            type="date"
                            value={glucoseData.date}
                            onChange={(e) => setGlucoseData({...glucoseData, date: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="glucose-time">Tid</Label>
                          <Input
                            id="glucose-time"
                            type="time"
                            value={glucoseData.time}
                            onChange={(e) => setGlucoseData({...glucoseData, time: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="glucose-note">Anteckning</Label>
                        <Input
                          id="glucose-note"
                          placeholder="t.ex. Fasta, Efter måltid"
                          value={glucoseData.note}
                          onChange={(e) => setGlucoseData({...glucoseData, note: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleAddGlucose} className="w-full">Spara</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHealthData.bloodGlucose.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Droplet className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{entry.value} mmol/L</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('sv-SE')} {entry.time} · {entry.note}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Normal</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weight */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vikt</CardTitle>
                  <CardDescription>Registrera och följ viktutveckling</CardDescription>
                </div>
                <Dialog open={showWeightDialog} onOpenChange={setShowWeightDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Lägg till
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrera vikt</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Vikt (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          placeholder="75.0"
                          value={weightData.value}
                          onChange={(e) => setWeightData({...weightData, value: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight-date">Datum</Label>
                        <Input
                          id="weight-date"
                          type="date"
                          value={weightData.date}
                          onChange={(e) => setWeightData({...weightData, date: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleAddWeight} className="w-full">Spara</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHealthData.weight.map((entry, index) => {
                  const prevEntry = mockHealthData.weight[index + 1];
                  const diff = prevEntry ? (entry.value - prevEntry.value).toFixed(1) : null;
                  const trend = diff && parseFloat(diff) < 0 ? 'down' : 'up';

                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Weight className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{entry.value} kg</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString('sv-SE')}
                          </p>
                        </div>
                      </div>
                      {diff && (
                        <div className={`flex items-center gap-1 text-sm ${
                          trend === 'down' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {trend === 'down' ? (
                            <TrendingDown className="h-4 w-4" />
                          ) : (
                            <TrendingUp className="h-4 w-4" />
                          )}
                          {Math.abs(parseFloat(diff))} kg
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'articles' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Tilldelade Artiklar ({assignedContent.length})</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Tilldela artikel
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Tilldela artiklar till {patient.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {availableContent.map((content) => (
                      <div key={content.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted">
                        <Checkbox
                          id={content.id}
                          checked={selectedArticles.includes(content.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedArticles([...selectedArticles, content.id]);
                            } else {
                              setSelectedArticles(selectedArticles.filter(id => id !== content.id));
                            }
                          }}
                        />
                        <label htmlFor={content.id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{content.title}</div>
                          <div className="text-sm text-muted-foreground">{content.description}</div>
                        </label>
                      </div>
                    ))}
                    {availableContent.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Alla artiklar är redan tilldelade
                      </p>
                    )}
                  </div>
                  <Button onClick={handleAssignArticles} disabled={selectedArticles.length === 0}>
                    Tilldela {selectedArticles.length > 0 && `(${selectedArticles.length})`}
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {assignedContent.length > 0 ? (
              <div className="space-y-2">
                {assignedContent.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{content.title}</p>
                        <p className="text-sm text-muted-foreground">{content.category}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{content.publishStatus}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Inga artiklar tilldelade än
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'health-plans' && (
        <div className="space-y-6">
          {/* Existing Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Tidigare Anteckningar</CardTitle>
              <CardDescription>
                Alla hälsoplananteckningar för {patient.firstName} - både publicerade och interna
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const patientNotes = getNotesForPatient(patient.id);

                if (patientNotes.length === 0) {
                  return (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p className="text-lg font-medium mb-2">Inga anteckningar</p>
                      <p className="text-sm">
                        Det finns inga hälsoplananteckningar för {patient.firstName} ännu.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-3">
                    {patientNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={note.isPublished ? "default" : "secondary"}>
                              {note.isPublished ? (
                                <>
                                  <Eye className="h-3 w-3 mr-1" />
                                  Publicerad
                                </>
                              ) : (
                                <>
                                  <Lock className="h-3 w-3 mr-1" />
                                  Intern
                                </>
                              )}
                            </Badge>
                            <Badge variant="outline">
                              {note.type === 'note' && 'Anteckning'}
                              {note.type === 'recommendation' && 'Rekommendation'}
                              {note.type === 'observation' && 'Observation'}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(note.date).toLocaleDateString('sv-SE', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        <p className="text-sm mb-3">{note.content}</p>

                        {note.attachments && note.attachments.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Paperclip className="h-4 w-4" />
                            <span>{note.attachments.length} bilaga(or)</span>
                          </div>
                        )}

                        <div className="mt-3 pt-3 border-t flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{note.author}</span>
                          <span className="text-xs">• {note.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </CardContent>
          </Card>

        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Patientens Kalender
              </CardTitle>
              <CardDescription>
                Översikt över bokade besök och möten med {patient.firstName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {patientAppointments.length > 0 ? (
                <div className="space-y-3">
                  {patientAppointments
                    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
                    .map((appointment) => {
                      const appointmentDate = new Date(appointment.date);
                      const isUpcoming = appointment.status === 'upcoming';
                      const isPast = appointment.status === 'completed';

                      return (
                        <div
                          key={appointment.id}
                          className={`p-4 rounded-lg border transition-colors ${
                            isUpcoming
                              ? 'bg-primary/5 border-primary/20'
                              : isPast
                              ? 'bg-muted/50 border-border opacity-60'
                              : 'border-border'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="text-center min-w-[60px]">
                                  <div className="text-2xl font-bold">
                                    {appointmentDate.getDate()}
                                  </div>
                                  <div className="text-xs text-muted-foreground uppercase">
                                    {appointmentDate.toLocaleDateString('sv-SE', { month: 'short' })}
                                  </div>
                                </div>
                                <div className="w-px h-12 bg-border" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-semibold">{appointment.time}</span>
                                    <span className="text-sm text-muted-foreground">
                                      ({appointment.duration} min)
                                    </span>
                                  </div>
                                  {appointment.notes && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {appointment.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge variant={appointment.type === 'video' ? 'default' : 'secondary'}>
                                {appointment.type === 'video' ? (
                                  <>
                                    <Video className="h-3 w-3 mr-1" />
                                    Video
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="h-3 w-3 mr-1" />
                                    Fysiskt
                                  </>
                                )}
                              </Badge>
                              {isPast && (
                                <Badge variant="outline" className="gap-1">
                                  <Check className="h-3 w-3" />
                                  Genomförd
                                </Badge>
                              )}
                              {isUpcoming && (
                                <Badge variant="outline">Kommande</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium mb-2">Inga bokningar</p>
                  <p className="text-sm">
                    Det finns inga bokade besök för {patient.firstName} ännu.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button asChild>
              <Link href="/employee/kalender">
                <Plus className="h-4 w-4 mr-2" />
                Boka nytt besök
              </Link>
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-6">
          {/* Header with Add Button */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Hälsomål & Rutiner
                  </CardTitle>
                  <CardDescription>
                    Hantera {patient.firstName}s dagliga och veckovisa hälsomål
                  </CardDescription>
                </div>
                <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Lägg till mål
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Skapa nytt hälsomål</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Titel *</Label>
                        <Input
                          value={newGoal.title}
                          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                          placeholder="t.ex. 30 minuters promenad"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Beskrivning</Label>
                        <Textarea
                          value={newGoal.description}
                          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                          placeholder="Beskrivning av målet och varför det är viktigt"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Frekvens *</Label>
                        <Select
                          value={newGoal.type}
                          onValueChange={(value: 'daily' | 'weekly') => setNewGoal({ ...newGoal, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Dagligen</SelectItem>
                            <SelectItem value="weekly">Varje vecka</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Målvärde</Label>
                          <Input
                            value={newGoal.targetValue}
                            onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
                            placeholder="t.ex. 3"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Enhet</Label>
                          <Input
                            value={newGoal.unit}
                            onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                            placeholder="t.ex. gånger, liter, timmar"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleCreateGoal}
                        disabled={!newGoal.title || !newGoal.type}
                        className="w-full"
                      >
                        Skapa mål
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
          </Card>

          {/* All Health Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Patientens Hälsomål</CardTitle>
              <CardDescription>Alla aktiva hälsomål och rutiner</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Example goals */}
                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">30 minuters promenad</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Lågintensiv aktivitet för hjärthälsa
                      </p>
                      <Badge className="mt-2" variant="secondary">Aktiv</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">Ta dina vitaminer</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        D-vitamin och Omega-3
                      </p>
                      <Badge className="mt-2" variant="secondary">Aktiv</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">Meditationsövning</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mindfulness för stresshantering
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">Aktiv</Badge>
                        <span className="text-sm text-muted-foreground">Mål: 30 min</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">Drick 2L Vatten</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Vätskebalans är viktig
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">Aktiv</Badge>
                        <span className="text-sm text-muted-foreground">Mål: 2 liter</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">Träna 3 gånger</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Kombinera styrka och kondition
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">Aktiv</Badge>
                        <span className="text-sm text-muted-foreground">Mål: 3 pass</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">Sov 7+ timmar varje natt</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        God sömn är grunden för hälsa
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">Aktiv</Badge>
                        <span className="text-sm text-muted-foreground">Mål: 7 nätter</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tips:</strong> Skapa realistiska och uppnåeliga mål för patienten. Målen visas automatiskt i patientens app som "Hälsomål" på startsidan.
            </p>
          </div>
        </div>
      )}

      {/* New Note Dialog */}
      <Dialog open={showNewNoteDialog} onOpenChange={setShowNewNoteDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Skapa Ny Hälsoplananteckning</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Typ</Label>
              <Select value={healthPlanType} onValueChange={(value: any) => setHealthPlanType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="note">Anteckning</SelectItem>
                  <SelectItem value="recommendation">Rekommendation</SelectItem>
                  <SelectItem value="observation">Observation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Innehåll</Label>
              <Textarea
                placeholder="Skriv din hälsoplan här..."
                value={healthPlanContent}
                onChange={(e) => setHealthPlanContent(e.target.value)}
                rows={8}
              />
            </div>

            <div className="space-y-2">
              <Label>Bilagor</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Bifoga filer som PDF, bilder eller andra dokument (max 10MB per fil)
              </p>
              <FileUpload
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,image/*,application/pdf"
                multiple={true}
                maxSize={10}
                onFilesSelected={setHealthPlanAttachments}
                value={healthPlanAttachments}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
              <div className="space-y-0.5">
                <Label htmlFor="publish-to-patient-dialog" className="text-base">
                  Publicera till patient
                </Label>
                <p className="text-sm text-muted-foreground">
                  Välj om patienten ska kunna se denna anteckning
                </p>
              </div>
              <Switch
                id="publish-to-patient-dialog"
                checked={publishToPatient}
                onCheckedChange={setPublishToPatient}
              />
            </div>

            <Button
              onClick={() => {
                handleSaveHealthPlan();
                setShowNewNoteDialog(false);
              }}
              disabled={!healthPlanContent}
              className="w-full"
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Spara anteckning{healthPlanAttachments.length > 0 && ` med ${healthPlanAttachments.length} bilaga(or)`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
