import React from "react";
import { getTranslations } from "next-intl/server";
import ThemeSwitch from "../components/ThemeSwitch";
import LangSwitch from "../components/LangSwitch";

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

async function GlossaryLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { lang: string } }>) {
  const t = await getTranslations({
    locale: params.lang,
    namespace: "Glossary",
  });
  return (
    <div className="w-screen h-screen max-w-[1000px] mx-auto overflow-hidden flex flex-col gap-5 p-8 md:p-16 bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className="flex flex-row gap-3">
        <ThemeSwitch />
        <LangSwitch />
      </div>
      <h1 className="font-bold uppercase text-primary dark:text-green-500 text-3xl">
        {t("glossary")}
      </h1>
      {children}
    </div>
  );
}

export default GlossaryLayout;
