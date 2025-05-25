import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

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

export default function TeamPage() {
  // TODO: Replace with actual API call when backend is ready
  // const { data: agents, isLoading, error } = useFetchAgents();
  
  // Mock data for development
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
      languages: ['Spanish', 'English'],
      specialties: ['Commercial', 'Land', 'Development'],
      yearsOfExperience: 15
    }
  ];
  
  const agents = mockAgents; // Replace with actual data when API is ready
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 z-10" />
        <Image
          src="/images/team/team-hero.jpg"
          alt="RE/MAX Blue Ocean Team"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            RE/MAX Blue Ocean Team: Real Estate Agents You Can Trust
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="prose lg:prose-xl mx-auto text-gray-700">
          <p className="text-lg leading-relaxed">
            Choosing a real estate agent in the Sámara or Nosara area for this important journey is more than a decision; it is a collaboration with seasoned experts who bring a wealth of experience, local knowledge, and unwavering dedication to your doorway.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            RE/MAX Blue Ocean agents stand out for their in-depth knowledge of the country&apos;s distinct and diverse real estate market, providing insights that go beyond the surface. They don&apos;t just handle transactions; they design experiences that are targeted to your specific needs, ensuring that you take each step with confidence and clarity. Thanks to RE/MAX&apos;s commitment to excellence and powerful global network, you may have access to a wealth of information as well as a number of resources that will make your real estate experience successful and easy.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
            The RE/MAX Difference: Why Choose RE/MAX Blue Ocean Agents in Samara and Nosara?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Local Expertise",
                description: "RE/MAX Blue Ocean agents in Samara and Nosara are seasoned experts who understand the local real estate market. Their expertise goes beyond property listings to include local insights, market trends, and regional legal subtleties."
              },
              {
                title: "Global Reach",
                description: "As a member of the prestigious RE/MAX network, RE/MAX Blue Ocean ensures maximum exposure for your property. Whether you're buying or selling, our agents use their extensive network of resources and connections to match you with eligible buyers or exclusive listings."
              },
              {
                title: "Most-Trusted Network",
                description: "RE/MAX Blue Ocean is well-known in the Samara and Nosara real estate sectors for its trustworthiness and integrity. With a proven track record of success and a dedication to client pleasure, our agency is the first choice for buyers and sellers looking for dependable and professional counsel."
              },
              {
                title: "Personalized Service",
                description: "RE/MAX Blue Ocean recognizes that each customer is unique; therefore, we tailor our services to your exact needs and preferences. Whether you're a first-time homeowner or a seasoned investor, our professionals offer attentive direction and support throughout the real estate process."
              },
              {
                title: "Exceptional Results",
                description: "With RE/MAX Blue Ocean, you can expect nothing less than the best. Our agents are committed to delivering great outcomes, whether it's negotiating the best possible price for your house or assisting you in finding your ideal home. Trust us to exceed your expectations and help you achieve your real estate goals."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Our Team of Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64 w-full bg-gray-100">
                  {agent.imageUrl ? (
                    <Image
                      src={agent.imageUrl}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{agent.name}</h3>
                  <p className="text-blue-600 mb-3">{agent.title}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="font-medium">Experience:</span>
                      <span className="ml-2">{agent.yearsOfExperience} years</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="font-medium">Languages:</span>
                      <span className="ml-2">{agent.languages.join(', ')}</span>
                    </div>
                    {agent.specialties && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {agent.specialties.map((specialty, idx) => (
                            <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
            Need more than just an agent?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Explore our full range of services to see how RE/MAX Blue Ocean supports you from start to finish.
          </p>
          <Link 
            href="/services" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Explore Our Services
          </Link>
        </div>
      </section>
      </div>
    </MainLayout>
  );
};
