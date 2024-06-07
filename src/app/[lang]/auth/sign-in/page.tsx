import { SignupProps } from "@/types/props.type";
import React from "react";
import PhoneEmailTab from "../components/PhoneEmailTab";
import SignInForm from "./SignInForm";
import { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { handleAppleSignIn, handleGoogleSignIn } from "@/actions/auth/sooSigninHelper";

export const metadata: Metadata = {
  title: "Sulala | Auth Sign In",
  description: "Sign in to your Sulala account",
  icons: ["/sulala-logo.svg"],
};

function SignIn({ searchParams: { by }, params: { lang } }: SignupProps) {
  const t = useTranslations('Auth');

  return (
    <div className="text-black w-10/12 flex flex-col gap-5 items-center">
      {/* SIGN IN HEADER */}
      <h1 className="text-3xl md:text-5xl font-serif font-semibold">{t('signin')}</h1>

      {/* SIGN IN OPTIONS */}
      <PhoneEmailTab />

      {/* FORM */}
      <SignInForm by={by} />

      <div className="divider"></div>

      {/* SOCIAL SIGN UP */}
      <div className="flex gap-4">
        <button
          className="btn border-0 h-100px aspect-square bg-[#f6f6f6] rounded-full hover:bg-primary/20"
          onClick={handleAppleSignIn}
        >
          <img src="/applelogo.svg" alt="" />
        </button>
        <button
          className="btn border-0 h-100px aspect-square bg-[#f6f6f6] rounded-full hover:bg-primary/20"
          onClick={handleGoogleSignIn}
        >
          <img src="/googlelogo.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default SignIn;
