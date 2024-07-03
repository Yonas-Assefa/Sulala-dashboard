import React from "react";
import EnterOtpForm from "./EnterOtpForm";
import { redirect } from "@/i18n/navigation";
import BackButton from "@/components/common/ui/BackButton";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: {
    phone: string;
    action: string;
  };
};

async function EnterOTP({ searchParams: { phone: rawPhone, action } }: Props) {
  const phone = "+" + rawPhone.trim().replace("+", "");

  if (!phone) return redirect("/auth/sign-in");
  const t = await getTranslations("Auth");

  return (
    <div className="w-10/12 h-3/5 px-6 flex flex-col justify-evenly gap-5 items-center">
      {/* BACK BUTTON */}
      <div className="flex w-full mb-4">
        <BackButton />
      </div>
      {/* SIGN IN HEADER */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-[40px] font-serif font-semibold self-start">
          {t("enter_code")}
        </h1>
        <p className="text-gray-500">
          {t("we_have_sent_a_verification_code")} &nbsp;
          <span className="text-primary font-semibold">{phone}</span>
        </p>
        <EnterOtpForm phone={phone} action={action} />
      </div>
    </div>
  );
}

export default EnterOTP;
