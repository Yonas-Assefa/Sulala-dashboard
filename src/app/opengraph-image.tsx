import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { DEFAULT_LOCALE } from "@/i18n/config";

export default async function OpenGraphImage() {
  const t = await getTranslations({
    namespace: "OpenGraphImage",
    locale: DEFAULT_LOCALE,
  });
  return new ImageResponse(
    (
      <div style={{ fontSize: 128 }}>
        <p>{t("title")}</p>
        <p>{t("description")}</p>
        <img src="/sulala-logo.svg" alt="sulala logo" />
      </div>
    ),
  );
}
