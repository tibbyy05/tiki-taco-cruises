export interface StaticGalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  mediaType?: 'video';
}

export const staticGalleryImages: StaticGalleryImage[] = [
  {
    id: 1,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/Real1.jpg',
    alt: 'Sunset cruise with Fort Lauderdale skyline',
    category: 'sunset',
  },
  {
    id: 2,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real2.jpg',
    alt: 'Turquoise waters of Fort Lauderdale Intracoastal',
    category: 'sandbar',
  },
  {
    id: 3,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real3.jpg',
    alt: 'Pontoon cruising Fort Lauderdale Intracoastal Waterway',
    category: 'cruising',
  },
  {
    id: 4,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real5.jpg',
    alt: 'Fort Lauderdale waterfront aerial view',
    category: 'destinations',
  },
  {
    id: 5,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/real6.jpg',
    alt: 'Group enjoying Fort Lauderdale waters',
    category: 'sandbar',
  },
  {
    id: 6,
    src: '/Sandbar.png',
    alt: 'Fort Lauderdale sandbar experience',
    category: 'sandbar',
  },
  {
    id: 7,
    src: '/Night_Intracoastal2.jpg',
    alt: 'Las Olas & Intracoastal Cruise in Fort Lauderdale',
    category: 'cruising',
  },
  {
    id: 8,
    src: 'https://vjiybpiuquttbaimywbt.supabase.co/storage/v1/object/public/pontoon/15.png',
    alt: 'Intracoastal Waterway Tour in Fort Lauderdale',
    category: 'cruising',
  },
  {
    id: 9,
    src: '/DJI_0062.JPG',
    alt: 'Aerial view of Tiki Taco pontoon experience',
    category: 'destinations',
  },
  {
    id: 10,
    src: '/Good3.JPG',
    alt: 'Tiki Taco boat experience on the water',
    category: 'cruising',
  },
  {
    id: 11,
    src: '/Good2.JPG',
    alt: 'Guests enjoying a tiki pontoon cruise',
    category: 'groups',
  },
  {
    id: 12,
    src: '/hero-video2.mp4',
    alt: 'Tiki Taco pontoon experience highlight video',
    category: 'cruising',
    mediaType: 'video',
  },
];
