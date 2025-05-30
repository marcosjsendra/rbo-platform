import Link from 'next/link';
import Image from 'next/image';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  areaUnit: string;
  imageUrl?: string;
  status: 'for-sale' | 'for-rent' | 'sold' | 'pending';
  featured?: boolean;
}

// Modern property card component with sleek design and hover effects
// Modern property card component with sleek design and hover effects
export default function PropertyCard({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  areaUnit,
  imageUrl,
  status,
  featured = false
}: PropertyCardProps) {
  const statusMap = {
    'for-sale': { text: 'For Sale', bg: 'bg-blue-100 text-blue-800' },
    'for-rent': { text: 'For Rent', bg: 'bg-green-100 text-green-800' },
    'sold': { text: 'Sold', bg: 'bg-red-100 text-red-800' },
    'pending': { text: 'Pending', bg: 'bg-yellow-100 text-yellow-800' }
  };

  const statusInfo = statusMap[status] || statusMap['for-sale'];
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ${featured ? 'ring-2 ring-blue-500 ring-offset-4' : 'hover:shadow-2xl'}`}>
      <div className="h-72 bg-gray-100 relative overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Property Image
          </div>
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md bg-opacity-90 shadow-lg ${statusInfo.bg}`}>
            {statusInfo.text}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-md">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{title}</h3>
          <div className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{formattedPrice}</div>
        </div>
        
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-600">{location}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-4 mt-4">
          <div className="flex space-x-4">
            {bedrooms !== undefined && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3.9 6.7a3 3 0 005.204 0L18 7m-9-1h.01M21 15h-3.5v3.5h-11V15H3m9-8h.01M12 2v2m0 0h.01M12 6v2m0 0h.01M12 10v2m0 0h.01M12 14v2m0 0h.01M12 18v2m0 0h.01" />
                </svg>
                <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
              </div>
            )}
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>{area} {areaUnit}</span>
            </div>
          </div>
          <Link href={`/properties/${id}`} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200">
            View Details
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
