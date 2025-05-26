'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Zone {
  id: number;
  name: string;
  imageUrl: string;
  propertyCount: number;
  locationId: string;
  officeCode: string;
}

const mockZones: Zone[] = [
  { 
    id: 1, 
    name: 'Nosara', 
    imageUrl: '/images/zones/nosara.jpg',
    propertyCount: 24,
    locationId: 'nosara',
    officeCode: 'BO' // Blue Ocean
  },
  { 
    id: 2, 
    name: 'Punta Islita', 
    imageUrl: '/images/zones/punta-islita.jpg',
    propertyCount: 8,
    locationId: 'puntal-islita',
    officeCode: 'BO'
  },
  { 
    id: 3, 
    name: 'Sámara', 
    imageUrl: '/images/zones/samara.jpg',
    propertyCount: 18,
    locationId: 'samara',
    officeCode: 'AZ' // Azura
  },
  { 
    id: 4, 
    name: 'Playa Marbella', 
    imageUrl: '/images/zones/marbella.jpg',
    propertyCount: 5,
    locationId: 'playa-marbella',
    officeCode: 'BO'
  },
  { 
    id: 5, 
    name: 'Puerto Carrillo', 
    imageUrl: '/images/zones/puerto-carrillo.jpg',
    propertyCount: 12,
    locationId: 'puerto-carrillo',
    officeCode: 'AZ'
  },
  { 
    id: 6, 
    name: 'Playa Ostional', 
    imageUrl: '/images/zones/ostional.jpg',
    propertyCount: 7,
    locationId: 'playa-ostional',
    officeCode: 'BO'
  },
];

export default function RegionalZones() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call when backend is ready
        // const response = await fetch('/api/v1/GetProperties', {
        //   headers: {
        //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_REI_API_KEY}`,
        //     'Content-Type': 'application/json',
        //   },
        // });
        // const data = await response.json();
        // setZones(data);
        
        // Mock data for development
        setTimeout(() => {
          setZones(mockZones);
          setLoading(false);
        }, 500);
        
      } catch (err) {
        console.error('Error fetching zone data:', err);
        setError('Failed to load regional zone data. Please try again later.');
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center text-red-500">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Regional Zone Highlights</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our premier real estate offerings in the Nicoya Peninsula&apos;s vibrant Blue Zones. 
            Experience the RE/MAX Blue Ocean difference in Nosara, Sámara, and surrounding beach communities.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone, index) => (
              <div key={zone.id} className="group relative rounded-xl overflow-hidden h-64">
                <div className="absolute inset-0 bg-gray-200">
                  {zone.imageUrl ? (
                    <Image 
                      src={zone.imageUrl} 
                      alt={zone.name}
                      className="w-full h-full object-cover"
                      width={500}
                      height={300}
                      priority={index < 3}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {zone.name} Image
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{zone.name}</h3>
                    <p className="text-white/80">{zone.propertyCount} properties available</p>
                  </div>
                </div>
                <Link 
                  href={`/properties?locationId=${zone.locationId}&officeCode=${zone.officeCode}`}
                  className="absolute inset-0 z-10"
                  aria-label={`View properties in ${zone.name}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
