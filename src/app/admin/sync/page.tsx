'use client';

/**
 * src/app/admin/sync/page.tsx
 * 
 * Admin page for REI API CCA synchronization
 * Provides UI for managing property and agent synchronization
 */

import { useState } from 'react';
import SyncControlPanel from './components/SyncControlPanel';
import SyncStatusPanel from './components/SyncStatusPanel';
import SyncMetadataPanel from './components/SyncMetadataPanel';
import { BrandType } from '../../../lib/api/rei-api-cca/client';

/**
 * SyncAdminPage component
 * 
 * Main page for the sync admin UI
 */
export default function SyncAdminPage() {
  // State for sync results and loading status
  const [propertiesResult, setPropertiesResult] = useState<any>(null);
  const [agentsResult, setAgentsResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState<BrandType>('AZURA');
  
  /**
   * Handle property synchronization
   * 
   * @param brand The brand to sync (AZURA or BLUE_OCEAN)
   * @param forceSync Whether to force a full sync
   * @param batchSize The number of records to process per batch
   * @param verbose Whether to enable verbose logging
   */
  const handleSyncProperties = async (
    brand: BrandType,
    forceSync: boolean,
    batchSize: number,
    verbose: boolean
  ) => {
    setIsLoading(true);
    setPropertiesResult(null);
    
    try {
      // Build the API URL with query parameters
      const url = `/api/sync/properties?brand=${brand}&force=${forceSync}&batchSize=${batchSize}&verbose=${verbose}`;
      
      // Call the API
      const response = await fetch(url);
      const result = await response.json();
      
      // Update state with the result
      setPropertiesResult(result);
      
      // Log the result
      console.log('src/app/admin/sync/page.tsx: Properties sync result:', result);
    } catch (error) {
      console.error('src/app/admin/sync/page.tsx: Error syncing properties:', error);
      
      // Update state with the error
      setPropertiesResult({
        success: false,
        error: String(error),
        brand
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle agent synchronization
   * 
   * @param brand The brand to sync (AZURA or BLUE_OCEAN)
   * @param forceSync Whether to force a full sync
   * @param batchSize The number of records to process per batch
   * @param verbose Whether to enable verbose logging
   */
  const handleSyncAgents = async (
    brand: BrandType,
    forceSync: boolean,
    batchSize: number,
    verbose: boolean
  ) => {
    setIsLoading(true);
    setAgentsResult(null);
    
    try {
      // Build the API URL with query parameters
      const url = `/api/sync/agents?brand=${brand}&force=${forceSync}&batchSize=${batchSize}&verbose=${verbose}`;
      
      // Call the API
      const response = await fetch(url);
      const result = await response.json();
      
      // Update state with the result
      setAgentsResult(result);
      
      // Log the result
      console.log('src/app/admin/sync/page.tsx: Agents sync result:', result);
    } catch (error) {
      console.error('src/app/admin/sync/page.tsx: Error syncing agents:', error);
      
      // Update state with the error
      setAgentsResult({
        success: false,
        error: String(error),
        brand
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">REI API CCA Synchronization</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Sync control panel */}
        <SyncControlPanel
          onSyncProperties={handleSyncProperties}
          onSyncAgents={handleSyncAgents}
          isLoading={isLoading}
          brand={brand}
          onBrandChange={setBrand}
        />
        
        {/* Sync metadata panel */}
        <SyncMetadataPanel brand={brand} />
        
        {/* Sync status panel */}
        <SyncStatusPanel
          propertiesResult={propertiesResult}
          agentsResult={agentsResult}
        />
      </div>
    </div>
  );
}
