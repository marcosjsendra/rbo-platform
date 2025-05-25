'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropertyCard from '../properties/PropertyCard';

interface Property {
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
}

export default function FeaturedListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call when backend is ready
        // const response = await fetch('https://remax-cca.com/api/v1/GetProperties/take/3/skip/0', {
        //   headers: {
        //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_REI_API_KEY}`,
        //     'Content-Type': 'application/json',
        //   },
        // });
        // const data = await response.json();
        
        // Mock data for development
        setTimeout(() => {
          const mockData: Property[] = [
            {
              id: '1',
              title: 'Luxury Oceanview Villa',
              location: 'Nosara, Guanacaste',
              price: 1250000,
              bedrooms: 4,
              bathrooms: 4.5,
              area: 3800,
              areaUnit: 'sq ft',
              imageUrl: '/images/properties/villa1.jpg',
              status: 'for-sale'
            },
            {
              id: '2',
              title: 'Beachfront Condo',
              location: 'Sámara, Guanacaste',
              price: 485000,
              bedrooms: 2,
              bathrooms: 2,
              area: 1800,
              areaUnit: 'sq ft',
              imageUrl: '/images/properties/condo1.jpg',
              status: 'for-sale'
            },
            {
              id: '3',
              title: 'Mountain View Estate',
              location: 'Punta Islita, Guanacaste',
              price: 895000,
              bedrooms: 3,
              bathrooms: 3,
              area: 3200,
              areaUnit: 'sq ft',
              imageUrl: '/images/properties/estate1.jpg',
              status: 'for-sale'
            }
          ];
          setProperties(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setError('Failed to load featured properties. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  if (error) {
    return (
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }


  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties in Nosara & Sámara</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium properties in the most sought-after locations of Costa Rica&apos;s Blue Zone.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                featured={true}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  );
}
