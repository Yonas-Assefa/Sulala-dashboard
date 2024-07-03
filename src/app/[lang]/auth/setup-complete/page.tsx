"use client";
import { clearCookie } from "@/actions/common/clear-cookie";
import React from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
  searchParams: {
    email?: string;
    phone_number?: string;
  };
};

function SetupComplete({ searchParams: { email, phone_number } }: Props) {
  if (!email && !phone_number) notFound();
  React.useEffect(() => {
    clearCookie();
  }, []);

  const t = useTranslations("Auth");

  return (
    <div className="w-11/12 md:w-9/12 flex flex-col gap-6 items-center">
      {/* SIGN IN HEADER */}
      <h1 className="text-3xl md:text-[40px] font-serif font-semibold self-start">
        {t("thank_you")}
      </h1>

      <div className="">
        <p>
          {t("moderation_notification_will_be_sent", {
            media: email || phone_number,
          })}
          &nbsp;{" "}
          <span className="text-primary font-semibold">
            {t("it_will_take_48_hr")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SetupComplete;
