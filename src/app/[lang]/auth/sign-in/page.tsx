import { SignupProps } from "@/types/props.type";
import React from "react";
import PhoneEmailTab from "../components/PhoneEmailTab";
import SignInForm from "./SignInForm";
import { Metadata } from "next";
import { handleGoogleSignIn } from "@/actions/auth/ggoleSigninHelper";
import { useTranslations } from "next-intl";
import ResendVerificationModal from "./modal/ResendVerificationModal";
import ResendCreatePasswordModal from "./modal/ResendCreatePasswordModal";
import SocialAuthentication from "@/components/common/form/SocialAuthentication";

export const metadata: Metadata = {
  title: "Sulala | Auth Sign In",
  description: "Sign in to your Sulala account",
  icons: ["/sulala-logo.svg"],
};

function SignIn({ searchParams: { by }, params: { lang } }: SignupProps) {
  const t = useTranslations("Auth");

  return (
    <>
      <ResendVerificationModal />
      <ResendCreatePasswordModal />
      <div className="w-10/12 flex flex-col gap-5 items-center">
        {/* SIGN IN HEADER */}
        <h1 className="text-3xl md:text-5xl font-serif font-semibold">
          {t("signin")}
        </h1>

        {/* SIGN IN OPTIONS */}
        <PhoneEmailTab />

        {/* FORM */}
        <SignInForm by={by} />

        <div className="divider"></div>

        {/* SOCIAL SIGN UP */}
        <SocialAuthentication />
      </div>
    </>
  );
}

export default SignIn;
