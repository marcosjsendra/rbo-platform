/**
 * scripts/apply-migrations.js
 * 
 * Script to apply database migrations to Supabase
 * 
 * This script runs the apply-migrations.ts script to apply all SQL migrations
 * to the Supabase database, including the sync_metadata table.
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import and run the apply-migrations script
import '../src/lib/supabase/apply-migrations.js';

// Log a message to indicate the script is running
console.log('Running database migrations...');
console.log('This script will apply all SQL migrations to the Supabase database.');
console.log('Make sure your .env file contains the following variables:');
console.log('- NEXT_PUBLIC_SUPABASE_URL');
console.log('- SUPABASE_SERVICE_ROLE_KEY');
