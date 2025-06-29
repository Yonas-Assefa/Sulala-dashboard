import React from "react";
import { useTranslations } from "next-intl";

function PageSuspense() {
  const t = useTranslations("Commons");
  return (
    <div className="w-screen h-screen bg-white flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <img src="/sulala-logo.svg" className="w-[80px] aspect-square" />
        <h2 className="text-[#0F5D31] font-bold font-serif text-[25px]">
          {t("sulala")}
        </h2>
      </div>
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}

export default PageSuspense;
