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
function ClientDetailForm({ initialData }: Props) {
  const t = useTranslations("Manage");

  const [formState, action] = useFormState(
    answerSupportRequest,
    EMPTY_FORM_STATE,
  );

  useToastMessage(formState);
  useRedirectRoute(formState);

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-3">
      <div className="bg-tertiary col-span-2 p-8 rounded-[40px] flex flex-col gap-3">
        <h3 className="font-semibold text-xl">{t("customer_info")}</h3>
        <div className="max-w-[1300px] grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            defaultValue={initialData?.vendor_name}
            disabled
            label={t("full_name")}
          />
          <TextInput
            defaultValue={initialData?.vendor_email}
            disabled
            label={t("email_address")}
            type="email"
          />
          <TextAreaInput
            defaultValue={initialData?.phone_number}
            disabled
            label={t("message")}
            className="col-span-2 h-[400px]"
          />
        </div>
      </div>
      <div className="bg-tertiary p-8 rounded-[40px] flex flex-col gap-3">
        <h3 className="font-semibold text-xl">{t("respond_to_customer")}</h3>
        <form action={action} className="max-w-[1300px] grid grid-cols-1 gap-3">
          <TextAreaInput
            name="response"
            id="response"
            label={t("response")}
            placeholder={t("enter_response_for_the_customer")}
          />
          <PrimaryButton name={t("send")} />
        </form>
      </div>
    </div>
  );
}

export default ClientDetailForm;
