import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { HealthMetricCard } from '@/components/dashboard/HealthMetricCard';
import { BloodPressureCard } from '@/components/dashboard/BloodPressureCard';
import { BloodAnalysisSection } from '@/components/dashboard/BloodAnalysisSection';
import { GoalSection } from '@/components/halsoplan/GoalSection';
import { AppointmentsSection } from '@/components/halsoplan/AppointmentsSection';
import { mockHealthMetrics, mockBloodPressure } from '@/lib/mock-data/health-metrics';
import { mockBloodAnalysis } from '@/lib/mock-data/blood-analysis';
import { mockDailyGoals, mockWeeklyGoals } from '@/lib/mock-data/goals';
import { mockAppointments } from '@/lib/mock-data/appointments';

export default function DashboardPage() {
  const completedDaily = mockDailyGoals.filter(g => g.status === 'completed').length;
  const totalDaily = mockDailyGoals.length;

  return (
    <div className="min-h-screen">
      <div className="p-4 space-y-4 pb-24">
        <WelcomeHeader />

        <section id="health-metrics" className="space-y-4 scroll-mt-24">
          <div className="grid grid-cols-3 gap-3">
            {mockHealthMetrics.map((metric) => (
              <HealthMetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          <BloodPressureCard data={mockBloodPressure} />

          <BloodAnalysisSection items={mockBloodAnalysis} />
        </section>

        <section id="goals" className="space-y-4 scroll-mt-24">
          <GoalSection
            title="Dagens Mål"
            subtitle={`${completedDaily} av ${totalDaily} klara`}
            goals={mockDailyGoals}
          />

          <GoalSection
            title="Veckomål"
            subtitle="V.42"
            goals={mockWeeklyGoals}
          />
        </section>

        <section id="appointments" className="scroll-mt-24">
          <AppointmentsSection appointments={mockAppointments} />
        </section>
      </div>
    </div>
  );
}
