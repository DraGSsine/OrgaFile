import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  experimental: {
    turbo: {
    },
  },
  images:{
    domains: ['lh3.googleusercontent.com']
  }
}
 
export default nextConfig