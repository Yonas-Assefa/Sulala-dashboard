"use client";
import { logout } from "@/actions/common/logout";
import React from "react";

function LogoutSwitch() {
  const [isPending, startTransition] = React.useTransition();

  const handleLogoutClick = async () => {
    startTransition(async () => {
      await logout();
    });
  };
  return (
    <button
      onClick={handleLogoutClick}
      className="swap swap-rotate text-primary hover:text-white stroke-primary hover:stroke-white dark:stroke-white bg-white dark:bg-gray-600 dark:text-white hover:bg-primary rounded-lg p-2 aspect-square"
    >
      {isPending ? (
        <span className="loading loading-spinner w-5 h-5"></span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-log-out"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      )}
    </button>
  );
}

export default LogoutSwitch;
