import MainLayout from '@/components/layout/MainLayout';

export default function ContactUsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 z-10" />
          <div className="absolute inset-0 bg-[url('/images/contact-hero.jpg')] bg-cover bg-center" />
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact RE/MAX Blue Ocean
            </h1>
          </div>
        </div>

        {/* Nosara Office Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Nosara Office</h2>
              <p className="text-gray-700 mb-4">
                Playa Guiones (Nosara), 150 mts oeste de Café París, local #5, Provincia de Guanacaste
              </p>
              <a 
                href="https://www.google.com/maps/place/RE%2FMAX+Blue+Ocean/@9.9452578,-85.6677302,1154m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8f9e55932a372feb:0x988576195d458d4b!8m2!3d9.9452578!4d-85.6651553!16s%2Fg%2F11l1j1397h?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <span>View on Map</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Samara Office Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Sámara Office</h2>
              <p className="text-gray-700 mb-4">
                Playa Sámara, de Patio Colonial, Calle Principal Local #3, Provincia de Guanacaste
              </p>
              <a 
                href="https://www.google.com/maps/place/RE%2FMAX+Blue+Ocean+Samara/@9.8836914,-85.5282994,289m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8f9faba751aa06b7:0x63e9db5edf91587e!8m2!3d9.8836914!4d-85.5276557!16s%2Fg%2F11mcjr4dfp?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <span>View on Map</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Interested in learning more information?</h2>
              <p className="text-gray-600">
                Fill out the contact form below, and we will get back to you as soon as possible!
              </p>
            </div>
            
            <form className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Your Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div className="mt-6 flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="gdpr-consent"
                    name="gdpr-consent"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="gdpr-consent" className="font-medium text-gray-700">
                    I consent to the GDPR Terms
                  </label>
                  <p className="text-gray-500">We&apos;ll only use your information to respond to your inquiry.</p>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>


      </div>
    </MainLayout>
  );
}
