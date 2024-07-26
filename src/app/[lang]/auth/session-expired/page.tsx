"use client";
import { resendVerificationLink } from "@/actions/auth/resend-verification-link";
import BackButton from "@/components/common/ui/BackButton";
import Counter from "@/components/common/ui/Counter";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { Metadata } from "next";
import { redirect, useRouter } from "@/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import {
  pushErrorNotification,
  pushSuccessNotification,
} from "@/utils/pushNotification.util";
import { useIntervalRequest } from "@/hooks/useIntervalRequest";
import {
  getCachedPersonalInfo,
  invalidateCachedPersonalInfo,
} from "@/cache/get-cached-personal-info";
import SecondaryButton from "@/components/common/ui/SecondaryButton";
import { clearCookie } from "@/actions/common/clear-cookie";
// export const metadata: Metadata = {
//     title: 'Sulala | Auth Confirmation Letter',
//     description: 'Confirm your email address to get started with Sulala.',
//     icons: [
//         '/sulala-logo.svg',
//     ]
// };

type Props = {
  searchParams: {
    email: string;
  };
};

function ConfirmationLetter({ searchParams: { email } }: Props) {
  const router = useRouter();

  const clearData = async () => {
    await clearCookie();
    invalidateCachedPersonalInfo();
    pushErrorNotification("Session expired. Please login again.");
    setTimeout(() => {
      router.push("/auth/sign-in");
    }, 3000);
  };

  React.useEffect(() => {
    clearData();
  }, []);

  const t = useTranslations("Auth");

  return (
    <div className="w-10/12 h-4/5 px-6 flex flex-col justify-evenly pb-8 items-center">
      {/* SIGN IN HEADER */}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-[40px] text-center font-serif font-semibold text-danger opacity-40 line-through">
          {t("session_expired_title")}
        </h1>
        <p className="text-gray-500 text-center">
          {t("session_expired_description")}
        </p>
        <SecondaryButton href="/auth/sign-in" name="Login!" />
      </div>
    </div>
  );
}

export default ConfirmationLetter;
