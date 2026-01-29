export interface Attachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'image' | 'document';
  uploadedAt: string;
  thumbnailUrl: string;
}

export interface HealthcareNote {
  id: string;
  date: string;
  author: string;
  role: string;
  content: string;
  type: 'note' | 'recommendation' | 'observation';
  attachments?: Attachment[];
}

export const mockHealthcareNotes: HealthcareNote[] = [
  {
    id: '1',
    date: '2024-02-15',
    author: 'Dr. Sara Blank',
    role: 'Specialistläkare, Allmänmedicin',
    content: 'Patienten visar god progress i sin återhämtning. Blodsockernivåerna är stabila och inom normalintervall. Fortsätt med nuvarande medicinering och träningsplan.',
    type: 'note',
    attachments: [
      {
        id: 'att1',
        fileName: 'Blodsockervärden & Behandlingsplan',
        fileSize: '245 KB',
        fileType: 'pdf',
        uploadedAt: '2024-02-15T10:30:00',
        thumbnailUrl: '/examplepics/erre_photo_of_paper_forms_being_filled_out_--v_7_685772ee-0f11-408c-8137-9fb7d0fe2c88_1.png'
      }
    ]
  },
  {
    id: '2',
    date: '2024-02-10',
    author: 'Johan Svensson',
    role: 'Psykolog, KBT',
    content: 'Vi har diskuterat strategier för stresshantering. Patienten har gjort goda framsteg med meditationsövningarna. Rekommenderar att fortsätta med dagliga 15-minuters sessioner.',
    type: 'recommendation',
    attachments: [
      {
        id: 'att2',
        fileName: 'Praktiska övningar för vardagen',
        fileSize: '1.2 MB',
        fileType: 'pdf',
        uploadedAt: '2024-02-10T14:15:00',
        thumbnailUrl: '/examplepics/erre_A_calm_minimalistic_photograph_of_a_quiet_everyday_momen_dd0f80a5-8e6d-455e-81d4-34e54bea8d04_3.png'
      },
      {
        id: 'att3',
        fileName: 'Mindfulness: 15-minuters guide',
        fileSize: '890 KB',
        fileType: 'pdf',
        uploadedAt: '2024-02-10T14:16:00',
        thumbnailUrl: '/examplepics/erre_A_realistic_photograph_of_a_person_taking_a_calm_walk_ou_14631a15-5d99-42a5-be6e-617035e72b60_3.png'
      }
    ]
  },
  {
    id: '3',
    date: '2024-02-05',
    author: 'Dr. Sara Blank',
    role: 'Specialistläkare, Allmänmedicin',
    content: 'Resultat från senaste blodprovet visar förbättrade värden på LDL-kolesterol. Ferritin ligger nu inom önskat intervall. Bra jobbat med koständringarna!',
    type: 'observation',
    attachments: [
      {
        id: 'att4',
        fileName: 'Fullständig blodanalys & tolkning',
        fileSize: '356 KB',
        fileType: 'pdf',
        uploadedAt: '2024-02-05T09:45:00',
        thumbnailUrl: '/examplepics/erre_photo_of_a_hospital_that_looks_really_boring_and_that_yo_3bf5a0dc-18be-4a67-89db-5c028e33d465_0.png'
      },
      {
        id: 'att5',
        fileName: 'Kostråd vid högt kolesterol',
        fileSize: '189 KB',
        fileType: 'pdf',
        uploadedAt: '2024-02-05T09:46:00',
        thumbnailUrl: '/examplepics/erre_A_warm_inviting_food_photograph_of_a_bowl_of_creamy_quar_871d5bb4-05f4-48b4-bd2b-8c899a9aa30b_1.png'
      }
    ]
  },
  {
    id: '4',
    date: '2024-01-28',
    author: 'Johan Svensson',
    role: 'Psykolog, KBT',
    content: 'Patienten rapporterar förbättrad sömnkvalitet efter implementering av nya rutiner. Fortsätt med god sömnhygien och undvik skärmar 1 timme före sänggåendet.',
    type: 'recommendation'
  }
];
