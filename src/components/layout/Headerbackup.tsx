import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Import icons for enhanced visual elements
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="w-full z-50 bg-white shadow-md">
      {/* Test Environment Links */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 flex justify-center">
        <Link 
          href="/api-test"
          className="text-xs font-medium text-white hover:text-gray-200 transition-colors flex items-center gap-1"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse mr-1"></span>
          API Test Page
        </Link>
      </div>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image 
                  src="/images/remax-logo.svg" 
                  alt="RE/MAX Blue Ocean" 
                  width={150} 
                  height={50}
                  className="h-12 w-auto"
                  priority
                />
              </motion.div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Navigation Links */}
            <Link href="/about-us" className="group relative text-sm font-medium uppercase tracking-wide text-gray-700 transition-colors duration-300 hover:text-blue-600">
              <span>About</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/services" className="group relative text-sm font-medium uppercase tracking-wide text-gray-700 transition-colors duration-300 hover:text-blue-600">
              <span>Services</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/blue-zone" className="group relative text-sm font-medium uppercase tracking-wide text-gray-700 transition-colors duration-300 hover:text-blue-600">
              <span>Blue Zone</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/team" className="group relative text-sm font-medium uppercase tracking-wide text-gray-700 transition-colors duration-300 hover:text-blue-600">
              <span>The Team</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Action Buttons */}
            <div className="ml-6 flex space-x-4">
              <Link 
                href="/contact-us"
                className="text-sm font-medium uppercase tracking-wide border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300 hover:shadow-md"
              >
                Contact Us
              </Link>
              <a 
                href="https://remax-cca.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-sm font-medium uppercase tracking-wide bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 h-10 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-md"
              >
                Our Properties
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6 text-blue-600" />
            ) : (
              <FiMenu className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link href="/about-us" className="block px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  About
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/services" className="block px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  Services
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/blue-zone" className="block px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  Blue Zone
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/team" className="block px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  The Team
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="px-3 py-2 flex space-x-3"
              >
                <button className="text-xs font-medium uppercase tracking-wide text-gray-700 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50 transition-all duration-200">
                  ES
                </button>
                <button className="text-xs font-medium uppercase tracking-wide text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition-all duration-200">
                  EN
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4 pb-2 border-t border-gray-200 space-y-3"
              >
                <Link 
                  href="/contact-us"
                  className="block w-full text-center text-sm font-medium uppercase tracking-wide border-2 border-blue-600 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  Contact Us
                </Link>
                <a 
                  href="https://remax-cca.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center text-sm font-medium uppercase tracking-wide bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  Our Properties
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
