"use client";
import { signIn } from "@/actions/auth/signin";
import AuthWithEmail from "@/components/AuthWithEmail";
import AuthWithPhone from "@/components/AuthWithPhone";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import SecondaryButton from "@/components/common/ui/SecondaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import React from "react";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";
import { resendVerificationLink } from "@/actions/auth/resend-verification-link";
import { resendCreatePasswordLink } from "@/actions/auth/resend-create-password-link";
import { useResponseInterceptModal } from "@/hooks/useResposeInterceptModal";

type SignInProps = {
  by: "phone" | "email" | undefined;
};

function SignInForm({ by }: SignInProps) {
  const [formState, action] = useFormState(signIn, EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);

  useResponseInterceptModal({
    Fn: resendVerificationLink,
    FnArgs: {
      email:
        global.document &&
        document.getElementById("email")?.getAttribute("value"),
    },
    formState,
    message: "Email not verified. Please verify your email first",
    modalId: "resend_email_verification_link",
    notification: "Resending verification link...",
    redirect: `/auth/confirm-letter?email=${encodeURIComponent(global.document && (document.getElementById("email")?.getAttribute("value") as string))}`,
  });
  useResponseInterceptModal({
    Fn: resendCreatePasswordLink,
    FnArgs: {
      email:
        global.document &&
        document.getElementById("email")?.getAttribute("value"),
    },
    formState,
    message: "Password not set. set password",
    modalId: "resend_create_password_link",
    notification: "Sending password creation link...",
    redirect: `/auth/confirm-reset?email=${encodeURIComponent(global.document && (document.getElementById("email")?.getAttribute("value") as string))}`,
  });

  const t = useTranslations("Auth");

  return (
    <form action={action} className="flex flex-col gap-6 w-full md:px-10">
      {/* SIGN IN INPUT */}
      {by == "phone" ? (
        <AuthWithPhone error={formState.fieldErrors?.phone_number?.[0]} />
      ) : (
        <AuthWithEmail
          emailError={formState.fieldErrors?.email?.[0]}
          passwordError={formState.fieldErrors?.password?.[0]}
        />
      )}

      <input type="text" hidden name="by" value={by} onChange={() => { }} />

      {/* SIGN UP LINK */}
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="w-full flex flex-col">
          <PrimaryButton name={t("signin")} type="submit" />
        </div>

        <p className="text-[#70757f] select-none">
          {t("don't_have_an_account")}
        </p>
        <SecondaryButton name={t("signup")} href={"/auth/sign-up"} />
      </div>
    </form>
  );
}

export default SignInForm;
