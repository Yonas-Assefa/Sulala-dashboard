"use client";
import { getOnePromotion } from "@/actions/promotion/get-promotions";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { closeModal } from "@/lib/modals";
import React from "react";
import DateInput from "../form/DateInput";
import { updatePromotionStatus } from "@/actions/promotion/update-promotion-status";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import pushNotification from "@/utils/pushNotification.util";

function ConfirmModal() {
  const [promotion, setPromotion] = React.useState<{
    id: string;
    start_date: string;
    end_date: string;
    status: string;
  }>();
  const [formState, setFormState] = React.useState<FormState>(EMPTY_FORM_STATE);
  const { deleteQueryStringAndPush, searchParams } = useCreateQueryString();
  const item_id = searchParams.get("item")?.toString();
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (item_id) {
      startTransition(() => {
        getOnePromotion(item_id).then((data: any) => {
          setPromotion(data);
          console.log({ data });
        });
      });
    }
  }, [item_id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      const form = e.currentTarget;
      e.preventDefault();
      const formData = new FormData(form);
      try {
        const response = await updatePromotionStatus(formData);
        if (response.status === "SUCCESS") {
          pushNotification(response.message, "success");
          deleteQueryStringAndPush("item");
          closeModal("confirm_item_table_modal");
        } else {
          setFormState(response);
          pushNotification(response.message, "error");
        }
      } catch (error: any) {
        console.error(error);
        pushNotification(error.message, "error");
      }
    });
  };

  const handleCancel = async () => {
    deleteQueryStringAndPush("item");
    await new Promise((resolve) => setTimeout(resolve, 100));
    closeModal("confirm_item_table_modal");
  };

  if (!item_id)
    return (
      <dialog id="confirm_item_table_modal" className="modal">
        <span className="loading loading-dots loading-md text-primary"></span>
      </dialog>
    );

  return (
    <dialog id="confirm_item_table_modal" className="modal">
      <form
        onSubmit={onSubmit}
        className="modal-box w-11/12 max-w-xl bg-white dark:bg-gray-800 px-0"
      >
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
        <div>
          <input
            hidden
            type="text"
            value={promotion?.id}
            id="item_id"
            name="item_id"
          />
          <input
            hidden
            type="text"
            value={promotion?.status}
            id="status"
            name="status"
          />
        </div>
        <div className="flex flex-col bg-tertiary m-3 p-2">
          <h4 className="font-semibold">Edit endtime</h4>
          <hr />
          <div className="w-full flex flex-col justify-center">
            <DateInput
              defaultValue={new Date(Date.now() + 60000 / 2).toISOString()}
              // label={t("start_date_&_time")}
              label=""
              id="start_datetime"
              name="start_datetime"
              disabled
              error={formState?.fieldErrors?.start_date?.[0]}
            />
            <DateInput
              value={promotion?.end_date}
              disabled={isPending}
              // label={t("end_date_&_time")}
              label=""
              id="end_datetime"
              name="end_datetime"
              error={formState?.fieldErrors?.end_date?.[0]}
            />
          </div>
        </div>
        <div className="px-5 flex flex-col gap-3 my-4">
          <button
            type="submit"
            disabled={isPending}
            className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 "
            id="confirm_item_table_modal_confirm"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md text-primary"></span>
            ) : (
              "Confirm"
            )}
          </button>
          <button
            onClick={handleCancel}
            disabled={isPending}
            type="button"
            className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-black disabled:text-gray-400"
            id="confirm_item_table_modal_cancel"
          >
            Cancel
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button className="text-black" onClick={handleCancel}></button>
      </form>
    </dialog>
  );
}

export default ConfirmModal;
