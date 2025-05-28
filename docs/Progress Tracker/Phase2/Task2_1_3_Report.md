# Task 2.1.3: Create Database Schema for Properties, Zones, and Agents

## Date Completed
May 27, 2025

## Task Description
Enhance the database schema for properties, zones, and agents in the Supabase project to better support the RE/MAX Blue Ocean website requirements and align with the REI API CCA structure.

## Implementation Details

### 1. Enhanced Properties Table

Added additional fields to the properties table to better match the REI API CCA structure:

```sql
ALTER TABLE properties
  -- Add additional property details
  ADD COLUMN IF NOT EXISTS property_subtype TEXT,
  ADD COLUMN IF NOT EXISTS lot_size NUMERIC,
  ADD COLUMN IF NOT EXISTS lot_size_unit TEXT,
  ADD COLUMN IF NOT EXISTS year_built INTEGER,
  ADD COLUMN IF NOT EXISTS parking_spaces INTEGER,
  ADD COLUMN IF NOT EXISTS stories INTEGER,
  ADD COLUMN IF NOT EXISTS pets_allowed BOOLEAN,
  ADD COLUMN IF NOT EXISTS furnished BOOLEAN,
  
  -- Add location details
  ADD COLUMN IF NOT EXISTS postal_code TEXT,
  ADD COLUMN IF NOT EXISTS neighborhood TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS map_url TEXT,
  
  -- Add pricing details
  ADD COLUMN IF NOT EXISTS price_per_area NUMERIC,
  ADD COLUMN IF NOT EXISTS hoa_fee NUMERIC,
  ADD COLUMN IF NOT EXISTS hoa_fee_currency TEXT,
  ADD COLUMN IF NOT EXISTS price_reduced BOOLEAN,
  ADD COLUMN IF NOT EXISTS original_price NUMERIC,
  
  -- Add listing details
  ADD COLUMN IF NOT EXISTS listing_date TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS expiration_date TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS virtual_tour_url TEXT,
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
  
  -- Add agent and office references
  ADD COLUMN IF NOT EXISTS primary_agent_id UUID,
  ADD COLUMN IF NOT EXISTS secondary_agent_id UUID,
  ADD COLUMN IF NOT EXISTS office_name TEXT,
  
  -- Add zone reference
  ADD COLUMN IF NOT EXISTS zone_id UUID;
```

### 2. Enhanced Agents Table

Added additional fields to the agents table to better support the RE/MAX Blue Ocean website requirements:

```sql
ALTER TABLE agents
  -- Add additional contact details
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS languages TEXT[],
  ADD COLUMN IF NOT EXISTS social_media JSONB,
  ADD COLUMN IF NOT EXISTS specialties TEXT[],
  ADD COLUMN IF NOT EXISTS certifications TEXT[],
  
  -- Add professional details
  ADD COLUMN IF NOT EXISTS years_of_experience INTEGER,
  ADD COLUMN IF NOT EXISTS license_number TEXT,
  ADD COLUMN IF NOT EXISTS position TEXT,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS rating NUMERIC,
  
  -- Add additional media
  ADD COLUMN IF NOT EXISTS additional_images JSONB,
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  
  -- Add office details
  ADD COLUMN IF NOT EXISTS office_name TEXT,
  ADD COLUMN IF NOT EXISTS office_address TEXT,
  ADD COLUMN IF NOT EXISTS office_phone TEXT,
  ADD COLUMN IF NOT EXISTS office_email TEXT,
  
  -- Add zone reference for primary area of operation
  ADD COLUMN IF NOT EXISTS primary_zone_id UUID;
```

### 3. Enhanced Zones Table

Added additional fields to the zones table to better support the RE/MAX Blue Ocean website requirements:

```sql
ALTER TABLE zones
  -- Add additional details
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS short_description TEXT,
  ADD COLUMN IF NOT EXISTS full_description TEXT,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  
  -- Add media fields
  ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
  ADD COLUMN IF NOT EXISTS gallery_images JSONB,
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  
  -- Add location details
  ADD COLUMN IF NOT EXISTS region TEXT,
  ADD COLUMN IF NOT EXISTS province TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Costa Rica',
  
  -- Add additional information
  ADD COLUMN IF NOT EXISTS amenities JSONB,
  ADD COLUMN IF NOT EXISTS attractions JSONB,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS display_order INTEGER;
```

### 4. Created Supporting Tables

Created additional tables to support the property listings functionality:

#### Property Images Table
```sql
CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL,
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    display_order INTEGER,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_property_images_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

#### Property Features Table
```sql
CREATE TABLE IF NOT EXISTS property_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    icon TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Property Types Table
```sql
CREATE TABLE IF NOT EXISTS property_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Property Statuses Table
```sql
CREATE TABLE IF NOT EXISTS property_statuses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Junction Tables for Many-to-Many Relationships
```sql
CREATE TABLE IF NOT EXISTS property_feature_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL,
    feature_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_property_feature_links_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    CONSTRAINT fk_property_feature_links_feature FOREIGN KEY (feature_id) REFERENCES property_features(id) ON DELETE CASCADE,
    CONSTRAINT unique_property_feature UNIQUE (property_id, feature_id)
);

CREATE TABLE IF NOT EXISTS agent_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID NOT NULL,
    zone_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_agent_zones_agent FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE CASCADE,
    CONSTRAINT fk_agent_zones_zone FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE CASCADE,
    CONSTRAINT unique_agent_zone UNIQUE (agent_id, zone_id)
);
```

#### Sync Logs Table for API Integration
```sql
CREATE TABLE IF NOT EXISTS sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL, -- 'property', 'agent', etc.
    operation TEXT NOT NULL, -- 'create', 'update', 'delete'
    entity_id TEXT NOT NULL, -- External ID from REI API CCA
    status TEXT NOT NULL, -- 'success', 'error'
    message TEXT,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Created Views and Functions

Created views and functions to make data access easier:

#### Featured Properties View
```sql
CREATE OR REPLACE VIEW featured_properties AS
SELECT 
    p.*,
    pt.name AS property_type_name,
    ps.name AS status_name,
    ps.color AS status_color,
    z.name AS zone_name,
    z.slug AS zone_slug,
    -- Additional fields for images, features, and primary agent
    -- ...
FROM 
    properties p
LEFT JOIN 
    property_types pt ON p.property_type_id = pt.id
LEFT JOIN 
    property_statuses ps ON p.property_status_id = ps.id
LEFT JOIN 
    zones z ON p.zone_id = z.id
WHERE 
    p.featured = true;
```

#### Featured Agents View
```sql
CREATE OR REPLACE VIEW featured_agents AS
SELECT 
    a.*,
    z.name AS primary_zone_name,
    z.slug AS primary_zone_slug,
    -- Additional fields for zones and property count
    -- ...
FROM 
    agents a
LEFT JOIN 
    zones z ON a.primary_zone_id = z.id
WHERE 
    a.featured = true;
```

#### Featured Zones View
```sql
CREATE OR REPLACE VIEW featured_zones AS
SELECT 
    z.*,
    -- Additional fields for property count and agent count
    -- ...
FROM 
    zones z
WHERE 
    z.featured = true
ORDER BY 
    z.display_order;
```

#### Get Properties By Zone Function
```sql
CREATE OR REPLACE FUNCTION get_properties_by_zone(input_zone_slug TEXT, limit_count INTEGER DEFAULT 10, offset_count INTEGER DEFAULT 0)
RETURNS TABLE (
    -- Return fields
    -- ...
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        -- Query fields
        -- ...
    FROM 
        properties p
    -- Joins and conditions
    -- ...
    WHERE 
        z.slug = input_zone_slug
    ORDER BY 
        p.featured DESC, p.created_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;
```

#### Get Agents By Zone Function
```sql
CREATE OR REPLACE FUNCTION get_agents_by_zone(input_zone_slug TEXT, limit_count INTEGER DEFAULT 10, offset_count INTEGER DEFAULT 0)
RETURNS TABLE (
    -- Return fields
    -- ...
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        -- Query fields
        -- ...
    FROM 
        agents a
    -- Joins and conditions
    -- ...
    WHERE 
        z.slug = input_zone_slug
    ORDER BY 
        a.featured DESC, a.last_name ASC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;
```

#### Search Properties Function
```sql
CREATE OR REPLACE FUNCTION search_properties(
    search_term TEXT DEFAULT NULL,
    min_price NUMERIC DEFAULT NULL,
    max_price NUMERIC DEFAULT NULL,
    min_bedrooms INTEGER DEFAULT NULL,
    min_bathrooms INTEGER DEFAULT NULL,
    property_type_id UUID DEFAULT NULL,
    zone_id UUID DEFAULT NULL,
    limit_count INTEGER DEFAULT 10,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    -- Return fields
    -- ...
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        -- Query fields
        -- ...
    FROM 
        properties p
    -- Joins and conditions
    -- ...
    WHERE 
        -- Search conditions
        -- ...
    ORDER BY 
        p.featured DESC, p.created_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;
```

### 6. Populated Supporting Tables with Initial Data

Populated the supporting tables with initial data to make the schema more useful:

#### Property Types
- Residential
- Commercial
- Land
- Multi-Family
- Luxury
- Vacation
- Investment
- Beachfront
- Oceanview
- Mountain

#### Property Statuses
- Active
- Pending
- Sold
- Withdrawn
- Expired
- Coming Soon
- Reduced
- New

#### Property Features
- Interior features (Air Conditioning, Heating, Fireplace, etc.)
- Exterior features (Pool, Spa/Hot Tub, Deck, etc.)
- Security features (Security System, Gated Entry, etc.)
- Amenities (Gym, Tennis Court, Golf Course, etc.)
- Views (Ocean View, Mountain View, City View, etc.)

#### Updated Zones with Additional Information
- Added slugs, short descriptions, and display order
- Set featured flags for Nosara, Samara, and Punta Islita

## Challenges and Solutions

### Challenge 1: Complex Schema Design
**Challenge**: Designing a comprehensive schema that could efficiently store and retrieve property listings, agent information, and zone data while maintaining proper relationships between tables.

**Solution**: Created a normalized database schema with appropriate relationships between tables. Used junction tables for many-to-many relationships (e.g., property-feature, agent-zone) and added foreign keys to establish relationships between primary tables.

### Challenge 2: SQL Syntax Errors
**Challenge**: Encountered SQL syntax errors when creating complex views and functions.

**Solution**: Carefully reviewed and fixed the SQL syntax errors, particularly with string literals and parameter naming. Used proper SQL escaping for string literals with apostrophes and ensured unique parameter names in functions.

### Challenge 3: Balancing Normalization and Performance
**Challenge**: Finding the right balance between database normalization and query performance.

**Solution**: Created denormalized views (featured_properties, featured_agents, featured_zones) to make common queries faster while maintaining a normalized schema for data integrity. Added appropriate indexes on frequently queried fields to improve search performance.

## Next Steps

1. Set up Row Level Security policies (Task 2.1.4)
2. Create database indexes for performance optimization (Task 2.1.5)
3. Implement OAuth token management with refresh mechanism (Task 2.2.2)
4. Set up environment variables for API credentials (Task 2.2.3)
5. Create Supabase client utilities for server and client components (Task 2.2.4)
6. Implement data synchronization service (Task 2.2.5)

## Resources

- [Supabase Database Schema Design](https://supabase.com/docs/guides/database/tables)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [REI API CCA Documentation](https://remax-cca.com/api/v1)
- [Database Normalization Best Practices](https://www.postgresql.org/docs/current/ddl-constraints.html)