"use client";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";

function CreateCampaignModal() {
  const pathname = usePathname();
  const [type, setType] = React.useState<"service" | "product">();
  const t = useTranslations("Promotion");

  type PromotionType = {
    id: "service" | "product";
    name: string;
  };

  const promotions: PromotionType[] = [
    {
      id: "service",
      name: "promote_services",
    },
    {
      id: "product",
      name: "promote_products",
    },
  ];

  return (
    <dialog id="create_campaign_modal" className="modal">
      <div className="modal-box w-11/12 max-w-sm bg-white dark:bg-gray-800 px-0">
        <div className="border-b-2 border-gray-200 pb-3">
          <h3 className="font-bold text-xl text-black dark:text-white text-center font-serif">
            {t("create_campaign")}
          </h3>
        </div>
        <div className="px-5 flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-4 my-2">
            {promotions.map((promotion) => {
              return (
                <label
                  htmlFor={promotion.id}
                  className="flex flex-row gap-2 items-center cursor-pointer"
                  key={promotion.id}
                >
                  <input
                    type="radio"
                    name="radio-5"
                    id={promotion.id}
                    className="radio radio-success border-secondary"
                    checked={type == promotion.id}
                    onChange={() => setType(promotion.id)}
                  />
                  <p className="text-black dark:text-white font-semibold">
                    {t(promotion.name)}
                  </p>
                </label>
              );
            })}
          </div>
          <PrimaryButton
            name={t("continue")}
            href={`${pathname}/add?type=${type}&tab=discounts-ads`}
            disabled={!type}
          />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="text-black"></button>
      </form>
    </dialog>
  );
}

export default CreateCampaignModal;
