// @type {import('next').NextConfig}

const nextConfig = {
    images : {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'harith-food-ordering.s3.amazonaws.com',
            }
        ]
    }
}

module.exports = nextConfig;