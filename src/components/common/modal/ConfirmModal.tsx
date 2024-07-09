"use client";
import { closeModal } from "@/lib/modals";
import React from "react";

function ConfirmModal() {
  const handleConfirm = async () => {
    closeModal("confirm_item_table_modal");
  };

  const handleCancel = async () => {
    closeModal("confirm_item_table_modal");
  };

  return (
    <dialog id="confirm_item_table_modal" className="modal">
      <div className="modal-box w-11/12 max-w-sm bg-white dark:bg-gray-800 px-0">
        <div className="border-b-2 border-gray-200 pb-3">
          <h3 className="font-bold text-xl text-black dark:text-white text-center font-serif">
            Confirm Action
          </h3>
        </div>
        <div className="p-3 bg-dangerlight text-danger text-center">
          <p>
            This will change the promotion start date to the current date. Are
            you sure you want to continue?
          </p>
        </div>
        <div className="px-5 flex flex-col gap-3 my-4">
          <button
            onClick={handleConfirm}
            className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 "
            id="confirm_item_table_modal_confirm"
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-black "
            id="confirm_item_table_modal_cancel"
          >
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="text-black"></button>
      </form>
    </dialog>
  );
}

export default ConfirmModal;
