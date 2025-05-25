import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function BlueZonePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            [Hero Image of Nicoya Peninsula]
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              COSTA RICA&apos;S RICH BLUE ZONE OF NICOYA
            </h1>
          </div>
        </div>
      </section>

      {/* Understanding Blue Zones Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Blue Zones</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                In a society where longevity and well-being are so important, the concept of Blue Zones has piqued the interest of many. 
                Blue Zones are locations around the world that have been found to be home to an unusually high number of centenarians—individuals 
                living at least 100 years.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                In these areas, people live much longer, healthier lives than the global norm. Researchers have conducted substantial research 
                in these areas in order to uncover the secrets of longevity and well-being. The Costa Rica Blue Zone is found in the 
                Nicoya Peninsula, home to RE/MAX Blue Ocean.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Map of All the World&apos;s Blue Zones</h3>
              <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
                <Image 
                  src="https://www.remax-blueocean.com/wp-content/uploads/2024/04/REMAX-BLUE-OCEAN-BLOG-BANNER-18.jpg" 
                  alt="World's Blue Zones Map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Blue Zones Special */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Makes Blue Zones so Appealing to Live In?</h2>
              <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8 flex items-center justify-center text-gray-500">
                [Lifestyle Image Placeholder]
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Blue Zones have a unique attractiveness for individuals seeking a life full of vitality, purpose, and connection. 
                Among the world&apos;s Blue Zones, Costa Rica&apos;s Nicoya Peninsula stands out as a symbol of health, longevity, and the pura vida lifestyle. 
                Here&apos;s why.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blue Zone Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">The Benefits of Blue Zone Living</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="relative w-full aspect-video bg-gray-100">
                <Image 
                  src="https://www.remax-blueocean.com/wp-content/uploads/2024/04/10.jpg" 
                  alt="Nutritious Diet"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Nutritious Diet</h3>
                <p className="text-gray-600">
                  Costa Rica Blue Zone residents consume a traditional diet high in fruits, vegetables, and grains, which contains 
                  critical nutrients and antioxidants that promote longevity and well-being. Meals celebrate nature&apos;s richness by 
                  highlighting fresh, locally sourced foods.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="relative w-full aspect-video bg-gray-100">
                <Image 
                  src="https://www.remax-blueocean.com/wp-content/uploads/2024/04/12.jpg" 
                  alt="Physical Activity"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Physical Activity</h3>
                <p className="text-gray-600">
                  Nicoya Peninsula residents prioritize physical activity, including walking, gardening, and communal service. 
                  The region&apos;s natural beauty offers many options for outdoor activity, from surfing to hiking.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="relative w-full aspect-video bg-gray-100">
                <Image 
                  src="https://www.remax-blueocean.com/wp-content/uploads/2024/04/11.jpg" 
                  alt="Natural Environment"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Environment</h3>
                <p className="text-gray-600">
                  The Nicoya Peninsula&apos;s beaches, coastlines, and calm mountains create a serene setting for healthy living. 
                  Access to outdoor spaces encourages movement, relaxation, and a strong connection with nature.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="relative w-full aspect-video bg-gray-100">
                <Image 
                  src="https://www.remax-blueocean.com/wp-content/uploads/2024/04/9.jpg" 
                  alt="Community"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600">
                  Nicoya&apos;s close-knit communities foster strong social relationships and a sense of belonging. 
                  Neighbors support one another, share meals, and celebrate milestones together.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="relative w-full aspect-video bg-gray-100">
                <Image 
                  src="https://www.remax-blueocean.com/wp-content/uploads/2024/04/8.jpg" 
                  alt="Slower Pace of Life"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Slower Pace of Life and Stress Reduction</h3>
                <p className="text-gray-600">
                  Nicoyans enjoy a slower pace of life, allowing them to focus on what matters most. 
                  The relaxed environment encourages mental and emotional well-being.
                </p>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden p-6 md:col-span-2 lg:col-span-3 border border-blue-100">
              <p className="text-lg text-gray-800">
                Finally, Blue Zones provide a roadmap for living a healthy, vital, and fulfilling life. Costa Rica&apos;s 
                Nicoya Peninsula embodies the best of Blue Zone living—nutritious cuisine, active lifestyle, natural 
                beauty, community connection, and peace of mind. Whether you&apos;re looking for longevity, happiness, or a 
                deeper connection to life, Nicoya invites you to embrace the pura vida lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Make the Costa Rica Blue Zone Your Home</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            If you&apos;re drawn to the appeal of Blue Zone living and the picturesque lifestyle offered by the Nicoya Peninsula, 
            why not consider making this paradise your home?
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            The Nicoya Peninsula, with its gorgeous beaches, dynamic villages, and devotion to health and well-being, 
            provides an unequaled opportunity to live a fulfilling and vital life.
          </p>
          <Link 
            href="/contact-us" 
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact RE/MAX Blue Ocean Today
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
