/**
 * src/app/admin/test/page.tsx
 * 
 * Test page for validating admin UI functionality
 * This page provides a test interface for admin features
 */

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';
import { useRouter } from 'next/navigation';

// Define types for our data
type Property = Database['public']['Tables']['properties']['Row'];
type Agent = Database['public']['Tables']['agents']['Row'];
type TestResult = {
  id: string;
  feature: string;
  status: 'passed' | 'failed' | 'pending';
  message: string;
};

export default function AdminTestPage() {
  // State
  const [supabase, setSupabase] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const router = useRouter();

  // Initialize Supabase client
  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        console.log('src/app/admin/test/page.tsx: Initializing Supabase client');
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          throw new Error('Missing Supabase environment variables');
        }
        
        const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
        setSupabase(supabaseClient);
        
        // Check authentication
        const { data: { session } } = await supabaseClient.auth.getSession();
        setIsAuthenticated(!!session);
        
        setLoading(false);
      } catch (err) {
        console.error('src/app/admin/test/page.tsx: Error initializing Supabase:', err);
        setError(`Error initializing Supabase: ${err instanceof Error ? err.message : String(err)}`);
        setLoading(false);
      }
    };
    
    initializeSupabase();
  }, []);

  // Function to add test result
  const addTestResult = (id: string, feature: string, status: 'passed' | 'failed' | 'pending', message: string) => {
    console.log(`src/app/admin/test/page.tsx: Test result - ${feature} (${id}): ${status} - ${message}`);
    setTestResults(prev => [
      ...prev.filter(result => result.id !== id),
      { id, feature, status, message }
    ]);
  };

  // Test: Authentication
  const testAuthentication = async () => {
    try {
      setActiveTest('auth');
      addTestResult('ADMIN-001-1', 'Authentication', 'pending', 'Testing authentication...');
      
      if (isAuthenticated) {
        addTestResult('ADMIN-001-1', 'Authentication', 'passed', 'User is authenticated');
      } else {
        addTestResult('ADMIN-001-1', 'Authentication', 'failed', 'User is not authenticated');
      }
      
      setActiveTest(null);
    } catch (err) {
      console.error('src/app/admin/test/page.tsx: Error testing authentication:', err);
      addTestResult(
        'ADMIN-001-1', 
        'Authentication', 
        'failed', 
        `Error testing authentication: ${err instanceof Error ? err.message : String(err)}`
      );
      setActiveTest(null);
    }
  };

  // Test: Property Management
  const testPropertyManagement = async () => {
    try {
      setActiveTest('property');
      addTestResult('ADMIN-002-1', 'Property Management', 'pending', 'Testing property management...');
      
      // Test property listing
      addTestResult('ADMIN-002-2', 'Property Listing', 'pending', 'Fetching properties...');
      const { data: properties, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .limit(5);
      
      if (propertiesError) {
        throw new Error(`Error fetching properties: ${propertiesError.message}`);
      }
      
      addTestResult(
        'ADMIN-002-2', 
        'Property Listing', 
        'passed', 
        `Successfully fetched ${properties.length} properties`
      );
      
      // Test property creation
      addTestResult('ADMIN-002-3', 'Property Creation', 'pending', 'Creating test property...');
      const testProperty = {
        listing_id: `TEST-${Date.now()}`,
        title: 'Test Property',
        description: 'This is a test property created by the admin test script',
        price: 500000,
        currency: 'USD',
        property_type: 'House',
        status: 'for-sale',
        bedrooms: 3,
        bathrooms: 2,
        size: 200,
        size_unit: 'sqm',
        location: 'Test Location',
        address: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        brand: 'TEST'
      };
      
      const { data: createdProperty, error: createError } = await supabase
        .from('properties')
        .insert([testProperty])
        .select()
        .single();
      
      if (createError) {
        throw new Error(`Error creating property: ${createError.message}`);
      }
      
      addTestResult(
        'ADMIN-002-3', 
        'Property Creation', 
        'passed', 
        `Successfully created property with ID ${createdProperty.id}`
      );
      
      // Test property update
      addTestResult('ADMIN-002-4', 'Property Update', 'pending', 'Updating test property...');
      const { error: updateError } = await supabase
        .from('properties')
        .update({ title: 'Updated Test Property' })
        .eq('id', createdProperty.id);
      
      if (updateError) {
        throw new Error(`Error updating property: ${updateError.message}`);
      }
      
      addTestResult(
        'ADMIN-002-4', 
        'Property Update', 
        'passed', 
        `Successfully updated property with ID ${createdProperty.id}`
      );
      
      // Test property deletion
      addTestResult('ADMIN-002-5', 'Property Deletion', 'pending', 'Deleting test property...');
      const { error: deleteError } = await supabase
        .from('properties')
        .delete()
        .eq('id', createdProperty.id);
      
      if (deleteError) {
        throw new Error(`Error deleting property: ${deleteError.message}`);
      }
      
      addTestResult(
        'ADMIN-002-5', 
        'Property Deletion', 
        'passed', 
        `Successfully deleted property with ID ${createdProperty.id}`
      );
      
      // Overall property management test result
      addTestResult(
        'ADMIN-002-1', 
        'Property Management', 
        'passed', 
        'All property management tests passed'
      );
      
      setActiveTest(null);
    } catch (err) {
      console.error('src/app/admin/test/page.tsx: Error testing property management:', err);
      addTestResult(
        'ADMIN-002-1', 
        'Property Management', 
        'failed', 
        `Error testing property management: ${err instanceof Error ? err.message : String(err)}`
      );
      setActiveTest(null);
    }
  };

  // Test: Agent Management
  const testAgentManagement = async () => {
    try {
      setActiveTest('agent');
      addTestResult('ADMIN-003-1', 'Agent Management', 'pending', 'Testing agent management...');
      
      // Test agent listing
      addTestResult('ADMIN-003-2', 'Agent Listing', 'pending', 'Fetching agents...');
      const { data: agents, error: agentsError } = await supabase
        .from('agents')
        .select('*')
        .limit(5);
      
      if (agentsError) {
        throw new Error(`Error fetching agents: ${agentsError.message}`);
      }
      
      addTestResult(
        'ADMIN-003-2', 
        'Agent Listing', 
        'passed', 
        `Successfully fetched ${agents.length} agents`
      );
      
      // Test agent creation
      addTestResult('ADMIN-003-3', 'Agent Creation', 'pending', 'Creating test agent...');
      const testAgent = {
        agent_id: `TEST-${Date.now()}`,
        first_name: 'Test',
        last_name: 'Agent',
        email: 'test.agent@example.com',
        phone: '123-456-7890',
        bio: 'This is a test agent created by the admin test script',
        title: 'Test Agent',
        specialties: ['Test Specialty 1', 'Test Specialty 2'],
        languages: ['English', 'Spanish'],
        brand: 'TEST'
      };
      
      const { data: createdAgent, error: createError } = await supabase
        .from('agents')
        .insert([testAgent])
        .select()
        .single();
      
      if (createError) {
        throw new Error(`Error creating agent: ${createError.message}`);
      }
      
      addTestResult(
        'ADMIN-003-3', 
        'Agent Creation', 
        'passed', 
        `Successfully created agent with ID ${createdAgent.id}`
      );
      
      // Test agent update
      addTestResult('ADMIN-003-4', 'Agent Update', 'pending', 'Updating test agent...');
      const { error: updateError } = await supabase
        .from('agents')
        .update({ first_name: 'Updated' })
        .eq('id', createdAgent.id);
      
      if (updateError) {
        throw new Error(`Error updating agent: ${updateError.message}`);
      }
      
      addTestResult(
        'ADMIN-003-4', 
        'Agent Update', 
        'passed', 
        `Successfully updated agent with ID ${createdAgent.id}`
      );
      
      // Test agent deletion
      addTestResult('ADMIN-003-5', 'Agent Deletion', 'pending', 'Deleting test agent...');
      const { error: deleteError } = await supabase
        .from('agents')
        .delete()
        .eq('id', createdAgent.id);
      
      if (deleteError) {
        throw new Error(`Error deleting agent: ${deleteError.message}`);
      }
      
      addTestResult(
        'ADMIN-003-5', 
        'Agent Deletion', 
        'passed', 
        `Successfully deleted agent with ID ${createdAgent.id}`
      );
      
      // Overall agent management test result
      addTestResult(
        'ADMIN-003-1', 
        'Agent Management', 
        'passed', 
        'All agent management tests passed'
      );
      
      setActiveTest(null);
    } catch (err) {
      console.error('src/app/admin/test/page.tsx: Error testing agent management:', err);
      addTestResult(
        'ADMIN-003-1', 
        'Agent Management', 
        'failed', 
        `Error testing agent management: ${err instanceof Error ? err.message : String(err)}`
      );
      setActiveTest(null);
    }
  };

  // Test: Filtering and Sorting
  const testFilteringAndSorting = async () => {
    try {
      setActiveTest('filtering');
      addTestResult('ADMIN-004-1', 'Filtering and Sorting', 'pending', 'Testing filtering and sorting...');
      
      // Test property filtering
      addTestResult('ADMIN-004-2', 'Property Filtering', 'pending', 'Testing property filtering...');
      const { data: filteredProperties, error: filterError } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'for-sale')
        .limit(5);
      
      if (filterError) {
        throw new Error(`Error filtering properties: ${filterError.message}`);
      }
      
      addTestResult(
        'ADMIN-004-2', 
        'Property Filtering', 
        'passed', 
        `Successfully filtered properties by status (found ${filteredProperties.length})`
      );
      
      // Test property sorting
      addTestResult('ADMIN-004-3', 'Property Sorting', 'pending', 'Testing property sorting...');
      const { data: sortedProperties, error: sortError } = await supabase
        .from('properties')
        .select('*')
        .order('price', { ascending: false })
        .limit(5);
      
      if (sortError) {
        throw new Error(`Error sorting properties: ${sortError.message}`);
      }
      
      addTestResult(
        'ADMIN-004-3', 
        'Property Sorting', 
        'passed', 
        `Successfully sorted properties by price (descending)`
      );
      
      // Test agent filtering
      addTestResult('ADMIN-004-4', 'Agent Filtering', 'pending', 'Testing agent filtering...');
      const { data: filteredAgents, error: agentFilterError } = await supabase
        .from('agents')
        .select('*')
        .ilike('last_name', 'S%')
        .limit(5);
      
      if (agentFilterError) {
        throw new Error(`Error filtering agents: ${agentFilterError.message}`);
      }
      
      addTestResult(
        'ADMIN-004-4', 
        'Agent Filtering', 
        'passed', 
        `Successfully filtered agents by last name (found ${filteredAgents.length})`
      );
      
      // Test agent sorting
      addTestResult('ADMIN-004-5', 'Agent Sorting', 'pending', 'Testing agent sorting...');
      const { data: sortedAgents, error: agentSortError } = await supabase
        .from('agents')
        .select('*')
        .order('last_name', { ascending: true })
        .limit(5);
      
      if (agentSortError) {
        throw new Error(`Error sorting agents: ${agentSortError.message}`);
      }
      
      addTestResult(
        'ADMIN-004-5', 
        'Agent Sorting', 
        'passed', 
        `Successfully sorted agents by last name (ascending)`
      );
      
      // Overall filtering and sorting test result
      addTestResult(
        'ADMIN-004-1', 
        'Filtering and Sorting', 
        'passed', 
        'All filtering and sorting tests passed'
      );
      
      setActiveTest(null);
    } catch (err) {
      console.error('src/app/admin/test/page.tsx: Error testing filtering and sorting:', err);
      addTestResult(
        'ADMIN-004-1', 
        'Filtering and Sorting', 
        'failed', 
        `Error testing filtering and sorting: ${err instanceof Error ? err.message : String(err)}`
      );
      setActiveTest(null);
    }
  };

  // Test: Sync Metadata
  const testSyncMetadata = async () => {
    try {
      setActiveTest('sync');
      addTestResult('ADMIN-005-1', 'Sync Metadata', 'pending', 'Testing sync metadata...');
      
      // Fetch sync metadata
      const { data: syncMetadata, error: syncError } = await supabase
        .from('sync_metadata')
        .select('*');
      
      if (syncError) {
        throw new Error(`Error fetching sync metadata: ${syncError.message}`);
      }
      
      addTestResult(
        'ADMIN-005-2', 
        'Sync Metadata Retrieval', 
        'passed', 
        `Successfully retrieved ${syncMetadata.length} sync metadata records`
      );
      
      // Test updating sync metadata
      addTestResult('ADMIN-005-3', 'Sync Metadata Update', 'pending', 'Testing sync metadata update...');
      
      if (syncMetadata.length > 0) {
        const testRecord = syncMetadata[0];
        const { error: updateError } = await supabase
          .from('sync_metadata')
          .update({ last_sync: new Date().toISOString() })
          .eq('id', testRecord.id);
        
        if (updateError) {
          throw new Error(`Error updating sync metadata: ${updateError.message}`);
        }
        
        addTestResult(
          'ADMIN-005-3', 
          'Sync Metadata Update', 
          'passed', 
          `Successfully updated sync metadata record ${testRecord.id}`
        );
      } else {
        addTestResult(
          'ADMIN-005-3', 
          'Sync Metadata Update', 
          'failed', 
          'No sync metadata records found to update'
        );
      }
      
      // Overall sync metadata test result
      addTestResult(
        'ADMIN-005-1', 
        'Sync Metadata', 
        'passed', 
        'Sync metadata tests completed'
      );
      
      setActiveTest(null);
    } catch (err) {
      console.error('src/app/admin/test/page.tsx: Error testing sync metadata:', err);
      addTestResult(
        'ADMIN-005-1', 
        'Sync Metadata', 
        'failed', 
        `Error testing sync metadata: ${err instanceof Error ? err.message : String(err)}`
      );
      setActiveTest(null);
    }
  };

  // Run all tests
  const runAllTests = async () => {
    await testAuthentication();
    await testPropertyManagement();
    await testAgentManagement();
    await testFilteringAndSorting();
    await testSyncMetadata();
  };

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Admin Test</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg p-6 bg-red-50 rounded-lg">
          <h1 className="text-2xl font-bold text-red-700 mb-4">Error</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg p-6 bg-yellow-50 rounded-lg">
          <h1 className="text-2xl font-bold text-yellow-700 mb-4">Authentication Required</h1>
          <p className="text-yellow-600 mb-4">You must be logged in to access the admin test page.</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => router.push('/admin/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Functionality Testing</h1>
      
      {/* Test Controls */}
      <div className="mb-8 space-y-4">
        <h2 className="text-xl font-bold">Test Controls</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={runAllTests}
            disabled={!!activeTest}
          >
            Run All Tests
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
            onClick={testAuthentication}
            disabled={!!activeTest}
          >
            Test Authentication
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded"
            onClick={testPropertyManagement}
            disabled={!!activeTest}
          >
            Test Property Management
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
            onClick={testAgentManagement}
            disabled={!!activeTest}
          >
            Test Agent Management
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded"
            onClick={testFilteringAndSorting}
            disabled={!!activeTest}
          >
            Test Filtering & Sorting
          </button>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded"
            onClick={testSyncMetadata}
            disabled={!!activeTest}
          >
            Test Sync Metadata
          </button>
        </div>
        
        {activeTest && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mr-3"></div>
              <p className="text-blue-700">Running test: {activeTest}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Test Results */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test Results</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          {testResults.length === 0 ? (
            <p className="text-gray-500">No test results yet. Click a test button to begin testing.</p>
          ) : (
            <div className="space-y-2">
              {testResults.map(result => (
                <div 
                  key={result.id}
                  className={`p-3 rounded-md ${
                    result.status === 'passed' 
                      ? 'bg-green-100' 
                      : result.status === 'failed'
                        ? 'bg-red-100'
                        : 'bg-yellow-100'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{result.feature} ({result.id})</span>
                    <span className={`font-bold ${
                      result.status === 'passed' 
                        ? 'text-green-700' 
                        : result.status === 'failed'
                          ? 'text-red-700'
                          : 'text-yellow-700'
                    }`}>
                      {result.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{result.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="mt-8">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
          onClick={() => router.push('/admin')}
        >
          Back to Admin Dashboard
        </button>
      </div>
    </div>
  );
}
