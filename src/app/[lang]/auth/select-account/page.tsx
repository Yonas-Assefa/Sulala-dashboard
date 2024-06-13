"use client";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";

type Props = {
  searchParams: {
    action: string;
  };
};

async function SelectAccount({ searchParams: { action } }: Props) {
  return (
    <div className="text-black w-10/12 flex flex-col gap-5 items-center">
      {/* SIGN IN HEADER */}
      <h1 className="text-[30px] font-serif font-semibold">
        Select Account Type
      </h1>

      <form action={() => {}} className="flex flex-col gap-8 group">
        <div className="flex">
          <div className="card drop-shadow-lg flex flex-col gap-2">
            {[
              {
                label: "Farmer Account",
                value: "farmer",
                description:
                  "showcase their livestock, crops, and agricultural products, connecting them with potential buyers and facilitating business growth in the Middle Eastern market.",
                image: "/icons/app-and-play-store.png",
              },
              {
                label: "Vendor Account",
                value: "vendor",
                description:
                  "empowers sellers of equipment, tools, foods, and related products to reach a wide audience of animal enthusiasts and professionals in the Middle East",
                image: "/sulala-logo.svg",
              },
            ].map((item, i) => (
              <div className="collapse bg-white relative" key={item.value}>
                <input
                  type="radio"
                  name="account_type"
                  id={item.value}
                  className="peer"
                  defaultChecked={i == 0}
                />
                <div className="collapse-title flex justify-between text-xl bg-tertiary font-medium peer-checked:bg-white peer-checked:text-primary peer-checked:font-bold transition-all">
                  <h2>{item.label}</h2>
                </div>
                <img
                  src={item.image}
                  alt=""
                  className="h-[20px] invisible peer-checked:visible absolute right-3 top-3"
                />
                <div className="collapse-content peer-checked:bg-gradient-to-b from-primary/0 to-primary/10">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton name="Continue" padding="sm" href="/auth/sign-up" />
        </div>
      </form>
    </div>
  );
}

export default SelectAccount;
