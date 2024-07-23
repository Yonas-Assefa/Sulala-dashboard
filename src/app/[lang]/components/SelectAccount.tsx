"use client";
import SecondaryButton from "@/components/common/ui/SecondaryButton";
import { useParams } from "next/navigation";
import { isAndroid, isIphone } from "@/lib/detect/client";
import pushNotification from "@/utils/pushNotification.util";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";

const ACCOUNTS = [
  {
    label: "vendor_account_title",
    value: "vendor",
    description: "vendor_account_description",
    image: "/sulala-logo.svg",
  },
  {
    label: "marketplace_account_title",
    value: "farmer",
    description: "marketplace_account_description",
    image: "/icons/app-and-play-store.png",
  },
  {
    label: "delivery_partner_title",
    value: "driver",
    description: "delivery_partner_description",
    image: "/icons/app-and-play-store.png",
  },
];

function SelectAccount() {
  const { lang } = useParams();
  const t = useTranslations("Landing");
  const router = useRouter();

  const submitForm = (formData: FormData) => {
    const selectedAccount = formData.get("account_type") as string;
    if (selectedAccount === "farmer" || selectedAccount === "driver") {
      if (isAndroid()) {
        pushNotification("Redirecting to Play Store", "info");
        setTimeout(() => {
          window.location.href = "https://play.google.com/";
        }, 2000);
      } else if (isIphone()) {
        pushNotification("Redirecting to App Store", "info");
        setTimeout(() => {
          window.location.href = "https://apps.apple.com/";
        }, 2000);
      } else {
        pushNotification("Scan the QR Code to download the app.", "info");
        router.push("/auth/download-app?store=appstore");
      }
    } else if (selectedAccount === "vendor") {
      const href = "/auth/sign-in";
      router.push(href);
    }
  };
  return (
    <form
      action={submitForm}
      className="flex flex-col gap-8 group w-full p-4 md:p-0 md:w-1/2"
    >
      <div className="flex">
        <div className="card drop-shadow-lg flex flex-col gap-2">
          {ACCOUNTS.map((item, i) => (
            <div className="collapse bg-transparent relative" key={item.value}>
              <input
                type="radio"
                name="account_type"
                id={item.value}
                value={item.value}
                className="peer"
                defaultChecked={i == 0}
              />
              <div className="collapse-title flex justify-between text-xl bg-secondary/40 text-secondary font-medium peer-checked:bg-white peer-checked:text-primary peer-checked:font-bold transition-all">
                <h2>{t(item.label)}</h2>
              </div>
              <img
                src={item.image}
                alt=""
                className={`h-[20px] invisible peer-checked:visible absolute top-3 ${lang == "ar" ? "left-3" : "right-3"}`}
              />
              <div className="collapse-content text-black bg-white peer-checked:bg-gradient-to-b from-primary/0 to-primary/10">
                <p>{t(item.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-1/2 mx-auto">
        <SecondaryButton name={t("continue")} padding="sm" type="submit" />
      </div>
    </form>
  );
}

export default SelectAccount;
