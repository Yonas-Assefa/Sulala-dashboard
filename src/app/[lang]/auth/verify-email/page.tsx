"use client";
import { verifyEmail } from "@/actions/auth/verify-email";
import pushNotification from "@/utils/pushNotification.util";
import { redirect, useRouter } from "@/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";

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
  const [formState, setFormState] = React.useState<FormState>(EMPTY_FORM_STATE);
  const isCalledRef = React.useRef<boolean>(false);

  const parseFormState = async () => {
    const response = await verifyEmail({ confirmation_token, vendor_id });
    setFormState(response);
  };

  useToastMessage(formState);
  useRedirectRoute(formState);

  React.useEffect(() => {
    if (!confirmation_token || !vendor_id) {
      pushNotification("Invalid link", "error");
      redirect("/auth/sign-in");
    }
    if (!isCalledRef.current) {
      parseFormState();
      isCalledRef.current = true;
    }
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
