import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { FaHandshake, FaSearch, FaGlobe, FaBalanceScale, FaHome, FaTools, FaUsers } from 'react-icons/fa';

export default function ServicesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            Services Hero Image
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Services We Offer
            </h1>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-8">
              RE/MAX Blue Ocean Real Estate services in Nosara and Sámara, Costa Rica, are reliable partners in achieving your real estate goals in this tropical paradise. 
              Our experienced team of specialists is committed to offering a full suite of services to ensure a smooth real estate transaction and your peace of mind throughout.
            </p>
          </div>
        </div>
      </section>

      {/* Trusted Partner Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center text-gray-500">
                [Trusted Partner Image]
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Trusted Partner in Real Estate
              </h2>
              <p className="text-gray-700 mb-4">
                Whether you are purchasing your ideal home, an investment property, or selling to maximize your investment, 
                our team is here to help you every step of the way. Here are some of the benefits included in our agents&apos; expert service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Core Services
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full text-blue-600">
                    <FaSearch className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Local Market Expertise</h3>
                    <p className="mt-2 text-gray-600">
                      Our expert agents specialize in the thriving markets of Sámara and Nosara, with extensive knowledge of the local real estate environment. 
                      Understanding the complexities of the local market enables our agents to offer clients relevant counsel tailored to their individual requirements.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full text-blue-600">
                    <FaGlobe className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Global Marketing Exposure</h3>
                    <p className="mt-2 text-gray-600">
                      Using the RE/MAX Global Network, we provide unequaled marketing exposure for your property, ensuring it reaches a diverse 
                      and international audience through platforms like remax-costa-rica.com, global.remax.com, and realtor.com.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Specialized Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <FaHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Negotiation Expertise</h3>
              <p className="text-gray-600">
                Our expert negotiators work relentlessly to get the best offers for our clients. Whether you are buying or selling, 
                we endeavor to produce ideal results that align with your objectives.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <FaHome className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Evaluation</h3>
              <p className="text-gray-600">
                We provide precise property evaluations by combining market knowledge and industry expertise. This ensures you understand 
                the true market value of your property or the property you&apos;re interested in.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <FaBalanceScale className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Due Diligence</h3>
              <p className="text-gray-600">
                We perform rigorous due diligence to identify and handle any potential issues, giving you confidence in your investment. 
                Our escrow services ensure secure and transparent financial transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Beyond the Purchase or Sale
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full text-blue-600">
                    <FaUsers className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Legal &amp; Immigration Support</h3>
                    <p className="mt-2 text-gray-600">
                      Our professional legal team, including immigration experts, is available to assist expats moving to Costa Rica. 
                      With our help, you can confidently and smoothly settle into your new life.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full text-blue-600">
                    <FaTools className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Construction Connections</h3>
                    <p className="mt-2 text-gray-600">
                      We&apos;ve built strong relationships with respected building companies and developers in the region. Whether you&apos;re 
                      planning to build your dream home or renovate an existing one, we connect you with trusted professionals.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center text-gray-500">
                [Extended Services Image]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Real Estate Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to learn more about our complete service offering and start your real estate journey in Nosara and Sámara.
          </p>
          <Link 
            href="/contact-us" 
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
