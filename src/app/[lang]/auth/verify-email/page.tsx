"use client";
import { verifyEmail } from "@/actions/auth/verify-email";
import { getPersonalInfo } from "@/actions/settings/get-personal-info";
import pushNotification from "@/utils/pushNotification.util";
import { redirect, useRouter } from "@/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";

type Props = {
  searchParams: {
    vendor_id: string;
    confirmation_token: string;
  };
};

async function VerifyEmail({
  searchParams: { confirmation_token, vendor_id },
}: Props) {
  const router = useRouter();

  const parseFormState = async () => {
    const formState = await verifyEmail({ confirmation_token, vendor_id });
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
    if (!confirmation_token || !vendor_id) {
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
        {t("verifying_email")}
      </h1>

      <div className="flex">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
      <p>{t("please_hold_tight")}</p>
    </div>
  );
}

export default VerifyEmail;
