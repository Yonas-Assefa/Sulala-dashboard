"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

function LandingNavBar({ lang }: { lang: string }) {
  type ScrollDirection = "going-up" | "going-down" | "at-top" | "at-bottom";
  let oldScrollY = 0;

  const [direction, setDirection] = useState<ScrollDirection>("at-top");
  const t = useTranslations("Landing");

  useEffect(() => {
    global.window && window.addEventListener("scroll", controlDirection);
    return () => {
      global.window && window.removeEventListener("scroll", controlDirection);
    };
  }, [global.window && window]);

  const controlDirection = () => {
    if (!global.window || !window) return;
    if (window.scrollY == 0) {
      setDirection("at-top");
      oldScrollY = window.scrollY;
    } else if (
      window.scrollY + window.innerHeight ==
      document.body.scrollHeight
    ) {
      setDirection("at-bottom");
      oldScrollY = window.scrollY;
    } else if (
      window.scrollY > oldScrollY &&
      window.scrollY - oldScrollY > 25 &&
      window.scrollY > 50
    ) {
      setDirection("going-down");
      oldScrollY = window.scrollY;
    } else if (
      window.scrollY < oldScrollY &&
      window.scrollY - oldScrollY < 25
    ) {
      setDirection("going-up");
      oldScrollY = window.scrollY;
    }
  };

  return (
    <>
      {["going-up", "at-top"].includes(direction) && (
        <nav
          className={`${direction == "going-up" ? "bg-white" : "bg-transparent"} transition-all z-40 flex flex-row justify-between items-center drop-shadow-lg fixed w-full`}
        >
          <div className="text-black md:p-5 p-4 flex items-center gap-3 self-start">
            <img
              src={
                direction == "going-up"
                  ? "/sulala-logo.svg"
                  : "/sulala-logo-white.svg"
              }
              className="md:w-[40px] w-[30px]"
            />
            <h2
              className={`${direction == "going-up" ? "text-primary" : "text-white"} font-bold font-serif text-[25px]`}
            >
              {t("sulala")}
            </h2>
          </div>
          <div className=" flex flex-row gap-3 px-3">
            <Link
              href={"/auth/sign-in"}
              className="bg-primary border-gray-200 hover:border-primary text-white font-semibold border p-2 rounded-lg hover:bg-primary/90 hover:text-white transition-all btn"
            >
              {t("signin")}
            </Link>
            <Link
              href={"/auth/sign-up"}
              className="bg-white border-gray-200 hover:border-primary text-primary font-semibold border p-2 rounded-lg hover:bg-primary/90 hover:text-white transition-all btn"
            >
              {t("register")}
            </Link>
            <Link
              href={"/"}
              locale={lang == "en" ? "ar" : "en"}
              className={`swap bg-transparent rounded-lg p-[4px] text-center aspect-square self-center ${direction == "at-top" ? "hover:bg-white text-white hover:text-primary" : "hover:bg-primary text-primary hover:text-white"}`}
            >
              <div className={lang == "en" ? "swap-on" : "swap-off"}>EN</div>
              <div className={lang == "ar" ? "swap-on" : "swap-off"}>عربي</div>
            </Link>
            {/* <label className="swap swap-rotate bg-white hover:bg-primary fill-primary hover:fill-white rounded-lg p-2 aspect-square self-center">
            <input type="checkbox" />
            <svg className="swap-on w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            <svg className="swap-off w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
          </label> */}
          </div>
        </nav>
      )}
    </>
  );
}

export default LandingNavBar;
