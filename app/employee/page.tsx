'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { mockPatients } from '@/lib/mock-data/patients';
import { mockContentLibrary } from '@/lib/mock-data/content-library';
import { mockHealthcareNotes } from '@/lib/mock-data/healthcare-notes';
import { mockEmployeeAppointments } from '@/lib/mock-data/appointments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, ClipboardList, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function EmployeeDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Totalt Patienter',
      value: mockPatients.length,
      icon: Users,
      href: '/employee/patients',
      color: 'text-blue-600'
    },
    {
      title: 'Publicerade Artiklar',
      value: mockContentLibrary.filter(c => c.publishStatus === 'published').length,
      icon: FileText,
      href: '/employee/content',
      color: 'text-green-600'
    },
    {
      title: 'Aktiva Hälsoplaner',
      value: mockHealthcareNotes.length,
      icon: ClipboardList,
      href: '/employee/health-plans',
      color: 'text-purple-600'
    },
    {
      title: 'Kommande Besök',
      value: mockEmployeeAppointments.filter(a => a.status === 'upcoming').length,
      icon: Calendar,
      href: '/employee/kalender',
      color: 'text-orange-600'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Välkommen tillbaka, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Här är en översikt av din verksamhet
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Snabbåtgärder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/employee/patients">
              <Users className="h-4 w-4 mr-2" />
              Visa alla patienter
            </Link>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/employee/kalender">
              <Calendar className="h-4 w-4 mr-2" />
              Visa kalender
            </Link>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/employee/messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Visa meddelanden
            </Link>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/employee/content/new">
              <FileText className="h-4 w-4 mr-2" />
              Skapa ny artikel
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
