import { DEFAULT_LOCALE } from "@/i18n/config";
import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    namespace: "Manifest",
    locale: DEFAULT_LOCALE,
  });
  return {
    name: t("name"),
    short_name: t("short_name"),
    description: t("description"),
    start_url: `/${DEFAULT_LOCALE}`,
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/sulala-logo.svg",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
