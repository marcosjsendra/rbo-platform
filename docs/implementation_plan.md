# RE/MAX Real Estate Website - Implementation Plan

## 📊 Progress Tracker

### Phase 1: Setup & Static Pages

- [x] [1.1 Initialize Next.js project with TypeScript](./Progress%20Tracker/Phase1/Task1_Report.md)
- [x] [1.2 Set up Tailwind CSS and basic styling](./Progress%20Tracker/Phase1/Task2_Report.md)
- [x] [1.3 Create layout components (Header, Footer, Navigation)](./Progress%20Tracker/Phase1/Task3_Report.md)
- [ ] 1.4 Implement static pages:
  - [x] [1.4.1 Home Page](./Progress%20Tracker/Phase1/Task4_1_Report.md)
  - [x] [1.4.2 About Us](./Progress%20Tracker/Phase1/Task1_4_2_Report.md)
  - [x] [1.4.3 Services](./Progress%20Tracker/Phase1/Task1_4_3_Report.md)
  - [x] [1.4.4 Blue Zone](./Progress%20Tracker/Phase1/Task1_4_4_Report.md)
  - [x] [1.4.5 The Team](./Progress%20Tracker/Phase1/Task1_4_5_Report.md)
  - [x] [1.4.6 Contact Us](./Progress%20Tracker/Phase1/Task1_4_6_Report.md)

### Phase 2: API Integration

- [ ] 2.1 Set up API client with authentication
  - [x] [2.1.1 Create API service module for REI API CCA](./Progress%20Tracker/Phase2/Task2_1_1_Report.md)
  - [ ] 2.1.2 Implement OAuth token management with refresh mechanism
  - [ ] 2.1.3 Set up environment variables for API credentials
  - [ ] 2.1.4 Create database schema for property and agent data
  - [ ] 2.1.5 Implement data synchronization service
- [ ] 2.2 Implement property listing page
  - [ ] 2.2.1 Design property card component
  - [ ] 2.2.2 Create property grid/list layout
  - [ ] 2.2.3 Implement property data fetching with React Query
  - [ ] 2.2.4 Add property image optimization
  - [ ] 2.2.5 Create property type and status indicators
- [ ] 2.3 Create property detail page
  - [ ] 2.3.1 Design image gallery/carousel
  - [ ] 2.3.2 Implement property details section
  - [ ] 2.3.3 Add property location map
  - [ ] 2.3.4 Create agent contact card
  - [ ] 2.3.5 Add related/similar properties section
- [ ] 2.4 Set up agent directory
  - [ ] 2.4.1 Design agent card component
  - [ ] 2.4.2 Create agent grid layout
  - [ ] 2.4.3 Implement agent data fetching
  - [ ] 2.4.4 Create agent detail page
  - [ ] 2.4.5 Add agent property listings section

### Phase 3: Search & Filtering

- [ ] 3.1 Implement search functionality
  - [ ] 3.1.1 Create search input component
  - [ ] 3.1.2 Implement search API integration
  - [ ] 3.1.3 Add search results page
  - [ ] 3.1.4 Implement search history and suggestions

### Phase 4: Deployment & Performance Optimization

- [x] 4.1 Set up Vercel deployment
  - [x] [4.1.1 Configure environment variables for API credentials](./vercelDeployment/deployment_guide.md)
  - [x] [4.1.2 Fix ESLint and TypeScript errors](./vercelDeployment/deployment_guide.md)
  - [x] [4.1.3 Deploy to production environment](./vercelDeployment/deployment_guide.md)
  - [ ] 4.1.4 Set up custom domain (pending)
- [ ] 4.2 Performance optimization
  - [ ] 4.2.1 Implement image optimization strategies
  - [ ] 4.2.2 Add caching mechanisms for API responses
  - [ ] 4.2.3 Configure Incremental Static Regeneration (ISR)
  - [ ] 4.2.4 Optimize bundle size and code splitting
- [ ] 4.3 Monitoring and analytics
  - [ ] 4.3.1 Set up Vercel Analytics
  - [ ] 4.3.2 Implement error tracking
  - [ ] 4.3.3 Configure performance monitoring
  - [ ] 4.3.4 Set up alerting for critical issues
  - [ ] 3.1.5 Add keyboard navigation for search
- [ ] 3.2 Add filtering options
  - [ ] 3.2.1 Design filter sidebar/modal
  - [ ] 3.2.2 Implement price range filter
  - [ ] 3.2.3 Add property type and features filters
  - [ ] 3.2.4 Create location-based filtering
  - [ ] 3.2.5 Implement filter state management
- [ ] 3.3 Set up sorting and pagination
  - [ ] 3.3.1 Create sorting dropdown component
  - [ ] 3.3.2 Implement server-side sorting
  - [ ] 3.3.3 Add pagination controls
  - [ ] 3.3.4 Implement infinite scroll option
  - [ ] 3.3.5 Preserve filter/sort state in URL
- [ ] 3.4 Add loading states and error handling
  - [ ] 3.4.1 Create skeleton loaders for property cards
  - [ ] 3.4.2 Implement loading indicators
  - [ ] 3.4.3 Add error boundary components
  - [ ] 3.4.4 Create empty state components
  - [ ] 3.4.5 Implement retry mechanisms

### Phase 4: Polish & Launch

- [ ] 4.1 Performance optimization
  - [ ] 4.1.1 Implement image lazy loading and optimization
  - [ ] 4.1.2 Add code splitting and dynamic imports
  - [ ] 4.1.3 Optimize database queries
  - [ ] 4.1.4 Implement caching strategies
  - [ ] 4.1.5 Run Lighthouse audits and address issues
- [ ] 4.2 SEO improvements
  - [ ] 4.2.1 Add metadata for all pages
  - [ ] 4.2.2 Implement structured data (JSON-LD)
  - [ ] 4.2.3 Create XML sitemap
  - [ ] 4.2.4 Add canonical URLs
  - [ ] 4.2.5 Implement Open Graph and Twitter card tags
- [ ] 4.3 Cross-browser testing
  - [ ] 4.3.1 Test in Chrome, Firefox, Safari, and Edge
  - [ ] 4.3.2 Test responsive design on various devices
  - [ ] 4.3.3 Fix browser-specific issues
  - [ ] 4.3.4 Implement fallbacks for unsupported features
  - [ ] 4.3.5 Conduct accessibility testing
- [ ] 4.4 Deploy to production
  - [ ] 4.4.1 Set up production environment variables
  - [ ] 4.4.2 Configure CI/CD pipeline
  - [ ] 4.4.3 Implement monitoring and error tracking
  - [ ] 4.4.4 Set up analytics
  - [ ] 4.4.5 Create deployment documentation

## 1. Technology Stack

### Core Technologies

- **Frontend Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI / Radix UI
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod
- **Maps**: Mapbox / Google Maps
- **Deployment**: Vercel

## 2. Project Structure

### Current Structure (as of May 2025)

```
remax-blueocean/
├── public/                    # Static assets
│   ├── images/                # Image assets
│   │   ├── remax-logo.svg
│   │   ├── contact-hero.jpg
│   │   └── (other image assets)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/                    # App router pages
│   │   ├── about-us/           # About Us page
│   │   │   └── page.tsx
│   │   ├── blue-zone/          # Blue Zone page
│   │   │   └── page.tsx
│   │   ├── contact-us/         # Contact Us page
│   │   │   └── page.tsx
│   │   ├── services/           # Services page
│   │   │   └── page.tsx
│   │   ├── team/              # Team page
│   │   │   └── page.tsx
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   │
│   ├── components/          # Reusable components
│   │   ├── home/              # Home page components
│   │   │   ├── Agents.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── FeaturedListings.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── RegionalZones.tsx
│   │   │
│   │   ├── layout/        # Layout components
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MainLayout.tsx
│   │   │
│   │   └── properties/    # Property components
│   │       └── PropertyCard.tsx
│   │
│   └── types/             # TypeScript type definitions
│       └── index.ts
│
├── .eslintrc.json         # ESLint configuration
├── .gitignore              # Git ignore file
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

### Future Phases Structure (Planned)

```
remax-blueocean/
├── src/
│   ├── app/
│   │   ├── (marketing)/        # Marketing pages
│   │   │   ├── about/         # About Us page
│   │   │   ├── services/      # Services page
│   │   │   └── contact/       # Contact page
│   │   ├── properties/        # Property listings
│   │   │   └── [id]/         # Property detail
│   │   └── agents/            # Agent directory
│   ├── components/
│   │   ├── ui/               # UI components
│   │   ├── properties/        # Property components
│   │   └── agents/            # Agent components
│   └── lib/                   # Utilities and configs
│       ├── api/               # API clients and types
│       └── utils/             # Helper functions
└── ...
```

_Note: The structure will evolve as we progress through the phases. This document will be updated accordingly._

## 3. API Integration

### Authentication

- OAuth 2.0 token-based authentication
- Secure token storage in HTTP-only cookies
- Token refresh mechanism

### API Client Setup

```typescript
// lib/api/remax/client.ts
import axios from "axios";

const REMAX_API_URL = "https://remax-cca.com/api/v1";

const remaxClient = axios.create({
  baseURL: REMAX_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
remaxClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default remaxClient;
```

### Key API Endpoints

1. **Properties**

   - Get property listings with filters
   - Get property by ID
   - Search properties

2. **Agents**
   - Get agents by office
   - Get agent details

## 4. Core Features

### Property Listing Page

- Grid/List view toggle
- Filter sidebar (price, bedrooms, property type)
- Sort options
- Pagination
- Responsive design

### Property Detail Page

- Image gallery
- Property details
- Agent contact card
- Map location
- Similar properties

### Agent Directory

- Grid of agent cards
- Search and filter
- Agent detail page with listings

## 5. Implementation Phases

### Phase 1: Setup & Static Pages (Week 1)

1. Initialize Next.js project with TypeScript
2. Set up Tailwind CSS and basic styling
3. Create layout components (Header, Footer, Navigation)
4. Implement static pages (Home, About, Services, Contact)

### Phase 2: API Integration (Week 2)

1. Set up API client with authentication
2. Implement property listing page
3. Create property detail page
4. Set up agent directory

### Phase 3: Search & Filtering (Week 3)

1. Implement search functionality
2. Add filtering options
3. Set up sorting and pagination
4. Add loading states and error handling

### Phase 4: Polish & Launch (Week 4)

1. Performance optimization
2. SEO improvements
3. Cross-browser testing
4. Deploy to production

## 6. Environment Configuration

Create `.env.local` file with:

```env
# RE/MAX API Configuration
NEXT_PUBLIC_REMAX_API_URL=https://remax-cca.com/api/v1

# RE/MAX AZURA
REMAX_AZURA_PUBLIC_KEY=3CD7819D-FD26-4DD6-ACAF-04D36E6365F5
REMAX_AZURA_PRIVATE_KEY=27097A65-9E97-460F-B6DA-8BBB548A893E
REMAX_AZURA_INTEGRATOR_ID=R1040029

# RE/MAX BLUE OCEAN
REMAX_BLUE_OCEAN_PUBLIC_KEY=07D693F7-12DC-4E7D-B652-E5CD38B591B4
REMAX_BLUE_OCEAN_PRIVATE_KEY=050DC15F-C892-445A-A516-05459A07B2F1
REMAX_BLUE_OCEAN_INTEGRATOR_ID=R1040028

# NextAuth.js
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

## 7. Next Steps

1. Set up project repository
2. Initialize Next.js project
3. Begin implementing static pages
4. Set up API client and authentication

## 8. Future Implementation: Internationalization (i18n)

### Task: Implement Multi-language Support

- **Description**: Add support for multiple languages (English and Spanish) to make the website accessible to a broader audience.
- **Components to Update**:
  - Create language context and provider
  - Implement language switcher in header
  - Add translation files for all static content
  - Update routing to support language prefixes (e.g., /en/about, /es/nosotros)
  - Ensure all dynamic content can be served in multiple languages
- **Technical Considerations**:
  - Use Next.js built-in i18n routing
  - Implement language detection based on user preferences
  - Add language selector UI component
  - Consider SEO implications for multi-language content
  - Plan for RTL language support if needed in the future

## 9. Detailed Implementation Notes

### Phase 2: API Integration Details

#### 2.1 API Client Setup

The API client will handle authentication and communication with the REI API CCA. We'll implement a token management system that automatically refreshes expired tokens.

```typescript
// src/lib/api/auth.ts
import { cookies } from "next/headers";
import axios from "axios";

const TOKEN_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/oauth/token`;
const API_KEY = process.env.REMAX_API_KEY;
const INTEGRATOR_ID = process.env.REMAX_INTEGRATOR_ID;
const SECRET_KEY = process.env.REMAX_SECRET_KEY;

export async function getAccessToken() {
  // Check for existing token in cookies
  const cookieStore = cookies();
  const token = cookieStore.get("remax_token");

  if (token) {
    // Check if token is expired (implement token expiry check)
    const isExpired = checkTokenExpiry(token.value);
    if (!isExpired) return token.value;
  }

  // Get new token
  return refreshToken();
}

async function refreshToken() {
  try {
    const response = await axios.post(
      TOKEN_ENDPOINT,
      `=grant_type=password&apikey=${API_KEY}&integratorID=${INTEGRATOR_ID}&secretkey=${SECRET_KEY}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;

    // Store token in HTTP-only cookie
    const cookieStore = cookies();
    cookieStore.set("remax_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
      path: "/",
    });

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
}
```

#### 2.2 Database Schema

We'll use Prisma with PostgreSQL to store property and agent data locally. This will improve performance and reduce API calls.

```prisma
// prisma/schema.prisma
model Property {
  id            Int      @id @default(autoincrement())
  listingId     Int      @unique
  listingKey    String?
  title         String
  description   String?  @db.Text
  price         Decimal
  currency      String
  bedrooms      Int?
  bathrooms     Int?
  squareMeters  Decimal?
  location      String?
  latitude      String?
  longitude     String?
  propertyType  String?
  status        String?
  furnished     Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  officeCode    String

  // Relations
  images        PropertyImage[]
  agent         Agent?    @relation(fields: [agentId], references: [id])
  agentId       Int?
}

model PropertyImage {
  id          Int      @id @default(autoincrement())
  photoId     Int
  imageUrl    String
  priority    Int
  property    Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  propertyId  Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Agent {
  id          Int      @id @default(autoincrement())
  associateId Int      @unique
  remaxId     String?
  firstName   String
  lastName    String
  email       String?
  phone       String?
  imageUrl    String?
  officeId    Int?
  officeName  String?
  officeCode  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  properties  Property[]
}
```

#### 2.3 Data Synchronization Service

We'll implement a service to periodically fetch and update property and agent data from the REI API.

```typescript
// src/lib/api/sync.ts
import { PrismaClient } from "@prisma/client";
import { getProperties, getAgents } from "./remax";

const prisma = new PrismaClient();

export async function syncProperties() {
  // Fetch properties in batches
  let skip = 0;
  const take = 50;
  let hasMore = true;

  while (hasMore) {
    const { result } = await getProperties(take, skip);

    if (!result || result.length === 0) {
      hasMore = false;
      break;
    }

    // Process and upsert properties
    for (const property of result) {
      await prisma.property.upsert({
        where: { listingId: property.listingId },
        update: mapPropertyData(property),
        create: mapPropertyData(property),
      });

      // Fetch and sync property images
      await syncPropertyImages(property.listingId);
    }

    skip += take;
  }

  console.log(`Synced properties completed at ${new Date().toISOString()}`);
}

// Similar functions for syncAgents, syncPropertyImages, etc.
```

### Phase 3: Search & Filtering Details

#### 3.1 Search Implementation

The search functionality will support both client-side filtering and server-side search for more complex queries.

```typescript
// src/lib/api/search.ts
import { prisma } from "../db";

export async function searchProperties(params) {
  const {
    query,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    location,
    page = 1,
    limit = 12,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  const skip = (page - 1) * limit;

  // Build filter conditions
  const where = {
    ...(query && {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { location: { contains: query, mode: "insensitive" } },
      ],
    }),
    ...(propertyType && { propertyType }),
    ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
    ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
    ...(bedrooms && { bedrooms: { gte: parseInt(bedrooms, 10) } }),
    ...(bathrooms && { bathrooms: { gte: parseInt(bathrooms, 10) } }),
    ...(location && { location: { contains: location, mode: "insensitive" } }),
  };

  // Execute query with pagination
  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: {
        images: {
          where: { priority: 1 },
          take: 1,
        },
        agent: true,
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    prisma.property.count({ where }),
  ]);

  return {
    properties,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
}
```

#### 3.2 Filter Component

The filter component will use React Hook Form with Zod for validation and will persist filter state in the URL.

```typescript
// src/components/properties/FilterSidebar.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const filterSchema = z.object({
  query: z.string().optional(),
  propertyType: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  location: z.string().optional(),
});

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize form with URL params
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      query: searchParams.get("query") || "",
      propertyType: searchParams.get("propertyType") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      bathrooms: searchParams.get("bathrooms") || "",
      location: searchParams.get("location") || "",
    },
  });

  const onSubmit = (data) => {
    // Build query string from form data
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });

    // Update URL with filter params
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>{/* Filter form fields */}</form>
  );
}
```

### Phase 4: Polish & Launch Details

#### 4.1 Performance Optimization

We'll implement various techniques to ensure the site loads quickly and performs well:

1. **Image Optimization**:

   - Use Next.js Image component with proper sizing
   - Implement lazy loading for off-screen images
   - Use WebP format with fallbacks

2. **Code Optimization**:

   - Implement code splitting for large components
   - Use React.memo for expensive components
   - Optimize React Query with proper caching strategies

3. **Database Optimization**:
   - Create indexes for frequently queried fields
   - Implement query caching
   - Use connection pooling

#### 4.2 SEO Implementation

Each page will have proper metadata and structured data:

```typescript
// src/app/properties/[id]/page.tsx
import { Metadata } from "next";
import { getPropertyById } from "@/lib/api/properties";

export async function generateMetadata({ params }): Promise<Metadata> {
  const property = await getPropertyById(params.id);

  if (!property) {
    return {
      title: "Property Not Found | RE/MAX Blue Ocean",
      description: "The property you are looking for could not be found.",
    };
  }

  return {
    title: `${property.title} | RE/MAX Blue Ocean`,
    description:
      property.description?.substring(0, 160) ||
      "View this property listing from RE/MAX Blue Ocean",
    openGraph: {
      title: property.title,
      description: property.description?.substring(0, 160),
      images: property.images[0]?.imageUrl
        ? [{ url: property.images[0].imageUrl }]
        : [],
      type: "website",
    },
  };
}

// JSON-LD structured data
function PropertyJsonLd({ property }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: property.title,
          description: property.description,
          price: `$${property.price}`,
          priceCurrency: property.currency,
          image: property.images.map((img) => img.imageUrl),
          address: {
            "@type": "PostalAddress",
            addressLocality: property.location,
          },
          // Additional structured data properties
        }),
      }}
    />
  );
}
```

## 10. Timeline and Milestones

| Phase   | Milestone                   | Estimated Completion |
| ------- | --------------------------- | -------------------- |
| 2.1     | API Client Setup            | Week 1               |
| 2.2-2.4 | Property & Agent Pages      | Weeks 2-3            |
| 3.1-3.2 | Search & Filtering          | Week 4               |
| 3.3-3.4 | Pagination & Error Handling | Week 5               |
| 4.1-4.2 | Performance & SEO           | Week 6               |
| 4.3-4.4 | Testing & Deployment        | Week 7               |

## 11. Risk Assessment and Mitigation

| Risk                          | Impact | Likelihood | Mitigation                                            |
| ----------------------------- | ------ | ---------- | ----------------------------------------------------- |
| API Changes                   | High   | Medium     | Implement adapter pattern, monitor API changes        |
| Performance Issues            | Medium | Medium     | Regular performance testing, lazy loading, pagination |
| Browser Compatibility         | Medium | Low        | Cross-browser testing, feature detection              |
| Data Synchronization Failures | High   | Low        | Implement retry logic, monitoring, alerts             |

## 12. Quality Assurance

- Unit tests for API client and utility functions
- Integration tests for data fetching and state management
- End-to-end tests for critical user flows
- Lighthouse audits for performance, accessibility, and SEO
- Manual testing on various devices and browsers

## 13. Documentation

All implementation details will be documented in the Progress Tracker with:

- Code snippets
- Architecture diagrams
- API integration details
- Testing results
- Performance metrics
