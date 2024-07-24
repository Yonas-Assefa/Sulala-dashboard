"use client";
import { signIn } from "next-auth/react";

export const handleGoogleSignIn = () => {
  signIn("google", undefined, {
    prompt: "select_account",
  });
};

export const handleAppleSignIn = () => {
  signIn("apple");
};
