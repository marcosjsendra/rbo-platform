-- Manual setup script for sync_metadata table
-- Run this in the Supabase SQL editor if the automated setup fails

-- Create sync_metadata table
CREATE TABLE IF NOT EXISTS public.sync_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  brand TEXT NOT NULL,
  last_sync_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT sync_metadata_entity_brand_unique UNIQUE (entity_type, brand)
);

-- Add comment to the table
COMMENT ON TABLE public.sync_metadata IS 'Tracks synchronization status for different entity types and brands';

-- Create trigger to automatically update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to the sync_metadata table
DROP TRIGGER IF EXISTS update_sync_metadata_updated_at ON public.sync_metadata;
CREATE TRIGGER update_sync_metadata_updated_at
BEFORE UPDATE ON public.sync_metadata
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add brand column to properties table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'brand'
  ) THEN
    ALTER TABLE public.properties ADD COLUMN brand TEXT;
    COMMENT ON COLUMN public.properties.brand IS 'Brand the property belongs to (AZURA, BLUE_OCEAN)';
  END IF;
END $$;

-- Add brand column to agents table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'agents' 
    AND column_name = 'brand'
  ) THEN
    ALTER TABLE public.agents ADD COLUMN brand TEXT;
    COMMENT ON COLUMN public.agents.brand IS 'Brand the agent belongs to (AZURA, BLUE_OCEAN)';
  END IF;
END $$;

-- Create index on entity_type and brand for faster lookups
CREATE INDEX IF NOT EXISTS sync_metadata_entity_brand_idx ON public.sync_metadata (entity_type, brand);

-- Create indexes on brand columns for properties and agents tables
CREATE INDEX IF NOT EXISTS properties_brand_idx ON public.properties (brand);
CREATE INDEX IF NOT EXISTS agents_brand_idx ON public.agents (brand);
