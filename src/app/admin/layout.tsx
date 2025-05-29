/**
 * src/app/admin/layout.tsx
 * 
 * Layout component for the admin section
 * Provides consistent styling and navigation for all admin pages
 */

import { ReactNode } from 'react';
import Link from 'next/link';

// Define props interface
interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * AdminLayout component
 * 
 * Provides consistent styling and navigation for all admin pages
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-blue-800">
                <Link href="/admin" className="hover:text-blue-600">
                  RE/MAX Blue Ocean Admin
                </Link>
              </h1>
            </div>
            
            {/* Main site link */}
            <div>
              <Link 
                href="/" 
                className="text-sm text-gray-600 hover:text-blue-600 flex items-center"
              >
                <svg 
                  className="h-4 w-4 mr-1" 
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
                Return to Website
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Admin content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar navigation */}
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Admin Menu</h2>
              
              <nav className="space-y-2">
                <Link 
                  href="/admin" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 text-gray-700"
                >
                  Dashboard
                </Link>
                
                <Link 
                  href="/admin/sync" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 text-gray-700"
                >
                  REI API Sync
                </Link>
                
                <Link 
                  href="/admin/properties" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 text-gray-700"
                >
                  Properties
                </Link>
                
                <Link 
                  href="/admin/agents" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 text-gray-700"
                >
                  Agents
                </Link>
                
                <Link 
                  href="/admin/zones" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 text-gray-700"
                >
                  Zones
                </Link>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 md:ml-6">
            {children}
          </div>
        </div>
      </div>
      
      {/* Admin footer */}
      <footer className="bg-white shadow-md mt-6">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} RE/MAX Blue Ocean Admin Panel
          </div>
        </div>
      </footer>
    </div>
  );
}
