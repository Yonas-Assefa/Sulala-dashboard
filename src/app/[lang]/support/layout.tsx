import React from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "DashboardMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: ["/sulala-logo.svg"],
  };
}

export default async function SupportLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { lang: string } }>) {
  return (
    <div className="w-screen h-screen overflow-hidden flex md:flex-row flex-col">
      <div className="bg-white dark:bg-black flex-grow overflow-scroll">
        <div className="w-full h-full mt-8 flex justify-between flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
