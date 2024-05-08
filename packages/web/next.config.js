const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

/**
 * @type {import('next').NextConfig}
 */
const nextEnv = require("@next/env")
const path = require("path")
const dotenv = require("dotenv")

const envPath = path.join(__dirname, "..", "..", ".env")
dotenv.config({
  path: envPath,
})
const nextConfig = withStoreConfig({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TODO: Fix all typescript errors
    ignoreBuildErrors: true,
  },
  env: {
    API_URL: process.env.API_URL,
    ADMIN_EMAIL_DIRECTUS: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD_DIRECTUS: process.env.ADMIN_PASSWORD,
    NEXT_PUBLIC_SEARCH_ENDPOINT: process.env.NEXT_PUBLIC_SEARCH_ENDPOINT,
    NEXT_PUBLIC_SEARCH_API_KEY: process.env.NEXT_PUBLIC_SEARCH_API_KEY,
    NEXT_PUBLIC_INDEX_NAME: process.env.NEXT_PUBLIC_INDEX_NAME,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/co",
        permanent: true,
      },
    ]
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
    ],
  },
})

module.exports = nextConfig
