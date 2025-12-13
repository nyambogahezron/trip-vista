import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}


export interface Destination {
    id: number;
    name: string;
    location: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    duration: string;
    highlights: string[];
}

export interface Agency {
    id: number;
    name: string;
    description: string;
    logo: string;
    featuredImage: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
    established: string;
    destinations: number;
    website: string;
    location: string;
}