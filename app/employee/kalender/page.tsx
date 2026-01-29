'use client';

import { useState } from 'react';
import { mockEmployeeAppointments } from '@/lib/mock-data/appointments';
import { mockPatients } from '@/lib/mock-data/patients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Video,
  MapPin,
  User
} from 'lucide-react';
import Link from 'next/link';

type ViewType = 'month' | 'week' | 'day';

export default function EmployeeCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>('week');
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    date: '',
    time: '',
    type: 'in-person' as 'in-person' | 'video',
    duration: '30',
    notes: ''
  });

  // Navigering
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Hämta veckovisning
  const getWeekDays = () => {
    const days = [];
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay() + 1); // Måndag

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const dayNames = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 08:00 - 19:00

  // Filtrera möten för aktuell vy
  const getAppointmentsForDate = (date: Date) => {
    return mockEmployeeAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  const formatDateHeader = () => {
    if (viewType === 'month') {
      return currentDate.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });
    } else if (viewType === 'week') {
      const start = weekDays[0];
      const end = weekDays[6];
      return `${start.getDate()} ${start.toLocaleDateString('sv-SE', { month: 'short' })} - ${end.getDate()} ${end.toLocaleDateString('sv-SE', { month: 'short', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient?.name || 'Okänd patient';
  };

  const getPatientAvatar = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient?.avatar;
  };

  const handleCreateAppointment = () => {
    alert(`Nytt besök bokat för ${getPatientName(newAppointment.patientId)}!`);
    setShowNewAppointment(false);
    setNewAppointment({
      patientId: '',
      date: '',
      time: '',
      type: 'in-person',
      duration: '30',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kalender</h1>
          <p className="text-muted-foreground">Hantera patientbesök och möten</p>
        </div>
        <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Boka besök
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Boka nytt besök</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Patient *</Label>
                <Select
                  value={newAppointment.patientId}
                  onValueChange={(value) => setNewAppointment({...newAppointment, patientId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Datum *</Label>
                  <Input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tid *</Label>
                  <Input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Typ *</Label>
                  <Select
                    value={newAppointment.type}
                    onValueChange={(value: any) => setNewAppointment({...newAppointment, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">Fysiskt besök</SelectItem>
                      <SelectItem value="video">Videosamtal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Längd (min) *</Label>
                  <Select
                    value={newAppointment.duration}
                    onValueChange={(value) => setNewAppointment({...newAppointment, duration: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Anteckningar</Label>
                <Textarea
                  placeholder="Syfte med besöket..."
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleCreateAppointment}
                disabled={!newAppointment.patientId || !newAppointment.date || !newAppointment.time}
                className="w-full"
              >
                Boka besök
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kontroller */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goToToday}>
                Idag
              </Button>
              <div className="ml-4 font-semibold text-lg">
                {formatDateHeader()}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewType === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('day')}
              >
                Dag
              </Button>
              <Button
                variant={viewType === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('week')}
              >
                Vecka
              </Button>
              <Button
                variant={viewType === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('month')}
              >
                Månad
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Veckovisning */}
      {viewType === 'week' && (
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-8 border-b">
              <div className="p-2 text-xs text-muted-foreground border-r"></div>
              {weekDays.map((day, index) => {
                const isToday = day.toDateString() === new Date().toDateString();
                return (
                  <div
                    key={index}
                    className={`p-2 text-center border-r last:border-r-0 ${
                      isToday ? 'bg-primary/10' : ''
                    }`}
                  >
                    <div className="text-xs text-muted-foreground">
                      {dayNames[index]}
                    </div>
                    <div className={`text-lg font-semibold ${
                      isToday ? 'text-primary' : ''
                    }`}>
                      {day.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-8 border-b min-h-[80px]">
                  <div className="p-2 text-xs text-muted-foreground border-r">
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    const appointments = getAppointmentsForDate(day).filter(apt => {
                      const aptHour = parseInt(apt.time.split(':')[0]);
                      return aptHour === hour;
                    });

                    return (
                      <div key={dayIndex} className="p-1 border-r last:border-r-0 relative">
                        {appointments.map(apt => (
                          <Link
                            key={apt.id}
                            href={`/employee/patients/${apt.patientId}`}
                            className="block mb-1"
                          >
                            <div className={`p-2 rounded text-xs ${
                              apt.type === 'video'
                                ? 'bg-blue-100 border border-blue-300 hover:bg-blue-200 text-blue-900'
                                : 'bg-green-100 border border-green-300 hover:bg-green-200 text-green-900'
                            }`}>
                              <div className="flex items-center gap-1 font-medium">
                                {apt.type === 'video' ? (
                                  <Video className="h-3 w-3" />
                                ) : (
                                  <MapPin className="h-3 w-3" />
                                )}
                                <span className="truncate">{apt.time}</span>
                              </div>
                              <div className="truncate mt-1">
                                {getPatientName(apt.patientId)}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dagvisning */}
      {viewType === 'day' && (
        <div className="space-y-4">
          {hours.map(hour => {
            const appointments = getAppointmentsForDate(currentDate).filter(apt => {
              const aptHour = parseInt(apt.time.split(':')[0]);
              return aptHour === hour;
            });

            return (
              <Card key={hour}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">
                      {hour.toString().padStart(2, '0')}:00 - {(hour + 1).toString().padStart(2, '0')}:00
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {appointments.length > 0 ? (
                    <div className="space-y-2">
                      {appointments.map(apt => (
                        <Link
                          key={apt.id}
                          href={`/employee/patients/${apt.patientId}`}
                          className="block"
                        >
                          <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                            <Avatar>
                              <AvatarImage src={getPatientAvatar(apt.patientId)} />
                              <AvatarFallback>
                                {getPatientName(apt.patientId)[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{getPatientName(apt.patientId)}</p>
                              <p className="text-sm text-muted-foreground">
                                {apt.time} • {apt.duration} min
                              </p>
                            </div>
                            <Badge variant={apt.type === 'video' ? 'default' : 'secondary'}>
                              {apt.type === 'video' ? (
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
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Inga bokningar denna timme
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Månadsvisning - Lista över alla möten */}
      {viewType === 'month' && (
        <div className="space-y-3">
          {mockEmployeeAppointments
            .filter(apt => {
              const aptDate = new Date(apt.date);
              return (
                aptDate.getMonth() === currentDate.getMonth() &&
                aptDate.getFullYear() === currentDate.getFullYear()
              );
            })
            .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
            .map(apt => (
              <Link key={apt.id} href={`/employee/patients/${apt.patientId}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <div className="text-2xl font-bold">
                          {new Date(apt.date).getDate()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(apt.date).toLocaleDateString('sv-SE', { month: 'short' })}
                        </div>
                      </div>
                      <div className="w-px h-12 bg-border" />
                      <Avatar>
                        <AvatarImage src={getPatientAvatar(apt.patientId)} />
                        <AvatarFallback>{getPatientName(apt.patientId)[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{getPatientName(apt.patientId)}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {apt.time}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {apt.duration} min
                          </span>
                        </div>
                      </div>
                      <Badge variant={apt.type === 'video' ? 'default' : 'secondary'}>
                        {apt.type === 'video' ? (
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
                      <Badge variant="outline">
                        {apt.status === 'upcoming' ? 'Kommande' :
                         apt.status === 'completed' ? 'Genomförd' : 'Avbokad'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
