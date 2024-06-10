import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

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
            },
            {
                protocol: 'http',
                hostname: '192.168.0.155',
                port: '8000',
                pathname: '/**',
            }
        ],
        minimumCacheTTL: 60,
    },
};

export default withNextIntl(nextConfig);
