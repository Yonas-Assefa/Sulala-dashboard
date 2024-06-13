import React from "react";
import LangSwitch from "../../components/LangSwitch";
import ThemeSwitch from "../../components/ThemeSwitch";
import LogoutSwitch from "../../components/LogoutSwitch";

function SideBarOptions() {
  return (
    <div className="md:dropdown md:dropdown-top dropdown-end w-full md:w-auto">
      <div
        tabIndex={0}
        role="button"
        className="p-2 hidden md:block text-black dark:text-white"
      >
        •&nbsp;•&nbsp;•
      </div>
      <button
        tabIndex={0}
        className="dropdown-content z-[1] bg-tertiary md:dark:bg-gray-800 dark:bg-black menu p-2 md:shadow md:drop-shadow-lg rounded-box block absolute mt-3 mr-2 md:mt-0 md:mr-0 md:relative opacity-20 focus-within:opacity-100 md:opacity-100"
      >
        <div className="flex flex-row items-center justify-end gap-3 px-4">
          {/* LANGUAGE */}
          <LangSwitch />
          {/* THEME */}
          <ThemeSwitch />
          {/* LOGOUT */}
          <LogoutSwitch />
        </div>
      </button>
    </div>
  );
}

export default SideBarOptions;
