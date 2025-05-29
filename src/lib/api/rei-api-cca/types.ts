/**
 * src/lib/api/rei-api-cca/types.ts
 * 
 * Type definitions for REI API CCA data structures
 * These types define the structure of property and agent data from the REI API CCA
 */

/**
 * Property image type
 * Represents an image associated with a property
 */
export interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
  order?: number;
  isPrimary?: boolean;
}

/**
 * Property type
 * Represents a property listing from the REI API CCA
 */
export interface Property {
  // Basic information
  listingId: string;
  title?: string;
  remarks?: string;
  status: string;
  
  // Location information
  country?: string;
  stateProvince?: string;
  city?: string;
  location?: string;
  address?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  
  // Property details
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  sizeUnit?: string;
  lotSize?: number;
  lotSizeUnit?: string;
  yearBuilt?: number;
  
  // Price information
  price?: number;
  currency?: string;
  
  // Features and amenities
  features?: Record<string, any>;
  
  // Media
  images?: PropertyImage[];
  
  // Timestamps
  listedDate?: string;
  modifiedDate?: string;
  
  // Additional data
  [key: string]: any;
}

/**
 * Agent social media type
 * Represents social media links for an agent
 */
export interface AgentSocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
  [key: string]: string | undefined;
}

/**
 * Agent type
 * Represents an agent from the REI API CCA
 */
export interface Agent {
  // Basic information
  agentId: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  
  // Professional information
  title?: string;
  bio?: string;
  specialties?: string[];
  languages?: string[];
  
  // Media
  imageUrl?: string;
  
  // Social media
  socialMedia?: AgentSocialMedia;
  
  // Timestamps
  createdDate?: string;
  modifiedDate?: string;
  
  // Additional data
  [key: string]: any;
}
