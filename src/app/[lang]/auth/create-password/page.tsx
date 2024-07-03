import CreatePasswordForm from "./CreatePasswordForm";
import React from "react";
import { getTranslations } from "next-intl/server";

async function CreatePassword() {
  const t = await getTranslations("Auth");

  return (
    <div className="w-10/12 flex flex-col gap-8 items-center">
      {/* CREATE PASSWORD HEADER */}
      <h1 className="text-3xl md:text-[40px] font-serif font-semibold text-center">
        {t("create_password")}
      </h1>

      <CreatePasswordForm />
    </div>
  );
}

export default CreatePassword;
