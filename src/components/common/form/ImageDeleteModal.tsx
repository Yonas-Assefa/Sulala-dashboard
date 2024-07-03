"use client";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { closeModal } from "@/lib/modals";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import { useTranslations } from "next-intl";
import { revalidatePath } from "next/cache";
import { handleClientScriptLoad } from "next/script";
import React, { useState, useTransition } from "react";

type Props = {
  isPending: boolean;
};

function ImageDeleteModal({ isPending }: Props) {
  const handleClickOutside = () => {
    closeModal("image_delete_modal", true);
  };

  const t = useTranslations("Commons");

  return (
    <dialog id="image_delete_modal" className="modal">
      <div className="modal-box w-11/12 max-w-sm bg-white dark:bg-gray-800 px-0">
        <div className="border-b-2 border-gray-200 pb-3">
          <h3 className="font-bold text-xl text-black dark:text-white text-center font-serif">
            {t("remove_image")}
          </h3>
        </div>
        <div className="px-5 flex flex-col gap-3 my-4">
          <p className="text-center">
            {t("are_you_sure_to_delete_this_image")}
          </p>
          <button
            className="btn w-full rounded-[40px] bg-[#f6f6f6] dark:bg-gray-700 hover:bg-primary/20 border-0 text-red-600 "
            type="button"
            id={"image_delete_modal_confirm"}
            name={"image_delete_modal_confirm"}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md text-primary"></span>
            ) : (
              t("yes")
            )}
          </button>
          <button
            type="button"
            className="btn w-full rounded-[40px] bg-[#f6f6f6] dark:bg-gray-700 hover:bg-primary/20 border-0 text-black "
            id={"image_delete_modal_cancel"}
            name={"image_delete_modal_cancel"}
          >
            {t("cancel")}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={handleClickOutside}></div>
    </dialog>
  );
}

export default ImageDeleteModal;
