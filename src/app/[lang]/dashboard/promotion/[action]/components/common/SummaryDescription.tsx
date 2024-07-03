import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  title: string;
  description: string | undefined;
};
function SummaryDescription({ title, description }: Props) {
  const t = useTranslations("Commons");
  return (
    <div className="flex flex-col gap-3 p-2">
      <h4 className="text-lg font-semibold capitalize">{title}</h4>
      {description ? (
        <p>{description}</p>
      ) : (
        <p className="text-black/50 dark:text-white/50 italic text-sm font-normal">
          {t("no_description")}
        </p>
      )}
    </div>
  );
}

export default SummaryDescription;
