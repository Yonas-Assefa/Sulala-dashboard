import { FRONTEND_BASE_URL } from "@/config/urls";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config";

export const metadata = {
  metadataBase: new URL(FRONTEND_BASE_URL).origin,
  alternates: {
    canonical: `/${DEFAULT_LOCALE}`,
    languages: LOCALES.reduce((acc, locale) => {
      acc[locale] = `/${locale}`;
      return acc;
    }, {} as any),
  },
  openGraph: {
    images: "/sulala-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
