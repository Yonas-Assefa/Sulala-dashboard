"use client";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { closeModal } from "@/lib/modals";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import { useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";

type Props = {
  deleteAction?: {
    action: (formData: FormData) => Promise<FormState>;
    formData: { formDataKey: string; searchKey: string }[];
  };
};
function DeleteModal({ deleteAction }: Props) {
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState(EMPTY_FORM_STATE);
  const { deleteQueryStringAndPush } = useCreateQueryString();
  const item = searchParams.get("item")?.toString();
  const items_length = item?.split(",")?.filter((ele) => ele != "").length || 0;
  const [isPending, startTransition] = useTransition();

  useToastMessage(formState);
  useRedirectRoute(formState);

  const handleDelete = async () => {
    startTransition(async () => {
      const formData = new FormData();
      deleteAction?.formData.forEach((ele) => {
        formData.append(ele.formDataKey, searchParams.get(ele.searchKey) || "");
      });
      const response = await deleteAction?.action(formData);
      setFormState(response || EMPTY_FORM_STATE);
      if (response?.status === "SUCCESS") {
        deleteQueryStringAndPush("item");
        closeModal("delete_item_table_modal");
      }
    });
  };

  const handleCancel = async () => {
    deleteQueryStringAndPush("item");
    await new Promise((resolve) => setTimeout(resolve, 100));
    closeModal("delete_item_table_modal");
  };

  if (!item)
    return (
      <dialog id="delete_item_table_modal" className="modal">
        <span className="loading loading-dots loading-md text-primary"></span>
      </dialog>
    );

  return (
    <dialog id="delete_item_table_modal" className="modal">
      <div className="modal-box w-11/12 max-w-sm bg-white px-0">
        <div className="border-b-2 border-gray-200 pb-3">
          <h3 className="font-bold text-xl text-black text-center font-serif">
            Delete{" "}
            {items_length > 1
              ? `${items_length} items?`
              : `item ${item?.replace(",", "")}`}
          </h3>
        </div>
        <div className="px-5 flex flex-col gap-3 my-4">
          <button
            onClick={handleDelete}
            className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 "
            type="submit"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md text-primary"></span>
            ) : (
              "Yes"
            )}
          </button>
          <button
            onClick={handleCancel}
            className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-black "
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

export default DeleteModal;
