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
    <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ${featured ? 'border-2 border-primary-500' : ''}`}>
      <div className="h-64 bg-gray-100 relative">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Property Image
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg}`}>
            {statusInfo.text}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <div className="text-xl font-bold text-primary-600">{formattedPrice}</div>
        </div>
        
        <p className="text-gray-600 mb-4">{location}</p>
        
        <div className="flex items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
          {bedrooms !== undefined && (
            <div className="flex items-center mr-4">
              <svg className="w-5 h-5 mr-1 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}
            </div>
          )}
          {bathrooms !== undefined && (
            <div className="flex items-center mr-4">
              <svg className="w-5 h-5 mr-1 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3.9 6.7a3 3 0 005.204 0L18 7m-9-1h.01M21 15h-3.5v3.5h-11V15H3m9-8h.01M12 2v2m0 0h.01M12 6v2m0 0h.01M12 10v2m0 0h.01M12 14v2m0 0h.01M12 18v2m0 0h.01" />
              </svg>
              {bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}
            </div>
          )}
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {area} {areaUnit}
          </div>
        </div>
        
        <div className="mt-6">
          <Link 
            href={`/properties/${id}`}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
