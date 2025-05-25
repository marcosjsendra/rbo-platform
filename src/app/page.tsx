import MainLayout from '@/components/layout/MainLayout';
import RegionalZones from '@/components/home/RegionalZones';
import Agents from '@/components/home/Agents';
import BlogSection from '@/components/home/BlogSection';
import FeaturedListings from '@/components/home/FeaturedListings';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            Hero Background Image
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              RE/MAX – The #1 Name in Real Estate Worldwide
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-300 mb-8">
              Serving Nosara & Sámara, Costa Rica
            </h2>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-xl p-4 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="location" className="sr-only">Location</label>
                  <select 
                    id="location" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                  >
                    <option value="">All Locations</option>
                    <option value="nosara">Nosara</option>
                    <option value="samara">Sámara</option>
                    <option value="puntal-islita">Punta Islita</option>
                    <option value="playa-marbella">Playa Marbella</option>
                    <option value="puerto-carrillo">Puerto Carrillo</option>
                    <option value="playa-ostional">Playa Ostional</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="property-type" className="sr-only">Property Type</label>
                  <select 
                    id="property-type" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                  >
                    <option value="">All Property Types</option>
                    <option value="house">Houses</option>
                    <option value="condo">Condos</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div className="w-full md:w-auto">
                  <button 
                    type="button" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Search Properties
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <FeaturedListings />

      <RegionalZones />
      <Agents />
      <BlogSection />
    </MainLayout>
  );
}
