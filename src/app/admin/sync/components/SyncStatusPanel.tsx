'use client';

/**
 * src/app/admin/sync/components/SyncStatusPanel.tsx
 * 
 * Status panel component for displaying sync operation results
 * Shows detailed information about property and agent synchronization
 */

import { useState } from 'react';

// Define props interface
interface SyncStatusPanelProps {
  propertiesResult: any | null;
  agentsResult: any | null;
}

/**
 * SyncStatusPanel component
 * 
 * Displays detailed information about property and agent synchronization results
 */
export default function SyncStatusPanel({ 
  propertiesResult, 
  agentsResult 
}: SyncStatusPanelProps) {
  // State for controlling which errors to display
  const [showPropertyErrors, setShowPropertyErrors] = useState(false);
  const [showAgentErrors, setShowAgentErrors] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Sync Status</h2>
      
      {/* Properties sync status */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Properties</h3>
        
        {propertiesResult ? (
          <div>
            {/* Success or failure status */}
            <div className={`p-3 rounded-md mb-3 ${
              propertiesResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {propertiesResult.success ? 'Sync completed successfully' : 'Sync failed'}
              {propertiesResult.error && (
                <div className="mt-1 text-sm">
                  Error: {propertiesResult.error}
                </div>
              )}
            </div>
            
            {/* Sync stats */}
            {propertiesResult.success && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-600">Brand:</div>
                  <div className="text-sm font-medium">{propertiesResult.brand}</div>
                  
                  <div className="text-sm text-gray-600">Total Available:</div>
                  <div className="text-sm font-medium">{propertiesResult.totalCount}</div>
                  
                  <div className="text-sm text-gray-600">Processed:</div>
                  <div className="text-sm font-medium">{propertiesResult.processed}</div>
                  
                  <div className="text-sm text-gray-600">Added:</div>
                  <div className="text-sm font-medium">{propertiesResult.added}</div>
                  
                  <div className="text-sm text-gray-600">Updated:</div>
                  <div className="text-sm font-medium">{propertiesResult.updated}</div>
                  
                  <div className="text-sm text-gray-600">Failed:</div>
                  <div className="text-sm font-medium">{propertiesResult.failed}</div>
                  
                  <div className="text-sm text-gray-600">Duration:</div>
                  <div className="text-sm font-medium">{(propertiesResult.durationMs / 1000).toFixed(2)}s</div>
                  
                  <div className="text-sm text-gray-600">Has More:</div>
                  <div className="text-sm font-medium">{propertiesResult.hasMore ? 'Yes' : 'No'}</div>
                </div>
                
                {/* Error details (if any) */}
                {propertiesResult.errors && propertiesResult.errors.length > 0 && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowPropertyErrors(!showPropertyErrors)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {showPropertyErrors ? 'Hide' : 'Show'} {propertiesResult.errors.length} errors
                      <svg 
                        className={`ml-1 h-4 w-4 transform ${showPropertyErrors ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showPropertyErrors && (
                      <div className="mt-2 bg-red-50 p-3 rounded-md text-sm text-red-800 max-h-40 overflow-y-auto">
                        <ul className="list-disc pl-5 space-y-1">
                          {propertiesResult.errors.map((error: string, index: number) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500 italic">No sync operation performed yet</div>
        )}
      </div>
      
      {/* Agents sync status */}
      <div>
        <h3 className="text-lg font-medium mb-2">Agents</h3>
        
        {agentsResult ? (
          <div>
            {/* Success or failure status */}
            <div className={`p-3 rounded-md mb-3 ${
              agentsResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {agentsResult.success ? 'Sync completed successfully' : 'Sync failed'}
              {agentsResult.error && (
                <div className="mt-1 text-sm">
                  Error: {agentsResult.error}
                </div>
              )}
            </div>
            
            {/* Sync stats */}
            {agentsResult.success && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-600">Brand:</div>
                  <div className="text-sm font-medium">{agentsResult.brand}</div>
                  
                  <div className="text-sm text-gray-600">Total Available:</div>
                  <div className="text-sm font-medium">{agentsResult.totalCount}</div>
                  
                  <div className="text-sm text-gray-600">Processed:</div>
                  <div className="text-sm font-medium">{agentsResult.processed}</div>
                  
                  <div className="text-sm text-gray-600">Added:</div>
                  <div className="text-sm font-medium">{agentsResult.added}</div>
                  
                  <div className="text-sm text-gray-600">Updated:</div>
                  <div className="text-sm font-medium">{agentsResult.updated}</div>
                  
                  <div className="text-sm text-gray-600">Failed:</div>
                  <div className="text-sm font-medium">{agentsResult.failed}</div>
                  
                  <div className="text-sm text-gray-600">Duration:</div>
                  <div className="text-sm font-medium">{(agentsResult.durationMs / 1000).toFixed(2)}s</div>
                  
                  <div className="text-sm text-gray-600">Has More:</div>
                  <div className="text-sm font-medium">{agentsResult.hasMore ? 'Yes' : 'No'}</div>
                </div>
                
                {/* Error details (if any) */}
                {agentsResult.errors && agentsResult.errors.length > 0 && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowAgentErrors(!showAgentErrors)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {showAgentErrors ? 'Hide' : 'Show'} {agentsResult.errors.length} errors
                      <svg 
                        className={`ml-1 h-4 w-4 transform ${showAgentErrors ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showAgentErrors && (
                      <div className="mt-2 bg-red-50 p-3 rounded-md text-sm text-red-800 max-h-40 overflow-y-auto">
                        <ul className="list-disc pl-5 space-y-1">
                          {agentsResult.errors.map((error: string, index: number) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500 italic">No sync operation performed yet</div>
        )}
      </div>
    </div>
  );
}
