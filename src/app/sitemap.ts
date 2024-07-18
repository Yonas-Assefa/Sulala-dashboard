import { FRONTEND_BASE_URL } from "@/config/urls";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config";
import { MetadataRoute } from "next";

const defaultLocale = DEFAULT_LOCALE;
const locales = LOCALES;

const pathnames = [
  "/",
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/setup-account",
  "/dashboard/settings",
];
const host = FRONTEND_BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  function getUrl(pathname: string, locale: string) {
    return `${host}${locale}${pathname === "/" ? "" : pathname}`;
  }

  return pathnames.map((pathname) => ({
    url: getUrl(pathname, defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(pathname, locale)]),
      ),
    },
    // priority: 0.9
  }));
}
