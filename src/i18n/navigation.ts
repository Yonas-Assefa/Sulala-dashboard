import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";
import { LOCALES } from "./config";

export const locales = LOCALES;
export const localePrefix = "always"; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",
  "/dashboard": "/dashboard",
  "/dashboard/settings": "/dashboard/settings",
  "/dashboard/settings/shop-info": "/dashboard/settings/shop-info",
  "/auth/setup-account?stage=one": "/auth/setup-account?stage=one",
  // '/dashboard/promotion/add?type=product': '/dashboard/promotion/add?type=product',
  // '/dashboard/promotion/add?type=service': '/dashboard/promotion/add?type=service',
  "/dashboard/orders/items": "/dashboard/orders/items",
  "/dashboard/orders/services": "/dashboard/orders/services",
  "/dashboard/settings/personal-info": "/dashboard/settings/personal-info",
  "/dashboard/settings/billing-info": "/dashboard/settings/billing-info",

  "/settings": "/dashboard/settings",

  "/auth": "/auth",
  "/auth/sign-in": "/auth/sign-in",
  "/auth/sign-up": "/auth/sign-up",
  "/auth/account-setup": "/auth/account-setup",
  "/auth/forgot-password": "/auth/forgot-password",

  "/auth/create-password": "/auth/create-password",

  "/auth/verify-email": "/auth/verify-email",
  "/ar": "/ar",
  "/en": "/en",

  "/support/contact": "/support/contact",
  "/support/faq": "/support/faq",

  "/auth/download-app": "/auth/download-app",
  "/auth/download-app?store=appstore": "/auth/download-app?store=appstore",
  "/auth/download-app?store=playstore": "/auth/download-app?store=playstore",

  // // If locales use different paths, you can
  // // specify each external path per locale.
  // '/about': {
  //     en: '/about',
  //     de: '/ueber-uns'
  // },

  // // Dynamic params are supported via square brackets
  // '/news/[articleSlug]-[articleId]': {
  //     en: '/news/[articleSlug]-[articleId]',
  //     de: '/neuigkeiten/[articleSlug]-[articleId]'
  // },

  // // Also (optional) catch-all segments are supported
  // '/categories/[...slug]': {
  //     en: '/categories/[...slug]',
  //     de: '/kategorien/[...slug]'
  // }
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
