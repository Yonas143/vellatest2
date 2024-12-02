export interface Location {
  city: string;
  state: string;
  country: string;
  distance: string;
}

export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  occupation: string;
  location: Location;
  images: string[];
  bio: string;
  interests: string[];
  verified: boolean;
  premium: boolean;
  lastActive: string;
}

export interface UserPreferences {
  ageRange: {
    min: number;
    max: number;
  };
  distance: number;
  interests: string[];
}