import { FRONTEND_BASE_URL } from '@/config/urls'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config';
import { MetadataRoute } from 'next'

const defaultLocale = DEFAULT_LOCALE;
const locales = LOCALES;

const pathnames = [
  '/',
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/setup-account',
  '/dashboard/settings'
];
const host = FRONTEND_BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  function getUrl(pathname: string, locale: string) {
    return `${host}${locale}${pathname === '/' ? '' : pathname}`;
  }

  return pathnames.map((pathname) => ({
    url: getUrl(pathname, defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(pathname, locale)])
      )
    }
  }));
}

// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     {
//       url: FRONTEND_BASE_URL,
//       lastModified: new Date(),
//       alternates: {
//         languages: {
//           en: `${FRONTEND_BASE_URL}en`,
//           ar: `${FRONTEND_BASE_URL}ar`,
//         },
//       },
//       priority: 0.9
//     },
//     {
//       url: `${FRONTEND_BASE_URL}/auth/sign-in`,
//       lastModified: new Date(),
//       alternates: {
//         languages: {
//           en: `${FRONTEND_BASE_URL}en/auth/sign-in`,
//           ar: `${FRONTEND_BASE_URL}ar/auth/sign-in`,
//         },
//       },
//       priority: 0.2
//     },
//     {
//       url: `${FRONTEND_BASE_URL}/auth/sign-up`,
//       lastModified: new Date(),
//       alternates: {
//         languages: {
//           en: `${FRONTEND_BASE_URL}en/auth/sign-up`,
//           ar: `${FRONTEND_BASE_URL}ar/auth/sign-up`,
//         },
//       },
//       priority: 0.2
//     },
//     {
//       url: `${FRONTEND_BASE_URL}/auth/setup-account`,
//       lastModified: new Date(),
//       alternates: {
//         languages: {
//           en: `${FRONTEND_BASE_URL}en/auth/setup-account`,
//           ar: `${FRONTEND_BASE_URL}ar/auth/setup-account`,
//         },
//       },
//       priority: 0.1
//     },
//     {
//       url: `${FRONTEND_BASE_URL}/dashboard/settings`,
//       lastModified: new Date(),
//       alternates: {
//         languages: {
//           en: `${FRONTEND_BASE_URL}en/dashboard/settings`,
//           ar: `${FRONTEND_BASE_URL}ar/dashboard/settings`,
//         },
//       },
//       priority: 0.6
//     },

//   ]
// }