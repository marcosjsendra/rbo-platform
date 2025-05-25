/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'www.remax-blueocean.com',
      'remax-blueocean.com'
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
