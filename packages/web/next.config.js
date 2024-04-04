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
  env: {
    API_URL_DIRECTUS: process.env.API_URL_DIRECTUS,
    ADMIN_EMAIL_DIRECTUS: process.env.ADMIN_EMAIL_DIRECTUS,
    ADMIN_PASSWORD_DIRECTUS: process.env.ADMIN_PASSWORD_DIRECTUS,
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

console.log("next.config.js", JSON.stringify(module.exports, null, 2))

module.exports = nextConfig
