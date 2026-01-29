import { LibraryContent } from '../types';

export const mockLibraryContent: LibraryContent[] = [
  {
    id: '1',
    title: 'Kostråd',
    description: 'Viktiga råd för en balanserad kost',
    thumbnail: '/examplepics/erre_A_warm_inviting_food_photograph_of_a_bowl_of_creamy_quar_871d5bb4-05f4-48b4-bd2b-8c899a9aa30b_1.png',
    progress: 0,
    status: 'new',
    badgeText: 'NY',
  },
  {
    id: '2',
    title: 'Grundläggande nutrition',
    description: 'Lär dig grunderna i näringslära',
    thumbnail: '/examplepics/erre_A_warm_inviting_food_photograph_of_a_bowl_of_creamy_quar_871d5bb4-05f4-48b4-bd2b-8c899a9aa30b_1.png',
    progress: 0,
    status: 'new',
    badgeText: '0%',
  },
  {
    id: '3',
    title: 'Förstå utmattning',
    description: 'Varför blir man trött och hur hanterar man det',
    thumbnail: '/examplepics/erre_Photorealistic_image_of_a_person_in_their_30s-40s_lookin_749f8936-5f1a-40ea-81fe-5078d5427d60_1.png',
    progress: 100,
    status: 'completed',
    badgeText: 'KLAR',
  },
];
