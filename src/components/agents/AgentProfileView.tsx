'use client';

/**
 * src/components/agents/AgentProfileView.tsx
 * 
 * Agent profile view component for displaying comprehensive agent information
 * Used on agent detail pages to show all available agent details
 */

import Image from 'next/image';
import Link from 'next/link';
import { Database } from '@/lib/types/supabase';

// Define the agent type based on the database schema
type Agent = Database['public']['Tables']['agents']['Row'];

// Define the props interface for the AgentProfileView component
interface AgentProfileViewProps {
  agent: Agent;
  listedProperties?: Database['public']['Tables']['properties']['Row'][];
}

/**
 * AgentProfileView component
 * 
 * Displays detailed information about an agent
 * Includes profile image, contact info, bio, specialties, and listed properties
 * 
 * @param props - Agent profile view properties
 * @returns Agent profile view component
 */
export default function AgentProfileView({ 
  agent,
  listedProperties = []
}: AgentProfileViewProps) {
  // Extract agent data
  const {
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    title,
    bio,
    image_url: imageUrl,
    specialties = [],
    languages = [],
    social_media: socialMedia = {},
    raw_data: rawData
  } = agent;
  
  // Extract brand from raw data if available
  const brand = rawData && typeof rawData === 'object' ? (rawData as Record<string, unknown>).brand as string : undefined;
  
  // Parse raw data if available
  const parsedRawData = rawData ? (typeof rawData === 'string' ? JSON.parse(rawData) : rawData) : {};
  
  // Format the agent's full name
  const fullName = `${firstName} ${lastName}`;
  
  // Extract additional data from raw data
  const {
    certifications = [],
    experience,
    officeAddress,
    officePhone,
    reviews = []
  } = parsedRawData;
  
  // Determine the brand color scheme
  const brandColors = {
    'AZURA': 'from-blue-600 to-blue-800',
    'BLUE_OCEAN': 'from-blue-500 to-teal-500'
  };
  
  const brandColor = brandColors[brand as keyof typeof brandColors] || brandColors['BLUE_OCEAN'];
  
  // Format social media links
  const socialLinks = typeof socialMedia === 'object' && socialMedia 
    ? Object.entries(socialMedia).filter(([_, url]) => url) 
    : [];
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
      {/* Header with profile image and basic info */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
        <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center md:justify-start p-6 md:p-10 gap-6">
          <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
            {imageUrl ? (
              <Image 
                src={imageUrl} 
                alt={fullName}
                width={160}
                height={160}
                className="object-cover h-full w-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          <div className="text-center md:text-left text-white">
            <h1 className="text-3xl font-bold">{fullName}</h1>
            {title && <p className="text-white/90 text-lg mt-1">{title}</p>}
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-3">
              {brand && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                  RE/MAX {brand}
                </span>
              )}
              {experience && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                  {experience} Years Experience
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Contact info and details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact information */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
            
            {email && (
              <div className="flex items-start text-gray-700">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href={`mailto:${email}`} className="hover:text-blue-600 transition-colors">{email}</a>
                </div>
              </div>
            )}
            
            {phone && (
              <div className="flex items-start text-gray-700">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href={`tel:${phone}`} className="hover:text-blue-600 transition-colors">{phone}</a>
                </div>
              </div>
            )}
            
            {officePhone && (
              <div className="flex items-start text-gray-700">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Office</p>
                  <a href={`tel:${officePhone}`} className="hover:text-blue-600 transition-colors">{officePhone}</a>
                </div>
              </div>
            )}
            
            {officeAddress && (
              <div className="flex items-start text-gray-700">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Office Address</p>
                  <address className="not-italic">{officeAddress}</address>
                </div>
              </div>
            )}
          </div>
          
          {/* Social Media */}
          {socialLinks.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Connect</h2>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(([platform, url]) => (
                  <a 
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    aria-label={platform}
                  >
                    {/* Social media icon would go here */}
                    <span className="capitalize text-xs">{platform.substring(0, 2)}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {/* Specialties */}
          {specialties && specialties.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((language, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
              <ul className="space-y-2">
                {certifications.map((cert: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Right column - Bio and listings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio */}
          {bio && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">About {firstName}</h2>
              <div className="prose max-w-none text-gray-700">
                {bio}
              </div>
            </div>
          )}
          
          {/* Agent's listings */}
          <div className="space-y-6 border-t border-gray-100 pt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Current Listings</h2>
              <Link 
                href={`/properties?agent=${id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All
              </Link>
            </div>
            
            {listedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Would map through properties and render PropertyCard components */}
                <div className="text-center text-gray-500 col-span-full py-8">
                  Agent's listed properties would be displayed here
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
                <p>No active listings at the moment</p>
              </div>
            )}
          </div>
          
          {/* Reviews */}
          {reviews && reviews.length > 0 && (
            <div className="space-y-6 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-gray-900">Client Reviews</h2>
              <div className="space-y-4">
                {reviews.slice(0, 3).map((review: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                    <p className="mt-2 font-medium text-gray-900">— {review.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Contact form or CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Work with {firstName}</h2>
            <p className="text-gray-700 mb-6">Looking to buy or sell a property? Get in touch with {firstName} today.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/contact?agent=${id}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                Contact {firstName}
              </Link>
              <a 
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
