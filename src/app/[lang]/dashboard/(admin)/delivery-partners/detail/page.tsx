import BackButton from "@/components/common/ui/BackButton";
import React from "react";
import DeliveryPartnerDetailForm from "./components/DeliveryPartnerDetailForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getOneDeliveryPartner } from "@/actions/admin-manage/get-delivery-partners";

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
  const deliveryPartnerDetail = await getOneDeliveryPartner(item);
  const t = await getTranslations("Manage");

  return (
    <div className="text-black flex flex-col w-full h-full p-8 gap-10  overflow-y-scroll">
      <div className="flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif">
        <div className="mt-4">
          <BackButton />
        </div>
        <h2 className="capitalize text-2xl md:text-3xl">
          {t("delivery_partner_details")}
        </h2>
      </div>
      <DeliveryPartnerDetailForm initialData={deliveryPartnerDetail} />
    </div>
  );
}

export default page;
