"use client";
import { signIn } from "next-auth/react";

export const handleGoogleSignIn = () => {
  signIn("google", { prompt: "login" });
};
