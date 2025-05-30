/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'www.remax-blueocean.com',
      'remax-blueocean.com',
      'remax-cca.com' // REI API CCA images domain
    ],
  },
  compiler: {
    styledComponents: true,
  },
  // We don't need to manually expose environment variables with NEXT_PUBLIC_ prefix
  // as Next.js automatically includes them in the JavaScript bundle
};

export default nextConfig;
