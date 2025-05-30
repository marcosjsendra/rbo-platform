/**
 * src/lib/types/supabase.ts
 * 
 * Type definitions for Supabase database
 * This file provides TypeScript types for the Supabase database schema
 * Generated types can be updated using the Supabase CLI
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          listing_id: string
          title: string
          description: string | null
          price: number | null
          currency: string | null
          property_type: string | null
          status: string | null
          bedrooms: number | null
          bathrooms: number | null
          size: number | null
          size_unit: string | null
          location: string | null
          address: string | null
          city: string | null
          state: string | null
          country: string | null
          postal_code: string | null
          latitude: number | null
          longitude: number | null
          features: Json | null
          images: string[] | null
          agent_id: string | null
          zone_id: string | null
          raw_data: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          listing_id: string
          title: string
          description?: string | null
          price?: number | null
          currency?: string | null
          property_type?: string | null
          status?: string | null
          bedrooms?: number | null
          bathrooms?: number | null
          size?: number | null
          size_unit?: string | null
          location?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          features?: Json | null
          images?: string[] | null
          agent_id?: string | null
          zone_id?: string | null
          raw_data?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          listing_id?: string
          title?: string
          description?: string | null
          price?: number | null
          currency?: string | null
          property_type?: string | null
          status?: string | null
          bedrooms?: number | null
          bathrooms?: number | null
          size?: number | null
          size_unit?: string | null
          location?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          features?: Json | null
          images?: string[] | null
          agent_id?: string | null
          zone_id?: string | null
          raw_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_agent_id_fkey"
            columns: ["agent_id"]
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_zone_id_fkey"
            columns: ["zone_id"]
            referencedRelation: "zones"
            referencedColumns: ["id"]
          }
        ]
      }
      agents: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          agent_id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          bio: string | null
          image_url: string | null
          title: string | null
          specialties: string[] | null
          languages: string[] | null
          social_media: Json | null
          raw_data: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          agent_id: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          bio?: string | null
          image_url?: string | null
          title?: string | null
          specialties?: string[] | null
          languages?: string[] | null
          social_media?: Json | null
          raw_data?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          agent_id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          bio?: string | null
          image_url?: string | null
          title?: string | null
          specialties?: string[] | null
          languages?: string[] | null
          social_media?: Json | null
          raw_data?: Json | null
        }
        Relationships: []
      }
      zones: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          image_url: string | null
          latitude: number | null
          longitude: number | null
          features: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          features?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          features?: Json | null
        }
        Relationships: []
      }
      sync_metadata: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          entity_type: string
          brand: string
          last_sync_time: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          entity_type: string
          brand: string
          last_sync_time: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          entity_type?: string
          brand?: string
          last_sync_time?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper type for Supabase client responses
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = { error: { message: string; details: string; hint: string; code: string } }
