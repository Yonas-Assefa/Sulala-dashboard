import BackButton from "@/components/common/ui/BackButton";
import React from "react";
import { useTranslations } from "next-intl";

type Props = {
  searchParams: {
    email: string;
  };
};

function ConfirmationLetter({ searchParams: { email } }: Props) {
  const t = useTranslations("Auth");

  return (
    <div className="text-black w-10/12 h-4/5 px-6 flex flex-col justify-evenly pb-8 items-center">
      <div className="flex w-full">
        <BackButton />
      </div>
      {/* SIGN IN HEADER */}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-[40px] text-center font-serif font-semibold self-start">
          {t("the_confirmation_letter_has_been_sent")}
        </h1>
        <p className="text-gray-500">{t("check_mail_box", { email })}</p>
        <div className="flex flex-col gap-6 w-full">
          {/* SIGN UP LINK */}
          <div className="flex flex-col gap-3 w-full items-center"></div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationLetter;
