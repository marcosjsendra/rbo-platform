/**
 * src/app/supabase-examples/page.tsx
 * 
 * Example page that demonstrates both server and client components using Supabase
 * This showcases the different approaches to using Supabase in Next.js App Router
 */

import SupabaseServerExample from '@/components/examples/SupabaseServerExample'
import SupabaseClientExample from '@/components/examples/SupabaseClientExample'

/**
 * Page that demonstrates both server and client components using Supabase
 */
export default function SupabaseExamplesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Supabase Client Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Server Component Example */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Server Component</h2>
          <p className="mb-4 text-gray-600">
            This example uses the <code className="bg-gray-100 px-1 py-0.5 rounded">createServerComponentClient</code> utility 
            from <code className="bg-gray-100 px-1 py-0.5 rounded">@/lib/supabase/server</code> to fetch data directly in a server component.
          </p>
          <SupabaseServerExample />
        </div>
        
        {/* Client Component Example */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Client Component</h2>
          <p className="mb-4 text-gray-600">
            This example uses the <code className="bg-gray-100 px-1 py-0.5 rounded">createClientComponentClient</code> utility 
            from <code className="bg-gray-100 px-1 py-0.5 rounded">@/lib/supabase/client</code> to fetch data in a client component with React hooks.
          </p>
          <SupabaseClientExample />
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">API Routes</h2>
        <p className="mb-4 text-gray-600">
          The <code className="bg-gray-100 px-1 py-0.5 rounded">createRouteHandlerClient</code> utility from <code className="bg-gray-100 px-1 py-0.5 rounded">@/lib/supabase/server</code> is used in API routes.
          Try the example API endpoints:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium mb-2">GET /api/properties</h3>
          <p className="text-sm text-gray-600 mb-4">Fetches properties with pagination</p>
          <div className="flex space-x-2">
            <a 
              href="/api/properties?limit=5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              Try GET Request
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
