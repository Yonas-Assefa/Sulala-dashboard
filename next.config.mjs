import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = () => {
  const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
  const URI = new URL(BACKEND_BASE_URL);
  const BACKEND_PROTOCOL = URI.protocol.replace(":", "");
  const BACKEND_HOSTNAME = URI.hostname;
  const BACKEND_PORT = URI.port;

  return {
    images: {
      remotePatterns: [
        {
          protocol: BACKEND_PROTOCOL,
          hostname: BACKEND_HOSTNAME,
          port: BACKEND_PORT,
          pathname: "/**",
        },
      ],
      minimumCacheTTL: 60,
      domains: ["sulala.com"], // Add the domain of the external images you want to allow
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    output: "standalone",
  };
};

const getSentryConfig = () => {
  const SENTRY_ORG = process.env.SENTRY_ORG;
  const SENTRY_PROJECT = process.env.SENTRY_PROJECT;

  console.info("\x1b[35m  ⧌ Sentry enabled\x1b[0m");

  return {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: SENTRY_ORG,
    project: SENTRY_PROJECT,

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  };
};

const getNextConfig = () => {
  const USE_SENTRY = process.env.NEXT_PUBLIC_USE_MONITORING;
  if (USE_SENTRY === "true") {
    return withSentryConfig(withNextIntl(nextConfig()), getSentryConfig());
  }
  return withNextIntl(nextConfig());
};

export default getNextConfig();
