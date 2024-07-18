"use client";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  initialValue: number;
  buttonLabel: string;
  buttonFunction?: () => Promise<any>;
};

function Counter({ initialValue = 30, buttonFunction, buttonLabel }: Props) {
  const [counter, setCounter] = React.useState(initialValue);
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      counter > 0 ? setCounter(counter - 1) : clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleClick = async () => {
    setPending(true);
    buttonFunction && (await buttonFunction());
    setCounter(initialValue);
    setPending(false);
  };

  return (
    <section>
      {counter > 0 ? (
        <p className="text-[#70757f]">
          {buttonLabel} in 00:{counter}
        </p>
      ) : (
        <button
          type="button"
          className="text-primary font-semibold btn bg-transparent focus:bg-transparent hover:bg-transparent border-0 shadow-none"
          onClick={handleClick}
        >
          {pending ? (
            <span className="loading loading-spinner loading-md text-primary"></span>
          ) : (
            buttonLabel
          )}
        </button>
      )}
    </section>
  );
}

export default Counter;
