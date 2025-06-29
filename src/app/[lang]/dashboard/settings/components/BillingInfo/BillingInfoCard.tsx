import { deleteBillingInfo } from "@/actions/settings/delete-billing-info";
import { setPrimaryBilling } from "@/actions/settings/set-primary-billing";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormState } from "react-dom";

type Props = {
  isPrimary: boolean;
  card_number: string;
  id: number;
};
function BillingInfoCard({ isPrimary, card_number, id }: Props) {
  const [formState, action] = useFormState(setPrimaryBilling, EMPTY_FORM_STATE);

  const [deleteFormState, deleteAction] = useFormState(
    deleteBillingInfo,
    EMPTY_FORM_STATE,
  );

  useToastMessage(formState);
  useRedirectRoute(formState);

  useToastMessage(deleteFormState);
  useRedirectRoute(deleteFormState);

  const t = useTranslations("Settings.BillingInfo");

  const handleSetPrimary = () => {
    if (isPrimary) return;
    const formData = new FormData();
    formData.append("billing_id", id.toString());
    action(formData);
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("billing_id", id.toString());
    deleteAction(formData);
  };

  return (
    <div className="border rounded-[40px] flex flex-row justify-between p-3 w-[300px] md:w-[500px]">
      <div className="flex flex-row gap-2">
        <img src="/icons/mastercard.svg" alt="" />
        <span>••••</span>
        <span>
          {card_number?.slice(card_number.length - 4, card_number.length)}
        </span>
        {isPrimary && (
          <div className="badge badge-warning gap-2 bg-[#fbe46f] p-3">
            {t("primary")}
          </div>
        )}
      </div>
      <div className="self-end justify-self-end mr-1 -mb-1">
        <div className="dropdown dropdown-end">
          <button className="bg-transparent dark:bg-gray-700 rounded-[10px] px-1">
            <img src="/icons/more-horizontal.svg" alt="" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-0 shadow border rounded-box w-52 bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <li className="border-b">
              <button
                onClick={handleSetPrimary}
                className={`${isPrimary && "text-secondary hover:cursor-not-allowed"}`}
              >
                {t("set_as_primary")}
              </button>
            </li>
            <li className="">
              <button onClick={handleDelete}>{t("delete")}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BillingInfoCard;
