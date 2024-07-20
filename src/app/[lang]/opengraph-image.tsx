import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export default async function OpenGraphImage() {
  const t = await getTranslations("OpenGraphImage");
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src="https://avatars.githubusercontent.com/u/171445244?v=4"
          alt="sulala logo"
          style={{
            width: "30%",
            marginTop: "5%",
          }}
        />
        <p style={{ textAlign: "center", color: "#176635", fontSize: 30 }}>
          {t("description")}
        </p>
      </div>
    ),
  );
}
