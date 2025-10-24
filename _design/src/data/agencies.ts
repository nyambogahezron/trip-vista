
export interface Agency {
  id: number;
  name: string;
  logo: string;
  description: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  foundedYear: number;
  locations: string[];
  website: string;
  featuredImage: string;
}

export const agencies: Agency[] = [
  {
    id: 1,
    name: "Adventure Trails",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2659&auto=format&fit=crop",
    description: "Specializing in off-the-beaten-path adventures, our guides take you to untouched landscapes and authentic cultural experiences.",
    rating: 4.8,
    reviewCount: 235,
    specialties: ["Mountain Trekking", "Cultural Immersion", "Wildlife Expeditions"],
    foundedYear: 2005,
    locations: ["Nepal", "Peru", "Tanzania", "Iceland"],
    website: "adventuretrails.com",
    featuredImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Luxury Voyages",
    logo: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2669&auto=format&fit=crop",
    description: "Providing premium travel experiences with 5-star accommodations, private guides, and exclusive access to world-class attractions.",
    rating: 4.9,
    reviewCount: 187,
    specialties: ["Luxury Retreats", "Honeymoon Packages", "Private Tours"],
    foundedYear: 1998,
    locations: ["Italy", "France", "Maldives", "Thailand"],
    website: "luxuryvoyages.com",
    featuredImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Eco Explorers",
    logo: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2574&auto=format&fit=crop",
    description: "Sustainable travel that minimizes environmental impact while maximizing authentic experiences in nature's most pristine settings.",
    rating: 4.7,
    reviewCount: 156,
    specialties: ["Eco Tourism", "Conservation Projects", "Nature Photography"],
    foundedYear: 2010,
    locations: ["Costa Rica", "Galapagos", "New Zealand", "Rwanda"],
    website: "ecoexplorers.org",
    featuredImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2674&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "City Seekers",
    logo: "https://images.unsplash.com/photo-1534946745144-c4d7544e3d29?q=80&w=2574&auto=format&fit=crop",
    description: "Urban adventures with insider access to the world's most vibrant cities, featuring local guides and authentic experiences.",
    rating: 4.6,
    reviewCount: 210,
    specialties: ["Food Tours", "Architecture Walks", "Historical Expeditions"],
    foundedYear: 2012,
    locations: ["Japan", "Spain", "United States", "United Kingdom"],
    website: "cityseekers.travel",
    featuredImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2670&auto=format&fit=crop"
  },
];
