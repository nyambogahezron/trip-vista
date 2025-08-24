export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  price: number;
  category: 'beach' | 'mountain' | 'city' | 'countryside' | 'historic';
}

export interface Agency {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  specialties: string[];
  founded: number;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  tours: Tour[];
}

export interface Tour {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  tourId?: string;
  agencyId?: string;
}

export interface Statistic {
  label: string;
  value: number;
  suffix?: string;
}