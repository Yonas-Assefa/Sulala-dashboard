"use client";
import { useTranslations } from "next-intl";
import React from "react";

function error() {
  const t = useTranslations("Error");
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="bg-white flex-grow">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <img src="/icons/alert.svg" alt="" className="opacity-95" />
          <h1 className="text-xl md:text-2xl text-center font-semibold text-danger p-3 md:p-1">
            {t("trouble_loading_page")} {":("}
          </h1>
          <div className="flex flex-row justify-between gap-5">
            <p className="text-primary font-semibold p-3 md:p-1">
              {t("we_are_working_on_it")}
            </p>
          </div>
          <p className="text-secondary font-semibold p-3 md:p-1">
            {t("try_refreshing_the_page")}
          </p>
          <img
            src="/sulala-logo.svg"
            className=" w-[100px] opacity-15 absolute"
          />
        </div>
      </div>
    </div>
  );
}

export default error;
