'use client';

import MainLayout from '@/components/layout/MainLayout';
import RegionalZones from '@/components/home/RegionalZones';
import Agents from '@/components/home/Agents';
import BlogSection from '@/components/home/BlogSection';
import FeaturedListings from '@/components/home/FeaturedListings';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiSearch, FiMapPin, FiHome } from 'react-icons/fi';

export default function Home() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white min-h-[90vh] flex items-center py-16 md:py-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Replace with actual image when available */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10 z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/30 to-transparent z-0"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-600/20 to-transparent z-0 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">RE/MAX</span> – The #1 Name in Real Estate Worldwide
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-8">
                Serving <span className="text-white">Nosara</span> & <span className="text-white">Sámara</span>, Costa Rica
              </h2>
            </motion.div>
            
            {/* Search Bar */}
            <motion.div 
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 max-w-3xl mx-auto border border-white/10"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <FiMapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <label htmlFor="location" className="absolute -top-2 left-2 px-1 text-xs font-medium text-blue-300 bg-white/10 rounded">
                    Location
                  </label>
                  <select 
                    id="location" 
                    className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white cursor-pointer
                    [&:not([size])]:bg-none [&:not([size])]:border-none
                    [&:not([size])]:focus:outline-none [&:not([size])]:focus:ring-2
                    [&_option]:bg-gray-800 [&_option]:text-white [&_option]:py-2 [&_option]:px-4
                    [&_option:hover]:bg-blue-500 [&_option:hover]:text-white
                    [&_option:checked]:bg-blue-500 [&_option:checked]:text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">All Locations</option>
                    <option value="nosara" className="bg-gray-800 text-white">Nosara</option>
                    <option value="samara" className="bg-gray-800 text-white">Sámara</option>
                    <option value="puntal-islita" className="bg-gray-800 text-white">Punta Islita</option>
                    <option value="playa-marbella" className="bg-gray-800 text-white">Playa Marbella</option>
                    <option value="puerto-carrillo" className="bg-gray-800 text-white">Puerto Carrillo</option>
                    <option value="playa-ostional" className="bg-gray-800 text-white">Playa Ostional</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-4 w-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <FiHome className="h-5 w-5 text-blue-500" />
                  </div>
                  <label htmlFor="property-type" className="absolute -top-2 left-2 px-1 text-xs font-medium text-blue-300 bg-white/10 rounded">
                    Property Type
                  </label>
                  <select 
                    id="property-type" 
                    className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white cursor-pointer
                    [&:not([size])]:bg-none [&:not([size])]:border-none
                    [&:not([size])]:focus:outline-none [&:not([size])]:focus:ring-2
                    [&_option]:bg-gray-800 [&_option]:text-white [&_option]:py-2 [&_option]:px-4
                    [&_option:hover]:bg-blue-500 [&_option:hover]:text-white
                    [&_option:checked]:bg-blue-500 [&_option:checked]:text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">All Property Types</option>
                    <option value="house" className="bg-gray-800 text-white">Houses</option>
                    <option value="condo" className="bg-gray-800 text-white">Condos</option>
                    <option value="land" className="bg-gray-800 text-white">Land</option>
                    <option value="commercial" className="bg-gray-800 text-white">Commercial</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-4 w-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="w-full md:w-auto">
                  <button 
                    type="button" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 group"
                  >
                    <FiSearch className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center gap-4">
                <div className="flex items-center">
                  <input type="checkbox" id="for-sale" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <label htmlFor="for-sale" className="ml-2 text-sm text-gray-200">For Sale</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="for-rent" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <label htmlFor="for-rent" className="ml-2 text-sm text-gray-200">For Rent</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="new-developments" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <label htmlFor="new-developments" className="ml-2 text-sm text-gray-200">New Developments</label>
                </div>
              </div>
            </motion.div>
            
            {/* Statistics */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
            >
              {[
                { number: '20+', label: 'Years Experience' },
                { number: '500+', label: 'Properties Sold' },
                { number: '100%', label: 'Client Satisfaction' },
                { number: '24/7', label: 'Support Available' }
              ].map((stat, index) => (
                <div key={index} className="text-center px-6 py-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-3xl font-bold text-blue-400">{stat.number}</p>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-1"
          >
            <motion.div 
              animate={{ height: ['30%', '60%', '30%'] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 bg-blue-400 rounded-full"
            />
          </motion.div>
          <p className="mt-2 text-xs text-gray-400">Scroll to explore</p>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
        <FeaturedListings />
      </section>

      <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] opacity-5"></div>
        <RegionalZones />
      </section>
      
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl -ml-48 -mt-48"></div>
        <Agents />
      </section>
      
      <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] opacity-5"></div>
        <BlogSection />
      </section>
    </MainLayout>
  );
}
