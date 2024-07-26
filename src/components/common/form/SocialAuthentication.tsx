import {
  handleAppleSignIn,
  handleGoogleSignIn,
} from "@/actions/auth/ggoleSigninHelper";
import React from "react";

function SocialAuthentication() {
  return (
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
  );
}

export default SocialAuthentication;
