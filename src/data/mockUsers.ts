import { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jessica Parker',
    age: 23,
    occupation: 'Professional model',
    location: {
      city: 'Chicago',
      state: 'IL',
      country: 'United States',
      distance: '1 km',
    },
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'I enjoy meeting new people and finding ways to help them have an uplifting experience.',
    interests: ['Travelling', 'Books', 'Music', 'Dancing', 'Modeling'],
  }
];