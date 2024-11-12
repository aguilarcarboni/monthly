/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    env: {
        API_URL: process.env.API_URL,
    }
}

module.exports = nextConfig