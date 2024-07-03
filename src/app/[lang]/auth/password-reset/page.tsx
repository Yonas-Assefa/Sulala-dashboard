import PasswordResetForm from "./PasswordResetForm";
import React from "react";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: {
    vendor_id: string;
    reset_link: string;
  };
};
async function CreatePassword({
  searchParams: { vendor_id, reset_link },
}: Props) {
  const t = await getTranslations("Auth");

  return (
    <div className="w-10/12 flex flex-col gap-8 items-center">
      {/* CREATE PASSWORD HEADER */}
      <h1 className="text-3xl md:text-[40px] font-serif font-semibold text-center">
        {t("reset_password")}
      </h1>

      <PasswordResetForm vendor_id={vendor_id} reset_link={reset_link} />
    </div>
  );
}

export default CreatePassword;
