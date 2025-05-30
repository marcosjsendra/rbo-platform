/**
 * src/lib/supabase/apply-migrations.ts
 * 
 * Script to apply database migrations to Supabase
 * 
 * This script reads SQL migration files from the migrations directory
 * and applies them to the Supabase database.
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Check if environment variables are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  process.exit(1);
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  process.exit(1);
}

// Create Supabase client with service role key for full database access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Path to migrations directory
const migrationsDir = path.join(__dirname, 'migrations');

/**
 * Apply migrations to the database
 */
async function applyMigrations() {
  console.log('Starting database migrations...');
  
  try {
    // Create migrations table if it doesn't exist
    const { error: createTableError } = await supabase.rpc('exec', {
      query: `
        CREATE TABLE IF NOT EXISTS public.migrations (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL UNIQUE,
          applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `
    });
    
    if (createTableError) {
      console.error('Error creating migrations table:', createTableError);
      process.exit(1);
    }
    
    // Get list of migration files
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort to ensure migrations are applied in order
    
    console.log(`Found ${migrationFiles.length} migration files`);
    
    // Get list of already applied migrations
    const { data: appliedMigrations, error: getMigrationsError } = await supabase
      .from('migrations')
      .select('name');
    
    if (getMigrationsError) {
      console.error('Error getting applied migrations:', getMigrationsError);
      process.exit(1);
    }
    
    const appliedMigrationNames = new Set(appliedMigrations?.map(m => m.name) || []);
    
    // Apply each migration
    for (const file of migrationFiles) {
      if (appliedMigrationNames.has(file)) {
        console.log(`Migration ${file} already applied, skipping`);
        continue;
      }
      
      console.log(`Applying migration: ${file}`);
      
      // Read migration file
      const migrationPath = path.join(migrationsDir, file);
      const migration = fs.readFileSync(migrationPath, 'utf8');
      
      // Apply migration
      const { error: migrationError } = await supabase.rpc('exec', {
        query: migration
      });
      
      if (migrationError) {
        console.error(`Error applying migration ${file}:`, migrationError);
        process.exit(1);
      }
      
      // Record migration as applied
      const { error: recordError } = await supabase
        .from('migrations')
        .insert({ name: file });
      
      if (recordError) {
        console.error(`Error recording migration ${file}:`, recordError);
        process.exit(1);
      }
      
      console.log(`Successfully applied migration: ${file}`);
    }
    
    console.log('All migrations applied successfully');
  } catch (error) {
    console.error('Error applying migrations:', error);
    process.exit(1);
  }
}

// Run migrations
applyMigrations().catch(error => {
  console.error('Unhandled error during migrations:', error);
  process.exit(1);
});