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
import { pushSuccessNotification } from "@/utils/pushNotification.util";
import { useIntervalRequest } from "@/hooks/useIntervalRequest";
import { getCachedPersonalInfo } from "@/cache/get-cached-personal-info";
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
  const [formState, setFormState] = React.useState(EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);
  useIntervalRequest({
    time: 5,
    redirect: "/auth/create-password",
    message: "Email verified successfully",
    property: "email_verified",
  });

  const t = useTranslations("Auth");

  const counterFunction = async () => {
    let personalInfo: any;
    try {
      personalInfo = await getCachedPersonalInfo();
    } catch (error) {
      console.error(error);
    }
    resendVerificationLink({ email: personalInfo?.email || email }).then(
      (res) => {
        setFormState(res);
      },
    );
  };

  return (
    <div className="w-10/12 h-4/5 px-6 flex flex-col justify-evenly pb-8 items-center">
      <div className="flex w-full">
        <BackButton />
      </div>
      {/* SIGN IN HEADER */}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-[40px] text-center font-serif font-semibold self-start">
          {t("the_confirmation_letter_has_been_sent")}
        </h1>
        <p className="text-gray-500">{t("check_mail_box", { email })}</p>
        <div className="flex flex-col gap-6 w-full">
          {/* SIGN UP LINK */}
          <div className="flex flex-col gap-3 w-full items-center">
            <Counter
              initialValue={30}
              buttonLabel={t("send_new_email")}
              buttonFunction={counterFunction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationLetter;
