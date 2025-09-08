
export interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  price: string;
  activities: string[];
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    description: "Iconic island with white-washed buildings and blue domes overlooking the Aegean Sea.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2574&auto=format&fit=crop",
    category: "Island",
    rating: 4.8,
    price: "$1,200",
    activities: ["Sunset Watching", "Wine Tasting", "Sailing", "Beach Hopping"]
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    description: "Ancient city with thousands of temples, shrines and traditional wooden houses.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop",
    category: "Cultural",
    rating: 4.7,
    price: "$1,500",
    activities: ["Temple Visits", "Tea Ceremony", "Cherry Blossom Viewing", "Geisha District Tour"]
  },
  {
    id: 3,
    name: "Machu Picchu",
    country: "Peru",
    description: "Ancient Incan citadel set high in the Andes Mountains, above the Urubamba River valley.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2670&auto=format&fit=crop",
    category: "Historical",
    rating: 4.9,
    price: "$1,800",
    activities: ["Guided Tours", "Hiking", "Photography", "Archaeology Exploration"]
  },
  {
    id: 4,
    name: "Serengeti",
    country: "Tanzania",
    description: "Vast ecosystem in northern Tanzania, known for its annual migration of wildebeest and zebra.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2532&auto=format&fit=crop",
    category: "Safari",
    rating: 4.9,
    price: "$2,500",
    activities: ["Wildlife Safari", "Hot Air Balloon Rides", "Photography Tours", "Camping"]
  },
  {
    id: 5,
    name: "Bali",
    country: "Indonesia",
    description: "Beautiful island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2538&auto=format&fit=crop",
    category: "Island",
    rating: 4.5,
    price: "$900",
    activities: ["Surfing", "Temple Visits", "Rice Terrace Tours", "Spa Treatments"]
  },
  {
    id: 6,
    name: "Amalfi Coast",
    country: "Italy",
    description: "Stunning coastline with dramatic cliffs and a road connecting picturesque towns.",
    image: "https://images.unsplash.com/photo-1612698093608-4cf302df8e69?q=80&w=2670&auto=format&fit=crop",
    category: "Coastal",
    rating: 4.7,
    price: "$1,400",
    activities: ["Boat Tours", "Coastal Hiking", "Beach Relaxation", "Italian Cuisine"]
  },
  {
    id: 7,
    name: "Banff National Park",
    country: "Canada",
    description: "Filled with mountains, coniferous forest and turquoise glacial lakes in Alberta.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop",
    category: "Mountains",
    rating: 4.8,
    price: "$1,100",
    activities: ["Hiking", "Skiing", "Wildlife Watching", "Canoeing"]
  },
  {
    id: 8,
    name: "Great Barrier Reef",
    country: "Australia",
    description: "World's largest coral reef system composed of over 2,900 individual reefs and 900 islands.",
    image: "https://images.unsplash.com/photo-1518555978560-e10c50cf9b68?q=80&w=2592&auto=format&fit=crop",
    category: "Marine",
    rating: 4.6,
    price: "$1,700",
    activities: ["Scuba Diving", "Snorkeling", "Glass-Bottom Boat Tours", "Island Hopping"]
  }
];
