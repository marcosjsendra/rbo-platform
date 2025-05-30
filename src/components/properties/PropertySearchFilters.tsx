'use client';

/**
 * src/components/properties/PropertySearchFilters.tsx
 * 
 * Property search and filtering component
 * Provides UI for searching and filtering properties
 */

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropertyFilterOptions } from '@/lib/data';

// Define the props interface for the PropertySearchFilters component
interface PropertySearchFiltersProps {
  propertyTypes: string[];
  locations: string[];
  onFilterChange?: (filters: PropertyFilterOptions) => void;
  className?: string;
}

/**
 * PropertySearchFilters component
 * 
 * Provides UI for searching and filtering properties
 * Includes filters for price range, bedrooms, bathrooms, property type, and location
 * 
 * @param props - Property search filters properties
 * @returns Property search filters component
 */
export default function PropertySearchFilters({
  propertyTypes = [],
  locations = [],
  onFilterChange,
  className = ''
}: PropertySearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL parameters
  const [filters, setFilters] = useState<PropertyFilterOptions>({
    brand: searchParams.get('brand') as 'AZURA' | 'BLUE_OCEAN' || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
    bathrooms: searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : undefined,
    propertyType: searchParams.get('propertyType') || undefined,
    location: searchParams.get('location') || undefined,
    searchTerm: searchParams.get('q') || undefined
  });
  
  // State for search input
  const [searchInput, setSearchInput] = useState(filters.searchTerm || '');
  
  // State for mobile filter visibility
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Effect to update URL when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
    
    // Update URL parameters
    const params = new URLSearchParams();
    
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms.toString());
    if (filters.bathrooms) params.set('bathrooms', filters.bathrooms.toString());
    if (filters.propertyType) params.set('propertyType', filters.propertyType);
    if (filters.location) params.set('location', filters.location);
    if (filters.searchTerm) params.set('q', filters.searchTerm);
    
    const queryString = params.toString();
    
    // Update URL without refreshing the page
    const url = queryString ? `?${queryString}` : '';
    router.push(url, { scroll: false });
  }, [filters, onFilterChange, router]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchTerm: searchInput }));
  };
  
  // Handle filter changes
  const handleFilterChange = (name: keyof PropertyFilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle clearing all filters
  const handleClearFilters = () => {
    setFilters({});
    setSearchInput('');
  };
  
  // Count active filters
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {/* Search form */}
      <form onSubmit={handleSearchSubmit} className="p-4 border-b border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
      
      {/* Mobile filter toggle */}
      <div className="lg:hidden p-4 border-b border-gray-100">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium text-gray-900">
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${mobileFiltersOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Filters */}
      <div className={`lg:flex ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          {/* Brand filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              value={filters.brand || ''}
              onChange={(e) => handleFilterChange('brand', e.target.value || undefined)}
              className="w-full p-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            >
              <option value="">All Brands</option>
              <option value="AZURA">RE/MAX AZURA</option>
              <option value="BLUE_OCEAN">RE/MAX BLUE OCEAN</option>
            </select>
          </div>
          
          {/* Price range filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>
          
          {/* Bedrooms and bathrooms filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms & Bathrooms</label>
            <div className="flex items-center space-x-2">
              <select
                value={filters.bedrooms || ''}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              >
                <option value="">Beds</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={`bed-${num}`} value={num}>
                    {num}+ Beds
                  </option>
                ))}
              </select>
              <select
                value={filters.bathrooms || ''}
                onChange={(e) => handleFilterChange('bathrooms', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              >
                <option value="">Baths</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={`bath-${num}`} value={num}>
                    {num}+ Baths
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Property type filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              value={filters.propertyType || ''}
              onChange={(e) => handleFilterChange('propertyType', e.target.value || undefined)}
              className="w-full p-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          {/* Location filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
              className="w-full p-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Filter actions */}
        <div className="p-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleClearFilters}
            className="text-gray-600 hover:text-gray-900 mr-4"
            disabled={activeFilterCount === 0}
          >
            Clear Filters
          </button>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
