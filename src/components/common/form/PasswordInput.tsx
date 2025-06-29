"use client";
import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  label: string;
  placeholder: string;
  name: string;
  id: string;
  showLabel: boolean;
  error?: string;
};

function PasswordInput({
  label,
  placeholder,
  name,
  id,
  showLabel,
  error,
}: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const ref = useScrollToErrorField<HTMLDivElement>(error);
  const { lang } = useParams();

  const toggleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {showLabel && (
        <label htmlFor={id} className="self-start text-black">
          {label}
        </label>
      )}
      <div
        className={`flex items-center px-0 overflow-hidden relative justify-between gap-0 border rounded-[40px] w-full ${error ? "border-danger bg-dangerlight" : "bg-white dark:bg-gray-800 focus-within:border-primary"}`}
      >
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder || "Type here"}
          className="input text-black dark:text-white w-full bg-transparent focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none selection:bg-primary selection:text-tertiary caret-primary"
          // className="input w-full max-w-xs bg-white rounded-r-[30px] focus:border-0 focus:outline-none"
          autoComplete="false"
        />
        {showPassword ? (
          <button
            onClick={toggleShowHidePassword}
            type="button"
            className={`absolute top-[13px] ${lang !== "ar" ? "right-[13px]" : "left-[13px]"}`}
          >
            <img
              src="/opened-eye.svg"
              alt=""
              className="mr-0 stroke-emerald-500"
            />
          </button>
        ) : (
          <button
            onClick={toggleShowHidePassword}
            type="button"
            className={`absolute top-[13px] ${lang !== "ar" ? "right-[13px]" : "left-[13px]"}`}
          >
            <img
              src="/closed-eye.svg"
              alt=""
              className="mr-0 stroke-emerald-500"
            />
          </button>
        )}
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

export default PasswordInput;
