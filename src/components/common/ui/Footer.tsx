import { Link } from "@/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("Auth");
  return (
    <div className="text-[#a2a6ac] p-8">
      {t("have_a_question")}{" "}
      <Link
        href={"/support/contact"}
        className="text-primary dark:text-green-400 font-semibold"
      >
        {t("contact_support")}
      </Link>
    </div>
  );
}

export default Footer;
