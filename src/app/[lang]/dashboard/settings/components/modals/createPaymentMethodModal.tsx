"use client";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import TextInput from "@/components/common/form/TextInput";
import React, { useEffect } from "react";
import { createBillingInfo } from "@/actions/settings/create-billing-info";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";
import { closeModal, isModalOpen } from "@/lib/modals";

function CreatePaymentMethodModal() {
  const [formState, action] = useFormState(createBillingInfo, EMPTY_FORM_STATE);

  const t = useTranslations("Settings.BillingInfo");

  useToastMessage(formState);
  useRedirectRoute(formState);

  useEffect(() => {
    if (
      formState?.status === "SUCCESS" &&
      isModalOpen("create_payment_method_modal")
    ) {
      closeModal("create_payment_method_modal", true);
    }
  }, [formState]);

  return (
    <dialog id="create_payment_method_modal" className="modal">
      <form
        action={action}
        className="modal-box text-black dark:text-white w-11/12 max-w-sm bg-white dark:bg-gray-800 px-0"
      >
        <div className="border-b-2 border-gray-200 pb-3">
          <h3 className="font-bold text-xl text-black dark:text-white text-center font-serif">
            {t("add_new_card")}
          </h3>
        </div>
        <div className="px-5 flex flex-col gap-3 mt-4">
          <TextInput
            id="card_holder_name"
            label={t("cardholder_name")}
            name="card_holder_name"
            placeholder={t("enter_name")}
            error={formState?.fieldErrors?.account_holder_name?.[0]}
          />
          <TextInput
            id="card_number"
            label={t("card_number")}
            name="card_number"
            placeholder={t("enter_card_number")}
            error={formState?.fieldErrors?.card_number?.[0]}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              id="expiry_date"
              label={t("expiration_date")}
              name="expiry_date"
              placeholder={t("mm/yy")}
              dynamicPlaceholder
              error={formState?.fieldErrors?.expiration_date?.[0]}
            />
            <TextInput
              id="cvc"
              label={t("cvc")}
              name="cvc"
              placeholder="***"
              dynamicPlaceholder
              error={formState?.fieldErrors?.cvc?.[0]}
            />
          </div>
          <PrimaryButton name={t("add")} type="submit" />
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button className="text-black"></button>
      </form>
    </dialog>
  );
}

export default CreatePaymentMethodModal;
