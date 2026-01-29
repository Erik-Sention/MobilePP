import { ContentArticle } from '../types';

// Enhanced library content with admin metadata for content management
export const mockContentLibrary: ContentArticle[] = [
  {
    id: '1',
    title: 'Kostråd',
    description: 'Viktiga råd för en balanserad kost',
    thumbnail: '/examplepics/erre_A_warm_inviting_food_photograph_of_a_bowl_of_creamy_quar_871d5bb4-05f4-48b4-bd2b-8c899a9aa30b_1.png',
    progress: 0,
    status: 'new',
    badgeText: 'NY',
    createdBy: 'e1',
    createdByName: 'Dr. Sara Blank',
    createdAt: new Date('2026-01-15T10:00:00'),
    updatedAt: new Date('2026-01-20T14:30:00'),
    assignedTo: ['1', 'p2', 'p4'], // Erik, Anna, Maria
    category: 'Nutrition',
    tags: ['kost', 'hälsa', 'mat'],
    publishStatus: 'published',
  },
  {
    id: '2',
    title: 'Grundläggande nutrition',
    description: 'Lär dig grunderna i näringslära',
    thumbnail: '/examplepics/erre_A_warm_inviting_food_photograph_of_a_bowl_of_creamy_quar_871d5bb4-05f4-48b4-bd2b-8c899a9aa30b_1.png',
    progress: 0,
    status: 'new',
    badgeText: '0%',
    createdBy: 'e1',
    createdByName: 'Dr. Sara Blank',
    createdAt: new Date('2026-01-10T09:00:00'),
    updatedAt: new Date('2026-01-10T09:00:00'),
    assignedTo: ['1', 'p3', 'p4'], // Erik, Lars, Maria
    category: 'Nutrition',
    tags: ['näringslära', 'grundläggande', 'utbildning'],
    publishStatus: 'published',
  },
  {
    id: '3',
    title: 'Förstå utmattning',
    description: 'Varför blir man trött och hur hanterar man det',
    thumbnail: '/examplepics/erre_Photorealistic_image_of_a_person_in_their_30s-40s_lookin_749f8936-5f1a-40ea-81fe-5078d5427d60_1.png',
    progress: 100,
    status: 'completed',
    badgeText: 'KLAR',
    createdBy: 'e2',
    createdByName: 'Emma Lundgren',
    createdAt: new Date('2026-01-05T11:30:00'),
    updatedAt: new Date('2026-01-12T16:00:00'),
    assignedTo: ['p2', 'p4'], // Anna, Maria
    category: 'Mental hälsa',
    tags: ['utmattning', 'energi', 'återhämtning'],
    publishStatus: 'published',
  },
];

// Helper function to get content by ID
export function getContentById(contentId: string): ContentArticle | undefined {
  return mockContentLibrary.find(c => c.id === contentId);
}

// Helper function to get content assigned to a specific patient
export function getContentForPatient(patientId: string): ContentArticle[] {
  return mockContentLibrary.filter(c => c.assignedTo.includes(patientId));
}

// Helper function to add new content (mock mutation)
export function addContent(content: ContentArticle): void {
  mockContentLibrary.push(content);
}

// Helper function to update content (mock mutation)
export function updateContent(contentId: string, updates: Partial<ContentArticle>): boolean {
  const index = mockContentLibrary.findIndex(c => c.id === contentId);
  if (index === -1) return false;

  mockContentLibrary[index] = {
    ...mockContentLibrary[index],
    ...updates,
    updatedAt: new Date(),
  };
  return true;
}

// Helper function to delete content (mock mutation)
export function deleteContent(contentId: string): boolean {
  const index = mockContentLibrary.findIndex(c => c.id === contentId);
  if (index === -1) return false;

  mockContentLibrary.splice(index, 1);
  return true;
}

// Helper function to assign content to patients
export function assignContentToPatients(contentId: string, patientIds: string[]): boolean {
  const content = getContentById(contentId);
  if (!content) return false;

  // Merge new patient IDs with existing ones (avoiding duplicates)
  const updatedAssignedTo = Array.from(new Set([...content.assignedTo, ...patientIds]));
  return updateContent(contentId, { assignedTo: updatedAssignedTo });
}

// Helper function to unassign content from a patient
export function unassignContentFromPatient(contentId: string, patientId: string): boolean {
  const content = getContentById(contentId);
  if (!content) return false;

  const updatedAssignedTo = content.assignedTo.filter(id => id !== patientId);
  return updateContent(contentId, { assignedTo: updatedAssignedTo });
}
