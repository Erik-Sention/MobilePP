import { HealthMetric, BloodPressure } from '../types';

export const mockHealthMetrics: HealthMetric[] = [
  {
    id: '1',
    type: 'steps',
    value: 8432,
    unit: 'STEG',
    icon: '👟',
    lastUpdated: new Date(),
  },
  {
    id: '2',
    type: 'bpm',
    value: 58,
    unit: 'BPM',
    icon: '❤️',
    lastUpdated: new Date(),
  },
  {
    id: '3',
    type: 'sleep',
    value: 85,
    unit: 'SÖMN',
    icon: '💤',
    lastUpdated: new Date(),
  },
];

export const mockBloodPressure: BloodPressure = {
  systolic: 120,
  diastolic: 80,
  unit: 'mmHg',
  timestamp: new Date(),
  changePercent: -2,
  history: [
    { timestamp: new Date(2026, 0, 20), value: 118 },
    { timestamp: new Date(2026, 0, 21), value: 122 },
    { timestamp: new Date(2026, 0, 22), value: 125 },
    { timestamp: new Date(2026, 0, 23), value: 119 },
    { timestamp: new Date(2026, 0, 24), value: 121 },
    { timestamp: new Date(2026, 0, 25), value: 123 },
    { timestamp: new Date(2026, 0, 26), value: 120 },
  ],
};
