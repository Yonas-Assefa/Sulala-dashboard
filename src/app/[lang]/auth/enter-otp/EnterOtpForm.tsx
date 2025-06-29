"use client";
import { enterOtp } from "@/actions/auth/enter-otp";
import { resendOtp } from "@/actions/auth/resend-otp";
import OTPInput from "@/components/common/form/OTPInput";
import Counter from "@/components/common/ui/Counter";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { HiddenInput } from "@/types/common.types";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import React, { ElementRef } from "react";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";

type Props = {
  phone: string;
  action: string;
};

function EnterOtpForm({ phone, action: authAction }: Props) {
  const submitBtn = React.useRef<ElementRef<"button">>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [disabled, setDisabled] = React.useState(true);
  const [otp, setOTP] = React.useState<string[]>(["", "", "", "", "", ""]);

  const [counterFormState, setCounterFormState] =
    React.useState<FormState>(EMPTY_FORM_STATE);

  const [formState, action] = useFormState(enterOtp, EMPTY_FORM_STATE);

  useToastMessage(formState);
  useToastMessage(counterFormState);
  useRedirectRoute(formState);

  const t = useTranslations("Auth");

  const counterFunction = async () => {
    const res = await resendOtp({ phone_number: phone });
    setCounterFormState(res);
  };

  return (
    <form action={action} ref={formRef} className="flex flex-col gap-6 w-full">
      {/* OTP IN INPUT */}
      <OTPInput
        submitBtn={submitBtn}
        formRef={formRef}
        setDisabled={setDisabled}
        otp={otp}
        setOTP={setOTP}
      />
      {/* SIGN UP LINK */}
      <input
        type="text"
        name="phone_number"
        id="phone_number"
        hidden
        value={phone}
        onChange={() => {}}
      />
      <input
        type="text"
        name="otp"
        id="otp"
        hidden
        value={otp.join("")}
        onChange={() => {}}
      />
      <input
        type="text"
        name="action"
        id="action"
        hidden
        value={authAction}
        onChange={() => {}}
      />
      <div className="flex flex-col gap-3 w-full items-center">
        <Counter
          initialValue={30}
          buttonLabel={t("send_new_code")}
          buttonFunction={counterFunction}
        />
        <div className="flex flex-col w-full">
          <PrimaryButton
            name={t("confirm")}
            type="submit"
            ref={submitBtn}
            disabled={disabled}
          />
        </div>
      </div>
    </form>
  );
}

export default EnterOtpForm;
