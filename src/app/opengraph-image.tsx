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
      <div
        style={{
          fontSize: 128,
          display: "flex",
          flexDirection: "column",
          gap: "4",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ textAlign: "center", color: "#176635" }}>{t("title")}</p>
        <p style={{ textAlign: "center", color: "#176635" }}>
          {t("description")}
        </p>
        <img
          src="https://avatars.githubusercontent.com/u/171445244?v=4"
          alt="sulala logo"
        />
      </div>
    ),
  );
}
