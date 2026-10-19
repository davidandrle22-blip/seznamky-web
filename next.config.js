/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@vercel/blob'],
  },
}

nextConfig.redirects = async () => [
  { source: '/seznamky/rich-meet-beautiful', destination: '/seznamky/elite-meets-beauty', permanent: true },
  { source: '/seznamky/ourtime', destination: '/seznamky/zrala-laska', permanent: true },
  { source: '/seznamky/silversingles', destination: '/seznamky/singles50', permanent: true },
  { source: '/seznamky/secret', destination: '/seznamky/eroticky-kontakt', permanent: true },
  { source: '/seznamky/dateyou', destination: '/seznamky', permanent: true },
]

module.exports = nextConfig
