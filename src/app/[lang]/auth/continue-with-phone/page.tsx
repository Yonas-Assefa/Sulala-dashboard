import BackButton from "@/components/common/ui/BackButton";
import { Link, redirect } from "@/i18n/navigation";
import React from "react";
import { getTranslations } from "next-intl/server";
import { isMobile } from "@/lib/detect/server";

async function ContinueWithPhone() {
  const t = await getTranslations("Auth");
  if (!isMobile()) redirect("/auth/create-password");

  return (
    <div className="text-black w-10/12 h-4/5 px-6 flex flex-col justify-evenly pb-8 items-center">
      <div className="flex w-full">
        <BackButton />
      </div>
      {/* SIGN IN HEADER */}
      <div className="flex flex-col gap-6">
        <p className="text-gray-500">{t("check_your_computer")}</p>
        <div className="flex flex-col gap-3 w-full">
          {/* SIGN UP LINK */}
          <div className="flex flex-col gap-3 w-full items-center">
            <img src="/icons/pc.svg" alt="" className="w-[200px]" />
          </div>
          <div className="w-full flex justify-center flex-row">
            <Link
              href={"/auth/create-password"}
              className="flex flex-row gap-3 text-primary"
            >
              <img src="/icons/phone.svg" alt="" />
              <p>{t("proceed_with_phone")}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContinueWithPhone;
