/**
 * scripts/apply-migration.js
 * 
 * Script to apply the sync_metadata table migration to the Supabase database
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase connection details
const supabaseUrl = 'https://tvqttckefwgvmpcicwym.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2cXR0Y2tlZndndm1wY2ljd3ltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODM2NjU4OCwiZXhwIjoyMDYzOTQyNTg4fQ.JZjqQkIxV8PQzwAQ4MbHzk9w9h9EqGX8ITdWDFLBVQU';

// Create Supabase client with service role key for full database access
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Path to the migration file
const migrationFilePath = path.join(__dirname, '..', 'src', 'lib', 'supabase', 'migrations', '20250528_create_sync_metadata_table.sql');

/**
 * Apply the migration to the database
 */
async function applyMigration() {
  console.log('Starting database migration...');
  
  try {
    // Read the migration file
    const migrationSql = fs.readFileSync(migrationFilePath, 'utf8');
    console.log(`Read migration file: ${migrationFilePath}`);
    
    // Apply the migration
    const { error } = await supabase.rpc('exec', {
      query: migrationSql
    });
    
    if (error) {
      console.error('Error applying migration:', error);
      process.exit(1);
    }
    
    console.log('Migration applied successfully!');
    
    // Verify that the sync_metadata table was created
    const { data, error: verifyError } = await supabase
      .from('sync_metadata')
      .select('*');
    
    if (verifyError) {
      console.error('Error verifying sync_metadata table:', verifyError);
      process.exit(1);
    }
    
    console.log('Sync metadata records:', data);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Unhandled error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
applyMigration();
