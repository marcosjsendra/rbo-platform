'use client';

/**
 * src/app/admin/sync/components/SyncControlPanel.tsx
 * 
 * Control panel component for managing sync operations
 * Provides UI controls for triggering property and agent synchronization
 */

import { useState } from 'react';
import { BrandType } from '../../../../lib/api/rei-api-cca/client';

// Define props interface
interface SyncControlPanelProps {
  onSyncProperties: (brand: BrandType, forceSync: boolean, batchSize: number, verbose: boolean) => Promise<void>;
  onSyncAgents: (brand: BrandType, forceSync: boolean, batchSize: number, verbose: boolean) => Promise<void>;
  isLoading: boolean;
  brand: BrandType;
  onBrandChange: (brand: BrandType) => void;
}

/**
 * SyncControlPanel component
 * 
 * Provides UI controls for triggering property and agent synchronization
 */
export default function SyncControlPanel({ 
  onSyncProperties, 
  onSyncAgents, 
  isLoading,
  brand,
  onBrandChange
}: SyncControlPanelProps) {
  // State for sync options
  const [forceSync, setForceSync] = useState(false);
  const [batchSize, setBatchSize] = useState(50);
  const [verbose, setVerbose] = useState(false);
  
  // Handle sync properties button click
  const handleSyncProperties = () => {
    onSyncProperties(brand, forceSync, batchSize, verbose);
  };
  
  // Handle sync agents button click
  const handleSyncAgents = () => {
    onSyncAgents(brand, forceSync, batchSize, verbose);
  };
  
  // Handle sync all button click
  const handleSyncAll = () => {
    onSyncProperties(brand, forceSync, batchSize, verbose);
    onSyncAgents(brand, forceSync, batchSize, verbose);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Sync Controls</h2>
      
      {/* Sync options */}
      <div className="space-y-4 mb-6">
        {/* Brand selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                checked={brand === 'AZURA'}
                onChange={() => onBrandChange('AZURA')}
              />
              <span className="ml-2">AZURA</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                checked={brand === 'BLUE_OCEAN'}
                onChange={() => onBrandChange('BLUE_OCEAN')}
              />
              <span className="ml-2">BLUE OCEAN</span>
            </label>
          </div>
        </div>
        
        {/* Force sync option */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={forceSync}
              onChange={(e) => setForceSync(e.target.checked)}
            />
            <span className="ml-2">Force full sync (ignore last sync time)</span>
          </label>
        </div>
        
        {/* Batch size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batch Size: {batchSize}
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            value={batchSize}
            onChange={(e) => setBatchSize(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        
        {/* Verbose logging */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={verbose}
              onChange={(e) => setVerbose(e.target.checked)}
            />
            <span className="ml-2">Verbose logging</span>
          </label>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleSyncProperties}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Syncing...' : 'Sync Properties'}
        </button>
        
        <button
          onClick={handleSyncAgents}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Syncing...' : 'Sync Agents'}
        </button>
        
        <button
          onClick={handleSyncAll}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isLoading ? 'Syncing...' : 'Sync All'}
        </button>
      </div>
    </div>
  );
}
