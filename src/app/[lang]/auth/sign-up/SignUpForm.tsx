"use client";
import { signUp } from "@/actions/auth/signup";
import AuthWithEmail from "@/components/AuthWithEmail";
import AuthWithPhone from "@/components/AuthWithPhone";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import SecondaryButton from "@/components/common/ui/SecondaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import React from "react";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";

type SignUpProps = {
  by: "phone" | "email" | undefined;
};

function SignUpForm({ by }: SignUpProps) {
  const [formState, action] = useFormState(signUp, EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);

  const t = useTranslations("Auth");

  return (
    <form action={action} className="flex flex-col gap-6 w-full md:px-10">
      {/* SIGN IN INPUT */}
      {by == "phone" ? (
        <AuthWithPhone error={formState.fieldErrors?.phone_number?.[0]} />
      ) : (
        <AuthWithEmail
          emailError={formState.fieldErrors?.email?.[0]}
          takePassword={false}
        />
      )}

      <input type="text" hidden name="by" value={by} onChange={() => { }} />

      {/* SIGN UP LINK */}
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="w-full flex flex-col">
          <PrimaryButton name={t("continue")} type="submit" />
        </div>

        <p className="text-[#70757f]">{t("already_have_an_account")}</p>
        <SecondaryButton name={t("signin")} href={"/auth/sign-in"} />
      </div>
    </form>
  );
}

export default SignUpForm;
