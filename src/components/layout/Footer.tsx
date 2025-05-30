import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaWhatsapp, FaYoutube, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-600/5 -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-600/5 -ml-32 -mb-32 blur-3xl"></div>
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-blue-600/10 blur-xl"></div>
            <h3 className="text-xl font-bold mb-5 inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">About Us</span>
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              At RE/MAX Blue Ocean, we blend coastal living with real estate excellence and environmental stewardship, 
              curating a modern and sustainable lifestyle experience.
            </p>
            <div className="flex items-center space-x-5 mt-6">
              <a 
                href="https://facebook.com/remaxblueocean" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              <a 
                href="https://wa.me/50688312222" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-green-400 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a 
                href="https://www.youtube.com/@REMAX-BlueOcean-CR" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-red-400 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="YouTube"
              >
                <FaYoutube className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com/remaxblueocean" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-pink-400 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-blue-600/10 blur-xl"></div>
            <h3 className="text-xl font-bold mb-5 inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Quick Links</span>
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/listings', label: 'All Listings' },
                { href: '/luxury-collection', label: 'Luxury Collection' },
                { href: '/about-us', label: 'About Us' },
                { href: '/about/agents', label: 'Meet Our Agents' },
                { href: '/services', label: 'Our Services' },
                { href: '/blue-zone', label: 'Costa Rica Blue Zone' },
                { href: 'https://blog.remax-blueocean.com', label: 'Blog', external: true }
              ].map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (index * 0.05) }}
                  className="transform transition-all duration-200 hover:translate-x-1"
                >
                  {link.external ? (
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 group flex items-center"
                    >
                      <span className="mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-blue-600/10 blur-xl"></div>
            <h3 className="text-xl font-bold mb-5 inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Contact Us</span>
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-4">
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-start group"
              >
                <div className="p-2 rounded-full bg-blue-600/10 mr-3 group-hover:bg-blue-600/20 transition-colors duration-300">
                  <FaPhone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                </div>
                <a 
                  href="tel:+50688312222" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 mt-1"
                >
                  +506 8831-2222
                </a>
              </motion.li>
              
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start group"
              >
                <div className="p-2 rounded-full bg-blue-600/10 mr-3 group-hover:bg-blue-600/20 transition-colors duration-300">
                  <FaEnvelope className="h-4 w-4 text-blue-400 flex-shrink-0" />
                </div>
                <a 
                  href="mailto:info@remax-blueocean.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 mt-1"
                >
                  info@remax-blueocean.com
                </a>
              </motion.li>
              
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="flex items-start group"
              >
                <div className="p-2 rounded-full bg-blue-600/10 mr-3 group-hover:bg-blue-600/20 transition-colors duration-300">
                  <FaMapMarkerAlt className="h-4 w-4 text-blue-400 flex-shrink-0" />
                </div>
                <span className="text-gray-300 mt-1">Nosara & Sámara, Costa Rica</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-blue-600/10 blur-xl"></div>
            <h3 className="text-xl font-bold mb-5 inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Newsletter</span>
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <p className="text-gray-300 mb-5 leading-relaxed">
              Subscribe to get updates on new listings and real estate news.
            </p>
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-600/20 text-green-400 p-3 rounded-lg mb-4 text-center"
              >
                Thank you for subscribing!
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex overflow-hidden rounded-lg shadow-sm bg-white/5 backdrop-blur-sm border border-white/10 p-1">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 w-full bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-0"
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                  >
                    {isSubmitting ? (
                      <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                    ) : 'Subscribe'}
                  </button>
                </div>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-70"></div>
              </form>
            )}
            
            {/* Privacy note */}
            <p className="text-gray-500 text-xs mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 pt-8 mt-12 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} <span className="text-blue-400">RE/MAX Blue Ocean</span>. All rights reserved. Each office independently owned and operated.
              </p>
            </div>
            <div className="flex space-x-8">
              <Link 
                href="/privacy-policy" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 relative group"
              >
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 relative group"
              >
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/sitemap" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 relative group"
              >
                Sitemap
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
