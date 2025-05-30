'use client';

/**
 * src/app/admin/sync/components/SyncMetadataPanel.tsx
 * 
 * Component for displaying sync metadata
 * Shows the last sync time for properties and agents
 */

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import { BrandType } from '@/lib/api/rei-api-cca/client';

// Define props interface
interface SyncMetadataPanelProps {
  brand: BrandType;
}

/**
 * SyncMetadataPanel component
 * 
 * Displays sync metadata for properties and agents
 */
export default function SyncMetadataPanel({ brand }: SyncMetadataPanelProps) {
  // State for sync metadata
  const [propertiesMetadata, setPropertiesMetadata] = useState<any>(null);
  const [agentsMetadata, setAgentsMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Create Supabase client
  const supabase = createClientComponentClient();
  
  // Fetch sync metadata on mount and when brand changes
  useEffect(() => {
    const fetchSyncMetadata = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch properties metadata
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('sync_metadata')
          .select('*')
          .eq('entity_type', 'property')
          .eq('brand', brand)
          .single();
        
        if (propertiesError && propertiesError.code !== 'PGRST116') {
          console.error('src/app/admin/sync/components/SyncMetadataPanel.tsx: Error fetching properties metadata:', propertiesError);
          setError(`Error fetching properties metadata: ${propertiesError.message}`);
        } else {
          setPropertiesMetadata(propertiesData);
        }
        
        // Fetch agents metadata
        const { data: agentsData, error: agentsError } = await supabase
          .from('sync_metadata')
          .select('*')
          .eq('entity_type', 'agent')
          .eq('brand', brand)
          .single();
        
        if (agentsError && agentsError.code !== 'PGRST116') {
          console.error('src/app/admin/sync/components/SyncMetadataPanel.tsx: Error fetching agents metadata:', agentsError);
          setError(`Error fetching agents metadata: ${agentsError.message}`);
        } else {
          setAgentsMetadata(agentsData);
        }
      } catch (error) {
        console.error('src/app/admin/sync/components/SyncMetadataPanel.tsx: Error fetching sync metadata:', error);
        setError(`Error fetching sync metadata: ${String(error)}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSyncMetadata();
  }, [brand, supabase]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    }).format(date);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Sync Metadata</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-3 rounded-md">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Brand information */}
          <div className="bg-blue-50 p-3 rounded-md">
            <div className="font-medium text-blue-800">
              Current Brand: {brand}
            </div>
          </div>
          
          {/* Properties metadata */}
          <div>
            <h3 className="text-lg font-medium mb-2">Properties</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-600">Last Sync:</div>
              <div className="text-sm font-medium">
                {propertiesMetadata ? formatDate(propertiesMetadata.last_sync_time) : 'Never'}
              </div>
            </div>
          </div>
          
          {/* Agents metadata */}
          <div>
            <h3 className="text-lg font-medium mb-2">Agents</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-600">Last Sync:</div>
              <div className="text-sm font-medium">
                {agentsMetadata ? formatDate(agentsMetadata.last_sync_time) : 'Never'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
