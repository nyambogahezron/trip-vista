export type CategoryProp =
  | 'Adventure'
  | 'Nature'
  | 'City'
  | 'Cultural'
  | 'Relaxing'
  | 'Shopping'
  | 'Food'
  | 'Nightlife'
  | 'Sports'
  | 'Music'
  | 'Beach'
  | 'Historical'
  | 'Religious'
  | 'Educational'
  | 'Wildlife'
  | 'Photography'
  | 'Art'
  | 'Festival'
  | 'Camping'
  | 'Hiking'
  | 'Safari'
  | 'Zoo'
  | 'Aquarium'
  | 'Museum'
  | 'Theater'
  | 'Arena';

export type User = {
  id: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
};
export interface ListingProps {
  id: string;
  name: string;
  price: string;
  location: string;
  image: string;
  description?: string;
  rating?: number;
  duration?: string;
  category: CategoryProp;
}

export interface ListingCardProps {
  item: ListingProps;
  customCardStyle?: string;
  customImageStyle?: string;
  width?: number;
  showFavIcon?: boolean;
}

export type ListingsProps = {
  selectedCategory: string;
  customCardStyle?: string;
  customImageStyle?: string;
  width?: number;
  showFavIcon?: boolean;
  horizontal?: boolean;
};

export type Review = {
  id: string;
  name: string;
  image: string;
  rating: number;
  review: string;
  user: User;
};

export type TravelGroup = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
};
