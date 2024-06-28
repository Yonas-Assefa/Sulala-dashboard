import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  id: string;
  error: boolean;
};

function LargeImageAddPlaceholder({ id, error }: Props) {
  const t = useTranslations("Commons");
  return (
    <label
      htmlFor={id}
      className={`flex flex-col items-center justify-center gap-5 cursor-pointer w-full p-4 border rounded-[30px] border-dashed h-[300px] select-none ${error ? "border-danger bg-dangerlight" : "bg-white"}`}
    >
      <img src="/icons/image.svg" alt="" />
      <div className="flex flex-col justify-center items-center text-secondary">
        <p>{t("upload_upto_8_images")}</p>
        <p>{t("maximum_size_20_mb")}</p>
      </div>
      <div className="flex gap-2">
        <img src="/icons/upload.svg" alt="" className="w-[15px]" />
        <p className="text-primary font-semibold">{t("upload")}</p>
      </div>
    </label>
  );
}

export default LargeImageAddPlaceholder;
