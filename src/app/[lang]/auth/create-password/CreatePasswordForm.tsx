"use client";
import { createPassword } from "@/actions/auth/create-password";
import PasswordInput from "@/components/common/form/PasswordInput";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import React from "react";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";
import { useIntervalRequest } from "@/hooks/useIntervalRequest";

function CreatePasswordForm() {
  const [formState, action] = useFormState(createPassword, EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);
  useIntervalRequest({
    time: 10,
    redirect: "/auth/setup-account",
    message: "Password created successfully",
    property: "is_password_set",
  });

  const t = useTranslations("Auth");

  return (
    <form action={action} className="flex flex-col gap-6 w-full md:px-10">
      {/* SIGN IN INPUT */}

      <div className="flex flex-col gap-3 w-full items-center">
        <div className="flex flex-col w-full">
          <PasswordInput
            error={formState.fieldErrors?.password?.[0]}
            label={t("password")}
            placeholder={t("password")}
            name="password"
            id="password"
            showLabel={false}
          />
        </div>

        <div className="flex flex-col w-full">
          <PasswordInput
            error={formState.fieldErrors?.confirm_password?.[0]}
            label={t("confirm_password")}
            placeholder={t("confirm_password")}
            name="password_confirm"
            id="password_confirm"
            showLabel={false}
          />
        </div>
      </div>

      {/* SIGN UP LINK */}
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="flex flex-col w-full">
          <PrimaryButton name="Sign in" type="submit" />
        </div>
      </div>
    </form>
  );
}

export default CreatePasswordForm;
