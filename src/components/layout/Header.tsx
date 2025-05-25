import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-md">
      {/* Test Environment Links */}
      <div className="bg-red-600 px-4 py-2 flex justify-center">
        <Link 
          href="/api-test"
          className="text-xs font-medium text-white hover:text-gray-200 transition-colors"
        >
          API Test Page
        </Link>
      </div>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/remax-logo.svg" 
              alt="RE/MAX Blue Ocean" 
              width={150} 
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <Link href="/about-us" className="text-xs font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/services" className="text-xs font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link href="/blue-zone" className="text-xs font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 transition-colors">
              Blue Zone
            </Link>

            <Link href="/team" className="text-xs font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 transition-colors">
              THE TEAM
            </Link>

            {/* Action Buttons */}
            <div className="ml-4 flex space-x-3">
              <Link 
                href="/contact-us"
                className="text-xs font-medium uppercase tracking-wide border border-blue-600 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
              >
                CONTACT US
              </Link>
              <a 
                href="https://remax-cca.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-wide bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
              >
                OUR PROPERTIES
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/about-us" className="block px-3 py-1.5 text-2xs font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
            About
          </Link>
          <Link href="/services" className="block px-3 py-1.5 text-2xs font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
            Services
          </Link>
          <Link href="/blue-zone" className="block px-3 py-1.5 text-2xs font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
            Blue Zone
          </Link>
          <Link href="/team" className="block px-3 py-1.5 text-3xs font-medium uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
            THE TEAM
          </Link>
          <div className="px-3 py-2 flex space-x-2">
            <button className="text-3xs font-medium uppercase tracking-wide text-gray-700 border border-gray-300 px-2 py-0.5 rounded-md hover:bg-gray-50 transition-colors">
              ES
            </button>
            <button className="text-3xs font-medium uppercase tracking-wide text-blue-600 border border-blue-600 px-2 py-0.5 rounded-md hover:bg-blue-50 transition-colors">
              EN
            </button>
          </div>
          <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
            <Link 
              href="/contact-us"
              className="block w-full text-center text-xs font-medium uppercase tracking-wide border border-blue-600 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
            >
              CONTACT US
            </Link>
            <a 
              href="https://remax-cca.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center text-xs font-medium uppercase tracking-wide bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
            >
              OUR PROPERTIES
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
