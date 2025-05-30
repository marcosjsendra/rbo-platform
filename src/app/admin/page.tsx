/**
 * src/app/admin/page.tsx
 * 
 * Admin dashboard page
 * Provides an overview of the website's data and quick access to admin features
 */

import Link from 'next/link';

/**
 * AdminDashboardPage component
 * 
 * Main dashboard for the admin section
 */
export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Quick action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Sync card */}
        <Link href="/admin/sync" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">REI API Sync</h2>
              <svg 
                className="h-6 w-6 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            </div>
            <p className="text-gray-600">
              Synchronize properties and agents from the REI API CCA
            </p>
          </div>
        </Link>
        
        {/* Properties card */}
        <Link href="/admin/properties" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Properties</h2>
              <svg 
                className="h-6 w-6 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
            </div>
            <p className="text-gray-600">
              Manage property listings and their details
            </p>
          </div>
        </Link>
        
        {/* Agents card */}
        <Link href="/admin/agents" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Agents</h2>
              <svg 
                className="h-6 w-6 text-purple-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
            <p className="text-gray-600">
              Manage agent profiles and information
            </p>
          </div>
        </Link>
      </div>
      
      {/* Information section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">RE/MAX Blue Ocean Admin</h2>
        <p className="text-gray-600 mb-4">
          Welcome to the admin panel for the RE/MAX Blue Ocean website. This panel provides tools for managing property listings, agent profiles, and synchronization with the REI API CCA.
        </p>
        
        <h3 className="text-md font-medium mb-2">Getting Started</h3>
        <ol className="list-decimal list-inside text-gray-600 space-y-1 mb-4">
          <li>Use the <strong>REI API Sync</strong> page to synchronize properties and agents from the REI API CCA</li>
          <li>Manage property listings on the <strong>Properties</strong> page</li>
          <li>Manage agent profiles on the <strong>Agents</strong> page</li>
          <li>Configure zones on the <strong>Zones</strong> page</li>
        </ol>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex items-start">
            <svg 
              className="h-5 w-5 text-blue-600 mt-0.5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="text-sm text-blue-800">
              For best results, synchronize properties and agents regularly to ensure the website displays the most up-to-date information from the REI API CCA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
