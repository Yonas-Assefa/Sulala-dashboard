/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sulala.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
                port: '',
                pathname: '/**',
            }
        ],
        minimumCacheTTL: 60,
    },
};

export default nextConfig;
