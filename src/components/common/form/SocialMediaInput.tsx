"use client";
import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  socialMedia: "facebook" | "instagram";
  error?: string | undefined;
  defaultValue?: string;
};
function SocialMediaInput({ socialMedia, error, defaultValue }: Props) {
  const ref = useScrollToErrorField<HTMLDivElement>(error);

  const t = useTranslations("Commons");
  return (
    <div ref={ref} className="flex flex-col gap-3">
      <label htmlFor={socialMedia}>
        {socialMedia == "instagram" ? t("instagram_link") : t("facebook_link")}
      </label>
      <div
        className={`flex flex-row gap-2 border-2 dark:border-gray-700 rounded-[30px] px-4 ${error ? "border-danger bg-dangerlight" : "bg-white dark:bg-gray-800"}`}
      >
        <img
          src={
            socialMedia == "instagram"
              ? "/icons/instagram.svg"
              : "/icons/facebook.svg"
          }
          alt=""
        />
        <input
          defaultValue={defaultValue}
          type="text"
          id={socialMedia}
          name={socialMedia}
          placeholder="Insert link"
          className="input bg-transparent outline-none active:outline-none active:border-0 focus:outline-none focus:border-0"
        />
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

export default SocialMediaInput;
