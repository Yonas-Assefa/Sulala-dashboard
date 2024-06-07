"use client";
import { signIn } from "next-auth/react";

export const handleGoogleSignIn = () => {
  signIn("google");
};

export const handleAppleSignIn = () => {
  signIn("apple");
};
