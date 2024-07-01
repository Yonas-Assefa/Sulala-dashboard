"use client";
import React from "react";
import pushNotification from "@/utils/pushNotification.util";
import { redirect, useRouter } from "@/i18n/navigation";
import { verifyCreatepassword } from "@/actions/auth/verify-create-password";
import { useTranslations } from "next-intl";

type Props = {
  searchParams: {
    vendor_id: string;
    password_set_link: string;
  };
};
function SetupPassword({
  searchParams: { vendor_id, password_set_link },
}: Props) {
  const router = useRouter();

  const parseFormState = async () => {
    const formState = await verifyCreatepassword({
      vendor_id,
      password_set_link,
    });
    if (formState.status === "SUCCESS") {
      pushNotification(formState.message, "success");
      if (formState.redirectUrl) {
        router.push(formState.redirectUrl as any);
      }
    } else {
      pushNotification(formState.message, "error");
      router.push("/auth/sign-in");
    }
  };

  React.useEffect(() => {
    if (!password_set_link || !vendor_id) {
      pushNotification("Invalid link", "error");
      redirect("/auth/sign-in");
    }
    parseFormState();
  }, []);
  const t = useTranslations("Auth");

  return (
    <div className="w-10/12 flex flex-col gap-5 items-center">
      {/* SIGN IN HEADER */}
      <h1 className="text-[30px] font-serif font-semibold">
        {t("confirming_action")}
      </h1>

      <div className="flex">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
      <p>{t("please_hold_tight")}</p>
    </div>
  );
}

export default SetupPassword;
