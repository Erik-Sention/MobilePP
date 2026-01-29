import { BloodAnalysisItem } from '../types';

export const mockBloodAnalysis: BloodAnalysisItem[] = [
  {
    id: '1',
    name: 'Hemoglobin',
    value: 145,
    unit: 'g/L',
    min: 120,
    max: 160,
    status: 'normal',
  },
  {
    id: '2',
    name: 'LDL',
    value: 3.3,
    unit: 'mmol/L',
    min: 0,
    max: 3.5,
    status: 'normal',
    statusText: 'Inom grönt intervall',
  },
  {
    id: '3',
    name: 'Ferritin',
    value: 180,
    unit: 'µg/L',
    min: 30,
    max: 200,
    status: 'normal',
  },
];
