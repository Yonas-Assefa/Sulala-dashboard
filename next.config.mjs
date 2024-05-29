/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sulala.com',
                port: '',
                pathname: '/**',
            }
        ],
        minimumCacheTTL: 60,
    },
    experimental: {
        serverActions: {
            allowedOrigins: ["h4zz2kw9-3000.euw.devtunnels.ms"]
        }
    }
};

export default nextConfig;
