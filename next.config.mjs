/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath can be set for GitHub Pages if needed, e.g., '/veroni-kite-school'
  // basePath: '/veroni-kite-school',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
