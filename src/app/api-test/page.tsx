'use client';

/**
 * src/app/api-test/page.tsx
 * 
 * API Test Page
 * 
 * This page demonstrates the REI API CCA client in action by making
 * test API calls and displaying the results.
 */

import { useState, useEffect } from 'react';
import { ReiApiCcaClient, ApiCredentials } from '@/lib/api/rei-api-cca';
import { REMAX_BLUE_OCEAN_CREDENTIALS, REMAX_AZURA_CREDENTIALS } from '@/lib/api';

export default function ApiTestPage() {
  // State for selected office
  const [selectedOffice, setSelectedOffice] = useState<'AZURA' | 'BLUE_OCEAN'>('AZURA');
  
  // State for API test results
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [propertiesStatus, setPropertiesStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [agentsStatus, setAgentsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [lookupStatus, setLookupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [apiClientTestStatus, setApiClientTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // State for API response data
  const [properties, setProperties] = useState<any>(null);
  const [agents, setAgents] = useState<any>(null);
  const [lookups, setLookups] = useState<any>(null);
  const [apiClientTestResponse, setApiClientTestResponse] = useState<any>(null);
  
  // State for error messages
  const [authError, setAuthError] = useState<string | null>(null);
  const [propertiesError, setPropertiesError] = useState<string | null>(null);
  const [agentsError, setAgentsError] = useState<string | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [apiClientTestError, setApiClientTestError] = useState<string | null>(null);
  
  // Get credentials based on selected office
  const getCredentials = () => {
    return selectedOffice === 'AZURA' ? REMAX_AZURA_CREDENTIALS : REMAX_BLUE_OCEAN_CREDENTIALS;
  };

  // Test authentication
  const testAuthentication = async () => {
    setAuthStatus('loading');
    setAuthError(null);
    
    try {
      const credentials = getCredentials();
      console.log(`[Client] Testing authentication for ${selectedOffice}...`);
      const client = new ReiApiCcaClient(credentials);
      
      // Test authentication directly
      const result = await client.testAuthentication();
      console.log(`[Client] Authentication test result for ${selectedOffice}:`, result);
      
      setAuthStatus('success');
    } catch (error) {
      console.error(`[Client] Authentication test failed for ${selectedOffice}:`, error);
      setAuthStatus('error');
      setAuthError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Test fetching properties
  const testFetchProperties = async () => {
    setPropertiesStatus('loading');
    setPropertiesError(null);
    
    try {
      const credentials = getCredentials();
      console.log(`[Client] Fetching properties for ${selectedOffice}...`);
      const client = new ReiApiCcaClient(credentials);
      const result = await client.getProperties(5, 0);
      
      console.log(`[Client] Properties fetch result for ${selectedOffice}:`, result);
      setProperties(result);
      setPropertiesStatus('success');
    } catch (error) {
      console.error(`[Client] Fetch properties failed for ${selectedOffice}:`, error);
      setPropertiesStatus('error');
      setPropertiesError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Test fetching agents
  const testFetchAgents = async () => {
    setAgentsStatus('loading');
    setAgentsError(null);
    
    try {
      const credentials = getCredentials();
      console.log(`[Client] Fetching agents for ${selectedOffice}...`);
      const client = new ReiApiCcaClient(credentials);
      const result = await client.getAssociates(5, 0);
      
      console.log(`[Client] Agents fetch result for ${selectedOffice}:`, result);
      setAgents(result);
      setAgentsStatus('success');
    } catch (error) {
      console.error(`[Client] Fetch agents failed for ${selectedOffice}:`, error);
      setAgentsStatus('error');
      setAgentsError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Test the API client
  const testApiClient = async () => {
    setApiClientTestStatus('loading');
    setApiClientTestError(null);
    
    try {
      const credentials = getCredentials();
      console.log(`[Client] Testing API client for ${selectedOffice}...`);
      const client = new ReiApiCcaClient(credentials);
      
      // Test API connection
      const connectionResult = await client.testConnection();
      console.log(`[Client] API connection test result for ${selectedOffice}:`, connectionResult);
      
      // Test authentication
      const authResult = await client.testAuthentication();
      console.log(`[Client] Authentication test result for ${selectedOffice}:`, authResult);
      
      // Test getting properties
      const properties = await client.getProperties(5, 0);
      console.log(`[Client] Properties test result for ${selectedOffice}:`, properties);
      
      setApiClientTestResponse({
        connection: connectionResult,
        authentication: authResult,
        properties: properties
      });
      setApiClientTestStatus('success');
    } catch (error) {
      console.error(`[Client] API client test failed for ${selectedOffice}:`, error);
      setApiClientTestStatus('error');
      setApiClientTestError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Test fetching lookups
  const testFetchLookups = async () => {
    setLookupStatus('loading');
    setLookupError(null);
    
    try {
      const credentials = getCredentials();
      console.log(`[Client] Fetching lookups for ${selectedOffice}...`);
      const client = new ReiApiCcaClient(credentials);
      const result = await client.getLookupNames();
      
      console.log(`[Client] Lookups fetch result for ${selectedOffice}:`, result);
      setLookups(result);
      setLookupStatus('success');
    } catch (error) {
      console.error(`[Client] Fetch lookups failed for ${selectedOffice}:`, error);
      setLookupStatus('error');
      setLookupError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">REI API CCA Test Page</h1>
      <p className="mb-8 text-gray-600">
        This page allows you to test the REI API CCA client implementation.
        Click the buttons below to test different API endpoints.
      </p>
      
      {/* Office Selection */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Select Office</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedOffice('AZURA')}
            className={`px-4 py-2 rounded ${selectedOffice === 'AZURA' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            RE/MAX AZURA (R1040029)
          </button>
          <button
            onClick={() => setSelectedOffice('BLUE_OCEAN')}
            className={`px-4 py-2 rounded ${selectedOffice === 'BLUE_OCEAN' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            RE/MAX BLUE OCEAN (R1040028)
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Currently testing: <span className="font-semibold">{selectedOffice === 'AZURA' ? 'RE/MAX AZURA (R1040029)' : 'RE/MAX BLUE OCEAN (R1040028)'}</span>
        </p>
      </div>

      {/* Authentication Test */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Authentication Test</h2>
        <button
          onClick={testAuthentication}
          disabled={authStatus === 'loading'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {authStatus === 'loading' ? 'Testing...' : 'Test Authentication'}
        </button>
        
        <div className="mt-4">
          <p className="font-medium">Status: 
            <span className={`ml-2 ${
              authStatus === 'success' ? 'text-green-600' : 
              authStatus === 'error' ? 'text-red-600' : 
              authStatus === 'loading' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {authStatus === 'idle' ? 'Not tested' : 
               authStatus === 'loading' ? 'Testing...' : 
               authStatus === 'success' ? 'Success ✅' : 'Failed ❌'}
            </span>
          </p>
          {authError && (
            <div className="mt-2 p-3 bg-red-100 text-red-800 rounded">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{authError}</p>
            </div>
          )}
        </div>
      </div>

      {/* Properties Test */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Properties API Test</h2>
        <button
          onClick={testFetchProperties}
          disabled={propertiesStatus === 'loading'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {propertiesStatus === 'loading' ? 'Fetching...' : 'Fetch Properties'}
        </button>
        
        <div className="mt-4">
          <p className="font-medium">Status: 
            <span className={`ml-2 ${
              propertiesStatus === 'success' ? 'text-green-600' : 
              propertiesStatus === 'error' ? 'text-red-600' : 
              propertiesStatus === 'loading' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {propertiesStatus === 'idle' ? 'Not tested' : 
               propertiesStatus === 'loading' ? 'Fetching...' : 
               propertiesStatus === 'success' ? 'Success ✅' : 'Failed ❌'}
            </span>
          </p>
          
          {propertiesError && (
            <div className="mt-2 p-3 bg-red-100 text-red-800 rounded">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{propertiesError}</p>
            </div>
          )}
          
          {properties && (
            <div className="mt-4">
              <p className="font-medium">Response:</p>
              <div className="mt-2 p-3 bg-gray-100 rounded overflow-auto max-h-60">
                <pre className="text-xs">{JSON.stringify(properties, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Agents Test */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Agents API Test</h2>
        <button
          onClick={testFetchAgents}
          disabled={agentsStatus === 'loading'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {agentsStatus === 'loading' ? 'Fetching...' : 'Fetch Agents'}
        </button>
        
        <div className="mt-4">
          <p className="font-medium">Status: 
            <span className={`ml-2 ${
              agentsStatus === 'success' ? 'text-green-600' : 
              agentsStatus === 'error' ? 'text-red-600' : 
              agentsStatus === 'loading' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {agentsStatus === 'idle' ? 'Not tested' : 
               agentsStatus === 'loading' ? 'Fetching...' : 
               agentsStatus === 'success' ? 'Success ✅' : 'Failed ❌'}
            </span>
          </p>
          
          {agentsError && (
            <div className="mt-2 p-3 bg-red-100 text-red-800 rounded">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{agentsError}</p>
            </div>
          )}
          
          {agents && (
            <div className="mt-4">
              <p className="font-medium">Response:</p>
              <div className="mt-2 p-3 bg-gray-100 rounded overflow-auto max-h-60">
                <pre className="text-xs">{JSON.stringify(agents, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lookups Test */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Lookups API Test</h2>
        <button
          onClick={testFetchLookups}
          disabled={lookupStatus === 'loading'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {lookupStatus === 'loading' ? 'Fetching...' : 'Fetch Lookups'}
        </button>
        
        <div className="mt-4">
          <p className="font-medium">Status: 
            <span className={`ml-2 ${
              lookupStatus === 'success' ? 'text-green-600' : 
              lookupStatus === 'error' ? 'text-red-600' : 
              lookupStatus === 'loading' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {lookupStatus === 'idle' ? 'Not tested' : 
               lookupStatus === 'loading' ? 'Fetching...' : 
               lookupStatus === 'success' ? 'Success ✅' : 'Failed ❌'}
            </span>
          </p>
          
          {lookupError && (
            <div className="mt-2 p-3 bg-red-100 text-red-800 rounded">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{lookupError}</p>
            </div>
          )}
          
          {lookups && (
            <div className="mt-4">
              <p className="font-medium">Response:</p>
              <div className="mt-2 p-3 bg-gray-100 rounded overflow-auto max-h-60">
                <pre className="text-xs">{JSON.stringify(lookups, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800">Important Notes</h3>
        <ul className="mt-2 list-disc list-inside text-yellow-700">
          <li>This page makes real API calls to the REI API CCA</li>
          <li>Check the browser console for detailed logs</li>
          <li>API responses are limited to 5 items for better readability</li>
          <li>Authentication is handled automatically by the API client</li>
        </ul>
      </div>
    </div>
  );
}
