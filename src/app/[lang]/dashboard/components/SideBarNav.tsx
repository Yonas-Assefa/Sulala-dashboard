"use client";
import React, { ElementRef } from "react";
import SulalaLogo from "@/components/SulalaLogo";
import { Link } from "@/i18n/navigation";
import routes from "./sideBarRoutes";
import { usePathname } from "@/i18n/navigation";
import { useDetectClickOutside } from "react-detect-click-outside";
import SideBarOptions from "./SideBarOptions";
import { useTranslations } from "next-intl";

type Props = {
  isSuperUser: boolean;
};
function SideBarNav({ isSuperUser }: Props) {
  const pathname = usePathname();
  const menuRef = React.useRef<ElementRef<"input">>(null);
  const t = useTranslations("SideBar");

  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (menuRef.current && menuRef.current.checked) {
        menuRef.current.checked = false;
      }
    },
  });

  return (
    <nav
      ref={ref}
      className="md:min-w-[300px] z-50 drop-shadow-lg md:h-full bg-tertiary dark:bg-gray-900 dark:border-0 fixed md:relative md:w-auto w-full h-auto md:flex flex-col justify-between"
    >
      <div className="group">
        <div className="flex flex-row justify-between items-center">
          <SulalaLogo />
          <div className="m-2 p-1 md:hidden bg-primary md:bg-transparent rounded-sm">
            <input
              ref={menuRef}
              type="checkbox"
              className="peer"
              hidden
              name="nav_bar"
              id="nav_bar"
            />
            <label
              htmlFor="nav_bar"
              className=" p-1 flex flex-col gap-1 cursor-pointer"
            >
              <div className="bg-tertiary md:bg-primary h-[2px] md:h-[3px] w-[25px] md:w-[18px] group-has-[:checked]:rotate-45 md:rotate-45 md:-translate-y-[2px] group-has-[:checked]:translate-y-[6px] md:group-has-[:checked]:translate-y-[9px] transition-all" />
              <div className="bg-tertiary md:bg-primary md:hidden h-[2px] w-[25px] group-has-[:checked]:invisible" />
              <div className="bg-tertiary md:bg-primary h-[2px] md:h-[3px] w-[25px] md:w-[18px] group-has-[:checked]:-rotate-45 md:-rotate-45 md:translate-y-[2px] group-has-[:checked]:-translate-y-[6px] md:group-has-[:checked]:-translate-y-[9px] transition-all" />
            </label>
          </div>
        </div>
        <ul className="group-has-[:checked]:flex hidden transition-all md:flex flex-col list-none peer-has-[checked]:hidden">
          {routes
            .filter((route) =>
              isSuperUser ? route.protected : !route.protected,
            )
            .map((route) => {
              const isActive = pathname.includes(route.path.split("?")[0]);
              return (
                <Link href={route.path as any} key={route.name}>
                  <li
                    className={`flex gap-3 p-4 ${!isActive ? "bg-transparent text-[#52565D]" : "bg-primary text-white"}`}
                    key={route.name}
                  >
                    <img
                      src={isActive ? route.activeIcon : route.icon}
                      alt=""
                    />
                    <h6>{t(route.name)}</h6>
                    {route.protected && (
                      <img src="/icons/key.svg" alt="" width="10px" />
                    )}
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
      <div className="flex md:flex-row md:gap-3 items-center">
        <div className="m-6 hidden md:flex flex-row gap-3 items-center text-black dark:text-white font-semibold">
          <img
            src="/icons/whatsup-logo.svg"
            alt="whatsup icon"
            className="h-[30px] aspect-square"
          />
          <Link href={"/support/contact"}>{t("contact_support")}</Link>
        </div>
        <SideBarOptions />
      </div>
    </nav>
  );
}

export default SideBarNav;
