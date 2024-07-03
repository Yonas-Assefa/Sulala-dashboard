import React from "react";
import SideBarNav from "./components/SideBarNav";
import { Metadata } from "next";
// import { redirect } from "@/i18n/navigation";
import { getPersonalInfo } from "@/actions/settings/get-personal-info";
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

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode; params: { lang: string } }>) {
  const personalInfo = await getPersonalInfo();
  return (
    <>
      <div className="w-screen h-screen overflow-hidden flex md:flex-row flex-col">
        <SideBarNav isSuperUser={personalInfo?.is_superuser} />
        <div className="bg-white dark:bg-black overflow-y-scroll flex-grow">
          <div className="w-full h-full pt-8 md:pt-0 flex justify-between flex-col items-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
