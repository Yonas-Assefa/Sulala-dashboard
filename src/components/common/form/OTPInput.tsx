import React, { ElementRef } from "react";

type Props = {
  submitBtn: React.RefObject<ElementRef<"button">>;
  formRef: React.RefObject<HTMLFormElement>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  otp: string[];
  setOTP: React.Dispatch<React.SetStateAction<string[]>>;
};
function OTPInput({ submitBtn, formRef, setDisabled, otp, setOTP }: Props) {
  const input1 = React.useRef<ElementRef<"input">>(null);
  const input2 = React.useRef<ElementRef<"input">>(null);
  const input3 = React.useRef<ElementRef<"input">>(null);
  const input4 = React.useRef<ElementRef<"input">>(null);
  const input5 = React.useRef<ElementRef<"input">>(null);
  const input6 = React.useRef<ElementRef<"input">>(null);

  React.useEffect(() => {
    setDisabled(otp.some((value) => value === ""));
    if (otp.every((value) => value !== "")) {
      formRef.current?.requestSubmit();
    }
  }, [otp]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.name.slice(-1));
    setOTP(otp.map((value, i) => (i === index - 1 ? e.target.value : value)));
    if (index < 6) {
      switch (index) {
        case 1:
          // if backspace is pressed, stay on the same input
          if (e.target.value !== "") {
            input2.current?.focus();
          }
          break;
        case 2:
          if (e.target.value !== "") {
            input3.current?.focus();
          } else {
            input1.current?.focus();
          }
          break;
        case 3:
          if (e.target.value !== "") {
            input4.current?.focus();
          } else {
            input2.current?.focus();
          }
          break;
        case 4:
          if (e.target.value !== "") {
            input5.current?.focus();
          } else {
            input3.current?.focus();
          }
          break;
        case 5:
          if (e.target.value !== "") {
            input6.current?.focus();
          } else {
            input4.current?.focus();
          }
          break;
      }
    }
    if (index === 6) {
      if (e.target.value === "") {
        input5.current?.focus();
      } else {
        submitBtn.current?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("Text");
    if (paste.length >= 6) {
      setOTP(paste.split("").slice(0, 6));
      submitBtn.current?.focus();
    } else {
      setOTP(paste.split(""));
    }
  };

  return (
    <div className="flex flex-row gap-3 md:gap-0 w-full items-center my-8 justify-between">
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <input
            key={index}
            type="text"
            name={`input${index + 1}`}
            className="md:w-14 md:h-14 h-10 w-10 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary rounded-full text-center text-2xl"
            maxLength={1}
            pattern="\d*"
            ref={eval(`input${index + 1}`)}
            onChange={handleInput}
            onPaste={handlePaste}
            value={otp[index] || ""}
          />
        );
      })}
    </div>
  );
}

export default OTPInput;
