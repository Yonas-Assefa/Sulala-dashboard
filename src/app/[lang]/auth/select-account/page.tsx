"use client";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const ACCOUNTS = [
  {
    label: "farmer_account",
    value: "farmer",
    description: "farmer_account_description",
    image: "/icons/app-and-play-store.png",
  },
  {
    label: "driver_account",
    value: "driver",
    description: "deriver_account_description",
    image: "/icons/app-and-play-store.png",
  },
  {
    label: "vendor_account",
    value: "vendor",
    description: "vendor_account_description",
    image: "/sulala-logo.svg",
  },
];

type Props = {
  searchParams: {
    action: string;
  };
  params: {
    lang: string;
  };
};

async function SelectAccount({
  searchParams: { action },
  params: { lang },
}: Props) {
  const router = useRouter();
  const t = useTranslations("Auth");

  const submitForm = (formData: FormData) => {
    console.log({ formData: formData.get("account_type") });
    const selectedAccount = formData.get("account_type") as string;
    if (selectedAccount === "farmer" || selectedAccount === "driver") {
      window.location.href = "https://play.google.com/store/";
    } else if (selectedAccount === "vendor") {
      const href = action == "signup" ? "/auth/sign-up" : "/auth/sign-in";
      router.push(href);
    }
  };

  return (
    <div className="text-black w-10/12 flex flex-col gap-5 items-center">
      {/* SIGN IN HEADER */}
      <h1 className="text-[30px] font-serif font-semibold">
        {t("select_account_type")}
      </h1>

      <form action={submitForm} className="flex flex-col gap-8 group">
        <div className="flex">
          <div className="card drop-shadow-lg flex flex-col gap-2">
            {ACCOUNTS.map((item, i) => (
              <div className="collapse bg-white relative" key={item.value}>
                <input
                  type="radio"
                  name="account_type"
                  id={item.value}
                  value={item.value}
                  className="peer"
                  defaultChecked={i == 0}
                />
                <div className="collapse-title flex justify-between text-xl bg-tertiary font-medium peer-checked:bg-white peer-checked:text-primary peer-checked:font-bold transition-all">
                  <h2>{t(item.label)}</h2>
                </div>
                <img
                  src={item.image}
                  alt=""
                  className={`h-[20px] invisible peer-checked:visible absolute top-3 ${lang == "ar" ? "left-3" : "right-3"}`}
                />
                <div className="collapse-content peer-checked:bg-gradient-to-b from-primary/0 to-primary/10">
                  <p>{t(item.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton name={t("continue")} padding="sm" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default SelectAccount;
