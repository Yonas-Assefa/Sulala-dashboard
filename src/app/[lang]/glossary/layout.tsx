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

function GlossaryLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { lang: string } }>) {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col gap-5 text-black dark:text-white p-8 md:p-16 bg-white dark:bg-gray-900">
      <h1 className="font-bold text-primary text-3xl">GLOSSARY</h1>
      {children}
    </div>
  );
}

export default GlossaryLayout;
