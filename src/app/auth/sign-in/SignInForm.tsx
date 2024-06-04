"use client";
import { signIn } from "@/actions/auth/signin";
import AuthWithEmail from "@/components/AuthWithEmail";
import AuthWithPhone from "@/components/AuthWithPhone";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import SecondaryButton from "@/components/common/ui/SecondaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import React from "react";
import { useFormState } from "react-dom";

type SignInProps = {
  by: "phone" | "email" | undefined;
};

function SignInForm({ by }: SignInProps) {
  const [formState, action] = useFormState(signIn, EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);

  return (
    <form action={action} className="flex flex-col gap-6 w-full md:px-10">
      {/* SIGN IN INPUT */}
      {by !== "email" ? (
        <AuthWithPhone error={formState.fieldErrors?.phone_number?.[0]} />
      ) : (
        <AuthWithEmail
          emailError={formState.fieldErrors?.email?.[0]}
          passwordError={formState.fieldErrors?.password?.[0]}
        />
      )}

      <input type="text" hidden name="by" value={by} />

      {/* SIGN UP LINK */}
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="w-full flex flex-col">
          <PrimaryButton name="Sign in" type="submit" />
        </div>

        <p className="text-[#70757f] select-none">Don't have an account?</p>
        <SecondaryButton name="Sign up" href={"/auth/sign-up"} />
      </div>
    </form>
  );
}

export default SignInForm;
