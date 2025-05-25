import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaHandshake, FaChartLine, FaBalanceScale, FaExchangeAlt } from 'react-icons/fa';

export default function AboutUsPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            About Us Hero Image
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Your Trusted Nosara & Sámara Costa Rica Real Estate
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-8">
              Are you looking for the ideal piece of paradise in Nosara, Costa Rica? There is no need to look any further! 
              At RE/MAX Blue Ocean, we take pride in being the leading real estate experts in the enchanting Guanacaste region. 
              RE/MAX Blue Ocean is your unwavering partner in finding, negotiating, and securing the property of your dreams, 
              thanks to our dedicated team of experienced Nosara Costa Rica real estate agents.
            </p>
          </div>
        </div>
      </section>

      {/* Local Expertise Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center text-gray-500">
                [Team Photo Placeholder]
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose RE/MAX Blue Ocean?
              </h2>
              <h3 className="text-xl font-semibold text-primary-600 mb-4">
                Nosara Costa Rica Real Estate Agents With Local Knowledge
              </h3>
              <p className="text-gray-700 mb-4">
                Nosara, Costa Rica is more than just a destination; it&apos;s a way of life. Our agents are deeply rooted in the 
                community and have in-depth knowledge of the local real estate market. We have insider knowledge of all the 
                hidden gems that Nosara has to offer, from beachfront bungalows to hidden jungle retreats.
              </p>
              <p className="text-gray-700">
                We understand that your real estate requirements are as unique as you are. Our Nosara Costa Rica real estate 
                agents take the time to listen to your wants, budget, and preferences, ensuring that every property we present 
                is a perfect fit for your vision. There will be no cookie-cutter solutions, only personalized experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Connections & Value Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center text-gray-500 mb-12">
              [Community or Client Success Image Placeholder]
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Global Connections & Value</h2>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-semibold text-primary-600 mb-4 flex items-center">
                  <FaHandshake className="mr-2" />
                  Connections Network
                </h3>
                <p className="text-gray-700">
                  Over the years, we have developed strong relationships within the Nosara community, including with developers, 
                  sellers, and fellow agents. Our extensive global network spans 110 countries, connecting you with buyers and sellers 
                  from all over the world. This unrivaled reach means more exposure for your property or a broader range of options 
                  if you&apos;re looking to buy.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-primary-600 mb-4 flex items-center">
                  <FaChartLine className="mr-2" />
                  Experience with a Proven Track Record
                </h3>
                <p className="text-gray-700">
                  Our agents have a proven track record of closing deals and keeping clients happy. We understand the intricacies 
                  of the Nosara real estate market and can walk you through every step of the process, ensuring your investment is 
                  secure and your experience is seamless.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-primary-600 mb-4 flex items-center">
                  <FaBalanceScale className="mr-2" />
                  Negotiation Mastery
                </h3>
                <p className="text-gray-700">
                  Our agents are tenacious advocates for your best interests during negotiations. With a history of successful 
                  transactions, we understand how to secure the best terms and prices. Our ultimate goal is your satisfaction.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-primary-600 mb-4 flex items-center">
                  <FaExchangeAlt className="mr-2" />
                  Smooth Transactions
                </h3>
                <p className="text-gray-700">
                  Navigating the world of real estate, especially in a foreign country, can be complex. Our team is well-versed 
                  in Costa Rica&apos;s legalities, regulations, and documentation requirements. We streamline the process to make your 
                  buying or selling journey efficient and stress-free.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-800 italic mb-4">
                  We are not just real estate agents; we are passionate advocates for the beauty and lifestyle that Nosara has to offer. 
                  Whether it&apos;s surfing along pristine beaches, exploring lush jungles, or embracing the vibrant culture, we understand 
                  the essence of living in this captivating region.
                </p>
                <p className="text-xl font-semibold text-gray-900 mb-4">
                  Your Blue Ocean journey begins here.
                </p>
                <p className="text-gray-700">
                  With the dedicated assistance of RE/MAX Blue Ocean, embrace the promise of paradise in Nosara, Costa Rica. We are 
                  committed to turning your real estate goals into reality. Let us guide you in discovering your perfect piece of heaven.
                </p>
                <p className="mt-4 font-medium text-gray-900">
                  Don&apos;t just buy a house; invest in a way of life.
                </p>
                <p className="text-lg font-bold text-primary-600 mt-2">
                  Contact RE/MAX Blue Ocean today. Your dream home is waiting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Office Locations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Office Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                Office 1 Image
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">RE/MAX Blue Ocean Azura | Sales Office</h3>
                <div className="flex items-start mb-3">
                  <FaMapMarkerAlt className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">VFCV+V2, Del Centro de playa Samara 3 kilometros sobre carretera hacia playa Carrillo, Provincia de Guanacaste, Sámara</p>
                </div>
                <div className="flex items-center mb-2">
                  <FaPhone className="text-primary-600 mr-2" />
                  <a href="tel:+50685312222" className="text-gray-700 hover:text-primary-600">+506 8531-2222</a>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-primary-600 mr-2" />
                  <a href="mailto:azura@remax-blueocean.com" className="text-gray-700 hover:text-primary-600">azura@remax-blueocean.com</a>
                </div>
              </div>
            </div>
            
            {/* Office Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                Office 2 Image
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">RE/MAX Azura | Samara Real Estate Agency</h3>
                <div className="flex items-start mb-3">
                  <FaMapMarkerAlt className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">Playa Sámara, de Patio Colonial, Calle Principal Local #3, Provincia de Guanacaste</p>
                </div>
                <div className="flex items-center mb-2">
                  <FaPhone className="text-primary-600 mr-2" />
                  <a href="tel:+50685312222" className="text-gray-700 hover:text-primary-600">+506 8531-2222</a>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-primary-600 mr-2" />
                  <a href="mailto:samara@remax-blueocean.com" className="text-gray-700 hover:text-primary-600">samara@remax-blueocean.com</a>
                </div>
              </div>
            </div>
            
            {/* Office Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                Office 3 Image
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">RE/MAX Blue Ocean | Nosara Real Estate Agency</h3>
                <div className="flex items-start mb-3">
                  <FaMapMarkerAlt className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">Playa Guiones, 150 mts oeste de Café París, local #5, Provincia de Guanacaste, Nosara, 50206</p>
                </div>
                <div className="flex items-center mb-2">
                  <FaPhone className="text-primary-600 mr-2" />
                  <a href="tel:+50685312222" className="text-gray-700 hover:text-primary-600">+506 8531-2222</a>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-primary-600 mr-2" />
                  <a href="mailto:info@remax-blueocean.com" className="text-gray-700 hover:text-primary-600">info@remax-blueocean.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get to Know the Team Behind the Brand!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the local experts who will guide you through every step of your real estate journey in Nosara and Sámara.
          </p>
          <Link 
            href="/about/agents"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Meet Our Agents
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
