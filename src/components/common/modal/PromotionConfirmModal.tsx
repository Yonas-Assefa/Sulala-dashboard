"use client";
import { getOnePromotion } from "@/actions/promotion/get-promotions";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { closeModal } from "@/lib/modals";
import React from "react";
import DateInput from "../form/DateInput";
import { updatePromotionStatus } from "@/actions/promotion/update-promotion-status";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import pushNotification from "@/utils/pushNotification.util";
import { useFormState } from "react-dom";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

function ConfirmModal() {
  const [promotion, setPromotion] = React.useState<{
    id: string;
    start_date: string;
    end_date: string;
    status: string;
  }>();
  // const [formState, setFormState] = React.useState<FormState>(EMPTY_FORM_STATE);
  const { deleteQueryStringAndPush, searchParams } = useCreateQueryString();
  const item_id = searchParams.get("item")?.toString();
  const [isPending, startTransition] = React.useTransition();

  const [formState, action] = useFormState(
    updatePromotionStatus,
    EMPTY_FORM_STATE,
  );

  useToastMessage(formState);
  useRedirectRoute(formState);

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

  React.useEffect(() => {
    if (formState.status === "SUCCESS") {
      deleteQueryStringAndPush("item");
      closeModal("confirm_item_table_modal");
    }
  }, [formState]);

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
        action={action}
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
        <div className="flex flex-col bg-tertiary dark:bg-gray-700 rounded-md m-3 p-2 gap-3">
          <h4 className="font-semibold text-xl text-gray-600 dark:text-white">
            Edit end date and time
          </h4>
          <hr />
          <div className="w-full flex flex-col justify-center">
            <DateInput
              defaultValue={new Date().toISOString()}
              // label={t("start_date_&_time")}
              label="Start Date & Time"
              id="start_datetime"
              name="start_datetime"
              disabled
              error={formState?.fieldErrors?.start_date?.[0]}
            />
            <DateInput
              value={promotion?.end_date}
              disabled={isPending}
              // label={t("end_date_&_time")}
              label="End Date & Time"
              id="end_datetime"
              name="end_datetime"
              error={formState?.fieldErrors?.end_date?.[0]}
            />
          </div>
        </div>
        <div className="px-5 flex flex-col gap-3 my-4">
          <PrimaryButton type="submit" disabled={isPending} name={"Confirm"} />
          <SecondaryButton
            type="button"
            handleClick={handleCancel}
            name={"Cancel"}
          />
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button className="text-black" onClick={handleCancel}></button>
      </form>
    </dialog>
  );
}

export default ConfirmModal;
