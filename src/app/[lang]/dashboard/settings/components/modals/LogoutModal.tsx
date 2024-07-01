"use client";
import { logout } from "@/actions/common/logout";
import { closeModal } from "@/lib/modals";
import React, { useTransition } from "react";
import { useTranslations } from "next-intl";

function LogoutModal() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Settings.PersonalInfo");

  const handleLogout = async () => {
    startTransition(async () => {
      await logout();
      closeModal("logout_setting_modal");
    });
  };

  return (
    <dialog id="logout_setting_modal" className="modal">
      <div className="modal-box w-11/12 max-w-sm bg-white dark:bg-gray-800 px-0">
        <div className="border-b-2 border-gray-200 pb-3">
          <h3 className="font-bold text-xl text-black dark:text-white text-center font-serif">
            {t("log_out")}
          </h3>
        </div>
        <div className="px-5 flex flex-col gap-3 my-4">
          <button
            onClick={handleLogout}
            className="btn w-full rounded-[40px] bg-[#f6f6f6] dark:bg-gray-700 hover:bg-primary/20 border-0 text-red-600 "
            type="submit"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md text-primary"></span>
            ) : (
              t("yes")
            )}
          </button>
          <form method="dialog">
            <button className="btn modal-backdrop w-full rounded-[40px] bg-[#f6f6f6] dark:bg-gray-700 hover:bg-primary/20 border-0 text-black">
              {t("cancel")}
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="text-black"></button>
      </form>
    </dialog>
  );
}

export default LogoutModal;
