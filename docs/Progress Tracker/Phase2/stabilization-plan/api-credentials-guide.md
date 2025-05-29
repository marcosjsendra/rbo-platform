# API Credentials Configuration Guide

This guide explains how to configure and manage API credentials for the RE/MAX Blue Ocean website, specifically for the REI API CCA integration.

## Environment Variables Structure

The application uses environment variables to manage API credentials securely. Following Next.js best practices, we separate variables into two categories:

1. **Public Variables** (in `.env`): Variables with the `NEXT_PUBLIC_` prefix that are accessible in both client and server code
2. **Server-only Variables** (in `.env.local`): Sensitive variables that are only accessible in server-side code

### Public Environment Variables (`.env`)

These variables are safe to expose to the browser and are prefixed with `NEXT_PUBLIC_`:

```env
# REI API CCA Base URLs
NEXT_PUBLIC_REMAX_AZURA_API_URL=https://remax-cca.com/api/v1
NEXT_PUBLIC_REMAX_BLUE_OCEAN_API_URL=https://remax-cca.com/api/v1

# Public Token Refresh Settings
NEXT_PUBLIC_TOKEN_REFRESH_BUFFER_MINUTES=30

# Supabase Public Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Server-only Environment Variables (`.env.local`)

These variables contain sensitive information and are only accessible in server-side code:

```env
# REI API CCA Credentials for RE/MAX AZURA
REMAX_AZURA_API_KEY=your-api-key-here
REMAX_AZURA_INTEGRATOR_ID=your-integrator-id-here
REMAX_AZURA_SECRET_KEY=your-secret-key-here

# REI API CCA Credentials for RE/MAX BLUE OCEAN
REMAX_BLUE_OCEAN_API_KEY=your-api-key-here
REMAX_BLUE_OCEAN_INTEGRATOR_ID=your-integrator-id-here
REMAX_BLUE_OCEAN_SECRET_KEY=your-secret-key-here

# Server-side Token Management Settings
TOKEN_REFRESH_BUFFER_MINUTES=30
```

## Security Considerations

- **Never commit the `.env.local` file to version control.** This file contains sensitive credentials.
- The `.env.example` file is provided as a template for both public and server-only variables.
- API keys and secret keys should be treated as sensitive information and only used server-side.
- Variables with the `NEXT_PUBLIC_` prefix are automatically exposed to the browser by Next.js.
- All authentication operations are performed on the server-side to protect credentials.

## How to Set Up Credentials

1. Copy the `.env.example` file to create both `.env` and `.env.local` files
2. In `.env`, set all the public variables (with `NEXT_PUBLIC_` prefix)
3. In `.env.local`, set all the server-only variables (API keys, secrets)
4. Ensure the token refresh buffer is set appropriately (default: 30 minutes)

## Vercel Deployment

When deploying to Vercel, you need to add all environment variables in the Vercel project settings:

1. Go to your Vercel project
2. Navigate to Settings > Environment Variables
3. Add all variables from both `.env` and `.env.local`
4. Redeploy your application to apply the changes

## Credential Rotation

If you need to rotate API credentials:

1. Update the `.env.local` file with the new credentials
2. If deployed, update the environment variables in your deployment platform
3. Restart the application to apply the changes
4. The token management system will automatically obtain new tokens with the updated credentials

## Troubleshooting

If you encounter authentication issues:

1. Verify that all environment variables are correctly set in both `.env` and `.env.local`
2. Check the server logs for authentication errors
3. Ensure the API credentials are valid and have not expired
4. Try forcing a token refresh by calling the authentication endpoint with the `forceRefresh` parameter set to `true`

## Related Files

- `.env` - Contains public variables (committed to version control)
- `.env.local` - Contains sensitive variables (not committed to version control)
- `.env.example` - Template for all required environment variables
- `src/lib/api/token-manager.ts` - Token management service
- `src/lib/api/api-client.ts` - API client that uses the credentials
- `src/app/api/rei-cca/auth/route.ts` - Authentication endpoint
- `next.config.js` - Next.js configuration
