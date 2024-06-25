"use client";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import SecondaryButton from "@/components/common/ui/SecondaryButton";
import { useTranslations } from "next-intl";

import React from "react";

function ProductHead() {
  const t = useTranslations("Products");

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <h1 className="text-2xl md:text-4xl font-semibold font-serif text-black dark:text-white">
        {t("my_products")}
      </h1>
      <div className="flex flex-row md:gap-3">
        <div className="fixed md:relative bottom-0 drop-shadow-lg md:drop-shadow-none right-0 p-3 md:p-0 z-20">
          <SecondaryButton
            name={t("import")}
            modal="import_products_modal"
            padding="sm"
          />
        </div>
        <div className="fixed md:relative bottom-14 md:bottom-0 drop-shadow-lg md:drop-shadow-none right-0 p-3 md:p-0 z-20">
          <SecondaryButton
            name={t("export")}
            modal="export_products_modal"
            padding="sm"
          />
        </div>
        <div className="fixed md:relative bottom-28 md:bottom-0 drop-shadow-lg md:drop-shadow-none right-0 p-3 md:p-0 z-20">
          <PrimaryButton
            name={t("add_product")}
            href="/dashboard/my-products/add"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductHead;
