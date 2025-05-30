/**
 * src/app/test/components/page.tsx
 * Test page for validating property and agent display components
 */

'use client'

import { useState, useEffect } from 'react'
import { getProperties, getAgents, PropertyFilterOptions, AgentFilterOptions } from '@/lib/data'
import PropertyCard from '@/components/properties/PropertyCard'
import PropertyDetailView from '@/components/properties/PropertyDetailView'
import AgentCard from '@/components/agents/AgentCard'
import AgentProfileView from '@/components/agents/AgentProfileView'
import { Database } from '@/lib/types/supabase'

type Property = Database['public']['Tables']['properties']['Row']
type Agent = Database['public']['Tables']['agents']['Row']

export default function TestComponents() {
  // State management
  const [properties, setProperties] = useState<Property[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [activeView, setActiveView] = useState<'list' | 'detail'>('list')
  const [loading, setLoading] = useState({
    properties: true,
    agents: true
  })

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('src/app/test/components/page.tsx: Fetching initial data...')
        const [propertiesData, agentsData] = await Promise.all([
          getProperties(),
          getAgents()
        ])
        setProperties(propertiesData)
        setAgents(agentsData)
      } catch (error) {
        console.error('src/app/test/components/page.tsx: Error fetching data:', error)
      } finally {
        setLoading({
          properties: false,
          agents: false
        })
      }
    }
    fetchData()
  }, [])

  // Handle property filter changes
  const handlePropertyFilterChange = async (filters: PropertyFilterOptions) => {
    try {
      console.log('src/app/test/components/page.tsx: Applying property filters:', filters)
      setLoading(prev => ({ ...prev, properties: true }))
      const filteredProperties = await getProperties(filters)
      setProperties(filteredProperties)
    } catch (error) {
      console.error('src/app/test/components/page.tsx: Error filtering properties:', error)
    } finally {
      setLoading(prev => ({ ...prev, properties: false }))
    }
  }

  // Handle agent filter changes
  const handleAgentFilterChange = async (filters: AgentFilterOptions) => {
    try {
      console.log('src/app/test/components/page.tsx: Applying agent filters:', filters)
      setLoading(prev => ({ ...prev, agents: true }))
      const filteredAgents = await getAgents(filters)
      setAgents(filteredAgents)
    } catch (error) {
      console.error('src/app/test/components/page.tsx: Error filtering agents:', error)
    } finally {
      setLoading(prev => ({ ...prev, agents: false }))
    }
  }

  // Map Supabase property data to PropertyCard props
  const mapPropertyToCardProps = (property: Property) => ({
    id: property.id,
    title: property.title || 'Untitled Property',
    location: property.location || 'Location not specified',
    price: property.price || 0,
    bedrooms: property.bedrooms || undefined,
    bathrooms: property.bathrooms || undefined,
    area: property.size || 0,
    areaUnit: property.size_unit || 'sq ft',
    imageUrl: property.images?.[0] || undefined,
    status: (property.status as 'for-sale' | 'for-rent' | 'sold' | 'pending') || 'for-sale'
  })

  // Map Supabase agent data to AgentCard props
  const mapAgentToCardProps = (agent: Agent) => ({
    id: agent.id,
    firstName: agent.first_name || '',
    lastName: agent.last_name || '',
    title: agent.title || undefined,
    email: agent.email || undefined,
    phone: agent.phone || undefined,
    imageUrl: agent.image_url || undefined,
    specialties: (agent.specialties as string[]) || [],
    languages: (agent.languages as string[]) || [],
    // Default to BLUE_OCEAN as per project requirements
    brand: 'BLUE_OCEAN' as const
  })

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Component Testing Page</h1>

      {activeView === 'list' ? (
        <div className="space-y-8">
          {/* Properties Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Properties</h2>
            {loading.properties ? (
              <div className="p-6 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">Loading properties...</p>
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(property => (
                  <div 
                    key={property.id} 
                    onClick={() => {
                      setSelectedProperty(property)
                      setActiveView('detail')
                    }}
                  >
                    <PropertyCard {...mapPropertyToCardProps(property)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">No properties found. Please check your Supabase connection and data.</p>
              </div>
            )}
          </section>

          {/* Agents Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Agents</h2>
            {loading.agents ? (
              <div className="p-6 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">Loading agents...</p>
              </div>
            ) : agents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map(agent => (
                  <div 
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgent(agent)
                      setActiveView('detail')
                    }}
                  >
                    <AgentCard {...mapAgentToCardProps(agent)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">No agents found. Please check your Supabase connection and data.</p>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
              onClick={() => setActiveView('list')}
            >
              Back to List
            </button>
          </div>

          {selectedProperty && (
            <PropertyDetailView property={selectedProperty} />
          )}

          {selectedAgent && (
            <AgentProfileView
              agent={selectedAgent}
              listedProperties={properties.filter(p => p.agent_id === selectedAgent.id)}
            />
          )}
        </div>
      )}
    </div>
  )
}