"use client";
import { acceptApproval } from "@/actions/auth/accept-approval";
import pushNotification from "@/utils/pushNotification.util";
import { redirect, useRouter } from "@/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";

type Props = {
  searchParams: {
    vendor_id: string;
    approval_token: string;
  };
};

async function VerifyEmail({
  searchParams: { approval_token, vendor_id },
}: Props) {
  // const checkEmailVerification = async () => {
  //   const personalInfo = await getCachedPersonalInfo()
  //   if (!personalInfo?.email_verified && pathname !== '/auth/verify-email') {
  //     redirect('/auth/verify-email')
  //   } else if (!personalInfo?.is_password_set && personalInfo?.email && !personalInfo?.phone_verified && pathname !== '/auth/create-password') {
  //     redirect('/auth/create-password')
  //   } else if (personalInfo.shops && Array.isArray(personalInfo.shops) && personalInfo.shops.length > 0 && !pathname.includes('dashboard')) {
  //     redirect('/dashboard/settings')
  //   } else if (!pathname.includes('auth/setup-account')) {
  //     redirect('/auth/setup-account?stage=one')
  //   }
  // }
  const router = useRouter();

  const parseFormState = async () => {
    const formState = await acceptApproval({ approval_token, vendor_id });
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
    if (!approval_token || !vendor_id) {
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
        {t("your_shop_has_been_approved")}
      </h1>

      <div className="flex">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
      <p>{t("please_hold_tight")}</p>
    </div>
  );
}

export default VerifyEmail;
