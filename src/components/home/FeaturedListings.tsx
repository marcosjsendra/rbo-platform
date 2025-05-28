"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "../properties/PropertyCard";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  areaUnit: string;
  imageUrl?: string;
  status: "for-sale" | "for-rent" | "sold" | "pending";
}

// Modern FeaturedListings component with animations and sleek design
export default function FeaturedListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; // Show 6 items per page

  useEffect(() => {
    const fetchFeaturedProperties = async (page: number = 1) => {
      try {
        setLoading(true);
        // TODO: Replace with database query when backend is ready
        // We will fetch properties from our database where we've stored data from the REI API
        // Example:
        // const response = await fetch('/api/properties/featured?page=${page}&limit=${itemsPerPage}');
        // const data = await response.json();
        // setProperties(data.properties);
        // setTotalPages(Math.ceil(data.total / itemsPerPage));

        // Mock data for development
        // This will be replaced with our database query, not direct API calls
        setTimeout(() => {
          // Simulating multiple pages of data
          const allMockData: Property[] = [
            {
              id: "1",
              title: "Luxury Oceanview Villa",
              location: "Nosara, Guanacaste",
              price: 1250000,
              bedrooms: 4,
              bathrooms: 4.5,
              area: 3800,
              areaUnit: "sq ft",
              imageUrl: "/images/properties/villa1.jpg",
              status: "for-sale",
            },
            {
              id: "2",
              title: "Beachfront Condo",
              location: "Sámara, Guanacaste",
              price: 485000,
              bedrooms: 2,
              bathrooms: 2,
              area: 1800,
              areaUnit: "sq ft",
              imageUrl: "/images/properties/condo1.jpg",
              status: "for-sale",
            },
            {
              id: "3",
              title: "Mountain View Estate",
              location: "Punta Islita, Guanacaste",
              price: 895000,
              bedrooms: 3,
              bathrooms: 3,
              area: 3200,
              areaUnit: "sq ft",
              imageUrl: "/images/properties/estate1.jpg",
              status: "for-sale",
            },
          ];
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedData = allMockData.slice(startIndex, endIndex);
          setProperties(paginatedData);
          setTotalPages(Math.ceil(allMockData.length / itemsPerPage));
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setError("Failed to load featured properties. Please try again later.");
        setLoading(false);
      }
    };

    fetchFeaturedProperties(currentPage);
  }, [currentPage]);

  if (error) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center p-1 px-3 mb-4 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
            Featured Listings
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            Premium Properties
          </h2>
          <p className="text-gray-600 text-lg">
            Discover our handpicked selection of luxury properties in Costa
            Rica's most desirable locations.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} featured={true} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-12 mb-8">
          <nav className="flex items-center gap-2" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-50"
                }`}
                aria-label={`Page ${i + 1}`}
                aria-current={currentPage === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-50"
              }`}
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </nav>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Properties
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
