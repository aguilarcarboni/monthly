/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    env: {
        ATHENA_API_URL: process.env.ATHENA_API_URL,
    }
}

module.exports = nextConfig