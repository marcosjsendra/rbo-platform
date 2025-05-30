/**
 * src/app/api/test-auth/route.ts
 * Test endpoint for OAuth token generation
 */

import { NextResponse } from 'next/server';
import axios from 'axios';

// Function to get OAuth token
async function getOAuthToken(apiKey: string, integratorId: string, secretKey: string) {
  console.log('src/app/api/test-auth/route.ts: Attempting to get OAuth token...');
  
  try {
    // Use the base URL from the documentation
    const tokenUrl = 'https://remax-cca.com/api/v1/oauth/token';
    console.log('src/app/api/test-auth/route.ts: Token URL:', tokenUrl);

    // Create form data with all required fields
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password'); // Changed to password grant type
    formData.append('integratorID', integratorId); // Note the capital ID
    formData.append('secretkey', secretKey);
    formData.append('apikey', apiKey);

    // Log request details (excluding sensitive info)
    console.log('src/app/api/test-auth/route.ts: Request details:', {
      url: tokenUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Use axios with form data
    const response = await axios({
      method: 'POST',
      url: tokenUrl,
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });

    console.log('src/app/api/test-auth/route.ts: Token generated successfully');
    return {
      success: true,
      token: response.data.access_token,
      expires_in: response.data.expires_in,
      response: response.data
    };
  } catch (error) {
    // Log the complete error details for debugging
    if (axios.isAxiosError(error)) {
      console.error('src/app/api/test-auth/route.ts: Request failed:', {
        url: error.config?.url,
        method: error.config?.method,
        headers: {
          ...error.config?.headers
        },
        data: error.config?.data,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        }
      });

      // Log the exact error for debugging
      if (error.response?.data) {
        console.error('src/app/api/test-auth/route.ts: Error details:', error.response.data);
      }
    }

    return {
      success: false,
      error: axios.isAxiosError(error) 
        ? `Failed to get token: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`
        : error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function GET() {
  console.log('src/app/api/test-auth/route.ts: Testing OAuth token generation...');

  // Test AZURA first
  console.log('src/app/api/test-auth/route.ts: Testing AZURA token generation...');
  console.log('src/app/api/test-auth/route.ts: Using AZURA credentials:', {
    apiKey: process.env.REMAX_AZURA_API_KEY?.substring(0, 8) + '...',
    integratorId: process.env.REMAX_AZURA_INTEGRATOR_ID
  });
  
  const azuraResult = await getOAuthToken(
    process.env.REMAX_AZURA_API_KEY!,
    process.env.REMAX_AZURA_INTEGRATOR_ID!,
    process.env.REMAX_AZURA_SECRET_KEY!
  );

  // Test BLUE_OCEAN second
  console.log('src/app/api/test-auth/route.ts: Testing BLUE_OCEAN token generation...');
  console.log('src/app/api/test-auth/route.ts: Using BLUE_OCEAN credentials:', {
    apiKey: process.env.REMAX_BLUE_OCEAN_API_KEY?.substring(0, 8) + '...',
    integratorId: process.env.REMAX_BLUE_OCEAN_INTEGRATOR_ID
  });
  
  const blueOceanResult = await getOAuthToken(
    process.env.REMAX_BLUE_OCEAN_API_KEY!,
    process.env.REMAX_BLUE_OCEAN_INTEGRATOR_ID!,
    process.env.REMAX_BLUE_OCEAN_SECRET_KEY!
  );

  // Return results with full response data for debugging
  return NextResponse.json({
    azura: {
      success: azuraResult.success,
      expires_in: azuraResult.expires_in,
      error: azuraResult.error,
      response: azuraResult.response
    },
    blueOcean: {
      success: blueOceanResult.success,
      expires_in: blueOceanResult.expires_in,
      error: blueOceanResult.error,
      response: blueOceanResult.response
    },
  });
}