"use client";
import React from "react";
import BillingInfoCard from "./BillingInfoCard";
import { openModal } from "@/lib/modals";
import NoItemsFound from "@/components/common/ui/NoItemsFound";
import { useTranslations } from "next-intl";

type Props = {
  billings: any;
};
function BillingInfo({ billings }: Props) {
  const t = useTranslations("Settings.BillingInfo");

  return (
    <div className="mt-4 w-full flex flex-col gap-8 items-start">
      <div className="flex flex-col gap-4">
        <h4 className="font-[500]">{t("payment_methods")}</h4>

        {Array.isArray(billings) &&
          (billings.length !== 0 ? (
            billings.map((billing, index) => (
              <BillingInfoCard
                key={index}
                isPrimary={billing.primary}
                card_number={billing.card_number}
                id={billing.id}
              />
            ))
          ) : (
            <div className="p-1 bg-tertiary dark:bg-gray-600 border ">
              <p className="text-sm text-black/50 dark:text-white/50 font-serif">
                {t("no_billing_info_found")}
              </p>
            </div>
          ))}

        <button
          onClick={() => openModal("create_payment_method_modal")}
          className="flex flex-row gap-2 bg-tertiary dark:bg-gray-700 self-start py-2 px-4 rounded-[30px]"
        >
          <img src="/icons/plus.svg" alt="" />
          <span>{t("add_new")}</span>
        </button>
      </div>
    </div>
  );
}

export default BillingInfo;
