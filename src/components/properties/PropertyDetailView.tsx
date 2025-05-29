'use client';

/**
 * src/components/properties/PropertyDetailView.tsx
 * 
 * Property detail view component for displaying comprehensive property information
 * Used on property detail pages to show all available property details
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Database } from '@/lib/types/supabase';

// Define the property type based on the database schema
type Property = Database['public']['Tables']['properties']['Row'];

// Define the props interface for the PropertyDetailView component
interface PropertyDetailViewProps {
  property: Property;
  relatedProperties?: Property[];
}

/**
 * PropertyDetailView component
 * 
 * Displays detailed information about a property
 * Includes image gallery, property details, features, and related properties
 * 
 * @param props - Property detail view properties
 * @returns Property detail view component
 */
export default function PropertyDetailView({ 
  property,
  relatedProperties = []
}: PropertyDetailViewProps) {
  // State for the active image in the gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Extract property data
  const {
    id,
    title,
    description,
    price,
    bedrooms,
    bathrooms,
    property_type: propertyType,
    location,
    raw_data: rawData
  } = property;
  
  // Parse raw data if available
  const parsedRawData = rawData ? (typeof rawData === 'string' ? JSON.parse(rawData) : rawData) : {};
  
  // Extract additional data from raw data
  const {
    images = [],
    features = {},
    status = 'for-sale',
    latitude,
    longitude,
    size,
    sizeUnit = 'sq ft',
    yearBuilt,
    parkingSpaces,
    address,
    city,
    stateProvince,
    country,
    postalCode
  } = parsedRawData;
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price || 0);
  
  // Format status for display
  const statusMap = {
    'for-sale': { text: 'For Sale', bg: 'bg-blue-100 text-blue-800' },
    'for-rent': { text: 'For Rent', bg: 'bg-green-100 text-green-800' },
    'sold': { text: 'Sold', bg: 'bg-red-100 text-red-800' },
    'pending': { text: 'Pending', bg: 'bg-yellow-100 text-yellow-800' }
  } as const;
  
  // Define valid status keys
  type StatusKey = keyof typeof statusMap;
  
  // Use type assertion to ensure status is a valid key or use default
  const statusKey = (status && Object.keys(statusMap).includes(status as string)) ? 
    status as StatusKey : 
    'for-sale' as StatusKey;
    
  const statusInfo = statusMap[statusKey];
  
  // Format full address
  const fullAddress = [
    address,
    city,
    stateProvince,
    country,
    postalCode
  ].filter(Boolean).join(', ');
  
  // Prepare image gallery
  const imageGallery = images.length > 0 
    ? images.map((img: any) => typeof img === 'string' ? img : img.url) 
    : ['/images/property-placeholder.jpg'];
  
  // Handle image navigation
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % imageGallery.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length);
  };
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
      {/* Image Gallery */}
      <div className="relative h-[500px] bg-gray-100">
        {imageGallery.length > 0 ? (
          <>
            <Image 
              src={imageGallery[activeImageIndex]} 
              alt={title || 'Property image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
            
            {/* Image navigation controls */}
            {imageGallery.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {activeImageIndex + 1} / {imageGallery.length}
                </div>
              </>
            )}
            
            {/* Status badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md bg-opacity-90 shadow-lg ${statusInfo.bg}`}>
                {statusInfo.text}
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Thumbnail gallery */}
      {imageGallery.length > 1 && (
        <div className="flex overflow-x-auto gap-2 p-4 bg-gray-50">
          {imageGallery.map((img: string, index: number) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 ${
                index === activeImageIndex ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Property details */}
      <div className="p-6 space-y-6">
        {/* Title and price */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-2">{location || fullAddress}</p>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {formattedPrice}
          </div>
        </div>
        
        {/* Key features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-100">
          {bedrooms !== undefined && (
            <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-lg font-bold text-gray-900">{bedrooms}</span>
              <span className="text-sm text-gray-600">{bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
            </div>
          )}
          
          {bathrooms !== undefined && (
            <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3.9 6.7a3 3 0 005.204 0L18 7m-9-1h.01M21 15h-3.5v3.5h-11V15H3m9-8h.01M12 2v2m0 0h.01M12 6v2m0 0h.01M12 10v2m0 0h.01M12 14v2m0 0h.01M12 18v2m0 0h.01" />
              </svg>
              <span className="text-lg font-bold text-gray-900">{bathrooms}</span>
              <span className="text-sm text-gray-600">{bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
            </div>
          )}
          
          {size && (
            <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="text-lg font-bold text-gray-900">{size}</span>
              <span className="text-sm text-gray-600">{sizeUnit}</span>
            </div>
          )}
          
          {propertyType && (
            <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-lg font-bold text-gray-900">{propertyType}</span>
              <span className="text-sm text-gray-600">Property Type</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        {description && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Description</h2>
            <div className="text-gray-700 prose max-w-none">
              {description}
            </div>
          </div>
        )}
        
        {/* Features */}
        {Object.keys(features).length > 0 && (
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-gray-900">Features & Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(features).map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-semibold text-gray-900 capitalize">{category}</h3>
                  <ul className="space-y-1">
                    {Array.isArray(items) ? (
                      items.map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {String(items)}
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Location */}
        {(latitude && longitude) && (
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-gray-900">Location</h2>
            <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
              {/* Map placeholder - would integrate with Google Maps or similar */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Map view would be displayed here</p>
                  <p className="text-sm mt-2">Location: {latitude}, {longitude}</p>
                </div>
              </div>
            </div>
            {fullAddress && (
              <p className="text-gray-700">{fullAddress}</p>
            )}
          </div>
        )}
        
        {/* Contact section */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Interested in this property?</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={`/contact?property=${id}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200"
            >
              Request Information
            </Link>
            <Link 
              href={`/schedule-viewing?property=${id}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Schedule Viewing
            </Link>
          </div>
        </div>
      </div>
      
      {/* Related properties */}
      {relatedProperties.length > 0 && (
        <div className="border-t border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Would map through related properties and render PropertyCard components */}
            <div className="text-center text-gray-500 col-span-full py-8">
              Related properties would be displayed here
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
