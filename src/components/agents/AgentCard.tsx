'use client';

/**
 * src/components/agents/AgentCard.tsx
 * 
 * Agent card component for displaying agent information
 * Provides a consistent UI for agent listings
 */

import Link from 'next/link';
import Image from 'next/image';

// Define the props interface for the AgentCard component
interface AgentCardProps {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  specialties?: string[];
  languages?: string[];
  brand: 'AZURA' | 'BLUE_OCEAN';
  featured?: boolean;
}

/**
 * AgentCard component
 * 
 * Displays agent information in a card format
 * Includes name, title, contact info, and specialties
 * 
 * @param props - Agent card properties
 * @returns Agent card component
 */
export default function AgentCard({
  id,
  firstName,
  lastName,
  title,
  email,
  phone,
  imageUrl,
  specialties = [],
  languages = [],
  brand,
  featured = false
}: AgentCardProps) {
  // Format the agent's full name
  const fullName = `${firstName} ${lastName}`;
  
  // Determine the brand color scheme
  const brandColors = {
    'AZURA': 'from-blue-600 to-blue-800',
    'BLUE_OCEAN': 'from-blue-500 to-teal-500'
  };
  
  const brandColor = brandColors[brand] || brandColors['BLUE_OCEAN'];
  
  return (
    <div className={`group bg-white rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ${featured ? 'ring-2 ring-blue-500 ring-offset-4' : 'hover:shadow-2xl'}`}>
      <div className="h-64 bg-gray-100 relative overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={fullName}
            fill
            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        
        {featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-md">
            Featured
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h3 className="text-xl font-bold text-white">{fullName}</h3>
          {title && <p className="text-white/80 text-sm">{title}</p>}
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          {/* Contact information */}
          {email && (
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${email}`} className="hover:text-blue-600 transition-colors">{email}</a>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${phone}`} className="hover:text-blue-600 transition-colors">{phone}</a>
            </div>
          )}
        </div>
        
        {/* Specialties */}
        {specialties.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {specialties.slice(0, 3).map((specialty, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {specialty}
                </span>
              ))}
              {specialties.length > 3 && (
                <span className="bg-gray-50 text-gray-500 text-xs px-2 py-1 rounded-full">
                  +{specialties.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {languages.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <span key={index} className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* View profile button */}
        <div className="pt-4 border-t border-gray-100">
          <Link 
            href={`/agents/${id}`} 
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 bg-gradient-to-r from-blue-600 to-blue-700"
          >
            View Profile
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
