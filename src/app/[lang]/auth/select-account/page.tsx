"use client";
import { acceptApproval } from "@/actions/auth/accept-approval";
import { getPersonalInfo } from "@/actions/settings/get-personal-info";
import pushNotification from "@/utils/pushNotification.util";
import { redirect, useRouter } from "@/i18n/navigation";
import React from "react";
import { useTranslations } from "next-intl";

type Props = {
  searchParams: {
    action: string;
  };
};

async function SelectAccount({ searchParams: { action } }: Props) {
  const router = useRouter();
  const t = useTranslations("Auth");

  return (
    <div className="text-black w-10/12 flex flex-col gap-5 items-center">
      {/* SIGN IN HEADER */}
      <h1 className="text-[30px] font-serif font-semibold">
        Select Account Type
      </h1>

      <form action={() => {}} className="flex flex-col gap-4 group">
        <div className="flex">
          <div className="card drop-shadow-lg flex flex-col gap-2">
            {[
              { label: "Farmer Account", value: "farmer" },
              { label: "Customer Account", value: "customer" },
              { label: "Vendor Account", value: "vendor" },
            ].map((item, i) => (
              <div className="collapse bg-white" key={item.value}>
                <input
                  type="radio"
                  name="account_type"
                  id={item.value}
                  className="peer"
                  defaultChecked={i == 0}
                />
                <div className="collapse-title text-xl bg-tertiary font-medium peer-checked:bg-white peer-checked:text-primary peer-checked:font-bold transition-all">
                  {item.label}
                </div>
                <div className="collapse-content peer-checked:bg-gradient-to-b from-primary/0 to-primary/10">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quae, dignissimos.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center w-full">
          <button className="btn btn-outline group-has-[:checked]:btn-success">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default SelectAccount;
