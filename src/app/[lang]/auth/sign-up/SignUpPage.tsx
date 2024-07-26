"use client";
import { SignupProps } from "@/types/props.type";
import React, { useEffect, useRef } from "react";
import PhoneEmailTab from "../components/PhoneEmailTab";
import SignUpForm from "./SignUpForm";
import { useTranslations } from "next-intl";
import {
  handleGoogleSignIn,
  handleAppleSignIn,
} from "@/actions/auth/ggoleSigninHelper";
import { Metadata } from "next";
import SocialAuthentication from "@/components/common/form/SocialAuthentication";
import { pushErrorNotification } from "@/utils/pushNotification.util";
import { redirect } from "next/navigation";

interface SignUpPageProps {
  by: "phone" | "email" | undefined;
  error?: string;
}

function SignUpPage({ by, error }: SignUpPageProps) {
  const t = useTranslations("Auth");
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (error) {
        pushErrorNotification(error);
        redirect("/auth/sign-up/");
      }
    }
  }, [error]);

  return (
    <div className="w-10/12 flex flex-col gap-5 items-center">
      {/* SIGN IN HEADER */}
      <h1 className="text-3xl md:text-5xl font-serif font-semibold">
        {t("signup")}
      </h1>

      {/* SIGN IN OPTIONS */}
      <PhoneEmailTab />

      {/* FORM */}
      <SignUpForm by={by} />

      <div className="divider"></div>

      {/* SOCIAL SIGN UP */}
      <SocialAuthentication />
    </div>
  );
}

export default SignUpPage;
