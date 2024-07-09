"use client";
import { answerSupportRequest } from "@/actions/admin-manage/answer-support-request";
import TextAreaInput from "@/components/common/form/TextAreaInput";
import TextInput from "@/components/common/form/TextInput";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormState } from "react-dom";

type Props = {
  initialData: any;
};
function CustomerDetailForm({ initialData }: Props) {
  const t = useTranslations("Manage");

  const [formState, action] = useFormState(
    answerSupportRequest,
    EMPTY_FORM_STATE,
  );

  useToastMessage(formState);
  useRedirectRoute(formState);

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-3">
      <div className="bg-tertiary text-black dark:bg-gray-800 dark:text-white col-span-2 p-8 rounded-[40px] flex flex-col gap-3">
        <h3 className="font-semibold text-xl">{t("customer_info")}</h3>
        <div className="max-w-[1300px] flex flex-col md:grid md:grid-cols-2 gap-3">
          <TextInput
            defaultValue={initialData?.full_name}
            disabled
            label={t("full_name")}
          />
          <TextInput
            defaultValue={initialData?.email}
            disabled
            label={t("email_address")}
            type="email"
          />
          <TextAreaInput
            defaultValue={initialData?.message}
            disabled
            label={t("message")}
            className="col-span-2 h-[400px]"
            autoFocus
          />
        </div>
      </div>
      <div className="bg-tertiary text-black dark:bg-gray-800 dark:text-white p-8 rounded-[40px] flex flex-col gap-3">
        <h3 className="font-semibold text-xl">{t("respond_to_customer")}</h3>
        <form action={action} className="max-w-[1300px] grid grid-cols-1 gap-3">
          <input
            type="text"
            id="id"
            hidden
            name="id"
            value={initialData?.id}
            onChange={() => {}}
          />
          <TextAreaInput
            name="response"
            id="response"
            label={t("response")}
            placeholder={t("enter_response_for_the_customer")}
            error={formState?.fieldErrors?.response?.[0]}
          />
          <PrimaryButton name={t("send")} />
        </form>
      </div>
    </div>
  );
}

export default CustomerDetailForm;
