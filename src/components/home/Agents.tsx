'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Agent {
  id: number;
  name: string;
  title: string;
  phone: string;
  email: string;
  imageUrl?: string;
  office: 'blue-ocean' | 'azura';
  languages: string[];
  specialties?: string[];
  yearsOfExperience: number;
}

const mockAgents: Agent[] = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Real Estate Agent',
    phone: '+506 8831-2222',
    email: 'john@remax-blueocean.com',
    imageUrl: '/images/agents/agent1.jpg',
    office: 'blue-ocean',
    languages: ['English', 'Spanish'],
    specialties: ['Luxury Properties', 'Beachfront', 'Investment'],
    yearsOfExperience: 8
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'Luxury Property Specialist',
    phone: '+506 8831-2223',
    email: 'jane@remax-blueocean.com',
    imageUrl: '/images/agents/agent2.jpg',
    office: 'azura',
    languages: ['English', 'Spanish', 'German'],
    specialties: ['Luxury Villas', 'Eco-Properties', 'Vacation Homes'],
    yearsOfExperience: 12
  },
  {
    id: 3,
    name: 'Carlos Rodriguez',
    title: 'Senior Property Consultant',
    phone: '+506 8831-2224',
    email: 'carlos@remax-blueocean.com',
    imageUrl: '/images/agents/agent3.jpg',
    office: 'blue-ocean',
    languages: ['Spanish', 'English', 'French'],
    specialties: ['Land Development', 'Commercial', 'Investment'],
    yearsOfExperience: 15
  }
];

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call when backend is ready
        // const response = await fetch('https://remax-cca.com/api/v1/associates/take/6/skip/0', {
        //   headers: {
        //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_REI_API_KEY}`,
        //     'Content-Type': 'application/json',
        //   },
        // });
        // const data = await response.json();
        // setAgents(data);
        
        // Mock data for development
        setTimeout(() => {
          setAgents(mockAgents);
          setLoading(false);
        }, 500);
        
      } catch (err) {
        console.error('Error fetching agents data:', err);
        setError('Failed to load agent data. Please try again later.');
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-red-500">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Local Experts</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our agents from RE/MAX Blue Ocean (Nosara) and RE/MAX Azura (Sámara) are real estate professionals with unmatched regional knowledge and integrity.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-64 bg-gray-200 relative">
                  {agent.imageUrl ? (
                    <Image
                      src={agent.imageUrl}
                      alt={agent.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      {agent.name}&apos;s Photo
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        agent.office === 'blue-ocean' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {agent.office === 'blue-ocean' ? 'RE/MAX Blue Ocean' : 'RE/MAX Azura'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                  <p className="text-primary-600 mb-2">{agent.title}</p>
                  <p className="text-sm text-gray-500 mb-4">{agent.yearsOfExperience}+ years of experience</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${agent.phone.replace(/\D/g, '')}`} className="hover:text-primary-700">
                        {agent.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${agent.email}`} className="hover:text-primary-700">
                        {agent.email}
                      </a>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link 
                      href={`/agents/${agent.id}`} 
                      className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            href="/agents" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Meet Our Full Team
          </Link>
        </div>
      </div>
    </section>
  );
}
