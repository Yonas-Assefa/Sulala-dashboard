import BackButton from "@/components/common/ui/BackButton";
import React from "react";
import DriverDetailForm from "./components/DriverDetailForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getOnePendingDriver } from "@/actions/admin-manage/get-pending-drivers";

type Props = {
  searchParams: {
    type: string;
    tab: string;
    item: string;
  };
};

export const metadata: Metadata = {
  title: "Sulala | Admin Only",
  description: "Respond to customer requests.",
  icons: ["/icons/key.svg"],
};

async function page({ searchParams: { item } }: Props) {
  const driverDetail = await getOnePendingDriver(item);
  const t = await getTranslations("Manage");

  return (
    <div className="text-black flex flex-col w-full h-full p-8 gap-10  overflow-y-scroll">
      <div className="flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif">
        <div className="mt-4">
          <BackButton />
        </div>
        <h2 className="capitalize text-2xl md:text-3xl">
          {t("driver_details")}
        </h2>
      </div>
      <DriverDetailForm initialData={driverDetail} />
    </div>
  );
}

export default page;
