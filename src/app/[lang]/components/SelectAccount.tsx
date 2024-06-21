"use client";
import SecondaryButton from "@/components/common/ui/SecondaryButton";
import { useParams } from "next/navigation";
import { isAndroid, isIphone } from "@/lib/detect/client";
import pushNotification from "@/utils/pushNotification.util";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import React from "react";

const ACCOUNTS = [
  {
    label: "Marketplace Account",
    value: "farmer",
    description:
      "Add, Manage, Record & Track the details of your animals and shop the best products for your animals sourced from best suppliers.",
    image: "/icons/app-and-play-store.png",
  },
  {
    label: "Delivery Partner",
    value: "driver",
    description:
      "Offer your best services as Sulala Delivery Partners for best transportation and logistics services.",
    image: "/icons/app-and-play-store.png",
  },
  {
    label: "Vendor Account",
    value: "vendor",
    description:
      "Registed your business & Upload your products on Sulala Dashboard to reach a wide audience of animal breeders and pet lovers in the Middle East...",
    image: "/sulala-logo.svg",
  },
];

function SelectAccount() {
  const { lang } = useParams();
  const t = useTranslations("Auth");
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
      const href = "/auth/sign-up";
      router.push(href);
    }
  };
  return (
    <form action={() => {}} className="flex flex-col gap-8 group w-1/2">
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
                <h2>{item.label}</h2>
              </div>
              <img
                src={item.image}
                alt=""
                className={`h-[20px] invisible peer-checked:visible absolute top-3 ${lang == "ar" ? "left-3" : "right-3"}`}
              />
              <div className="collapse-content text-black bg-white peer-checked:bg-gradient-to-b from-primary/0 to-primary/10">
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-1/2 mx-auto">
        <SecondaryButton name={"continue"} padding="sm" type="submit" />
      </div>
    </form>
  );
}

export default SelectAccount;
