"use client";
import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import { TextInputProps } from "@/types/props.type";
import { useParams } from "next/navigation";
import React from "react";

function TextInput({
  value: otVal,
  disabled,
  setValue: emitVal,
  id,
  placeholder,
  label,
  name,
  autoComplete,
  error,
  type = "text",
  defaultValue,
  required,
  dynamicPlaceholder,
}: TextInputProps) {
  const [value, setValue] = React.useState(defaultValue || otVal || "");
  const ref = useScrollToErrorField<HTMLLabelElement>(error);

  const { lang } = useParams();

  React.useEffect(() => {
    if (setValue && defaultValue) {
      setValue(defaultValue);
      emitVal && emitVal(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const { value } = e.target;
    if (type === "number") {
      const re = /^\d+(\.)?(\d+)?$/;
      if (value === "" || re.test(value)) {
        setValue(value);
        emitVal && emitVal(value);
      }
    } else {
      setValue(value);
      emitVal && emitVal(value);
    }
  };

  const handleClear = () => {
    if (disabled) return;
    setValue("");
    emitVal && emitVal("");
  };

  return (
    <label ref={ref} htmlFor={id} className="flex flex-col gap-3">
      <p className="self-start text-black dark:text-white">
        {label}
        {required && (
          <span className="text-danger">
            *&nbsp;
            {/* <sup className="text-xs opacity-70">(required)</sup> */}
          </span>
        )}
      </p>
      <div
        className={`flex items-center relative overflow-hidden justify-between gap-0 border rounded-[40px] w-full ${error ? "bg-dangerlight border-danger" : "bg-white dark:bg-gray-800 focus-within:border-primary"}`}
      >
        {dynamicPlaceholder && (
          <p
            className={`absolute opacity-35 select-none ${lang !== "ar" ? "left-4" : "right-4"}`}
          >
            {placeholder?.split("").map((char, i) => {
              return value[i] ? (
                <span key={i} className="opacity-0">
                  {value[i]}
                </span>
              ) : (
                <span key={i}>{char}</span>
              );
            })}
          </p>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder || "Type here"}
          name={name || "text-input"}
          className={`input w-full bg-transparent disabled:bg-transparent caret-primary selection:bg-primary selection:text-tertiary focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none 
            ${
              dynamicPlaceholder &&
              placeholder &&
              (value?.length == placeholder?.length
                ? "text-green-800 dark:text-green-500"
                : value?.length > placeholder?.length
                  ? "text-red-800 dark:text-red-500"
                  : "text-black dark:text-white disabled:text-secondary ")
            } 
            ${disabled && "cursor-not-allowed opacity-50"}
            `}
          autoComplete={autoComplete || "false"}
          value={value}
          onChange={handleChange}
          defaultValue={defaultValue}
          disabled={disabled}
          // {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute bottom-[13px] z-10 ${lang !== "ar" ? "right-[13px]" : "left-[13px]"} ${
              disabled
                ? "opacity-40 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
          >
            <img
              src="/x-circle.svg"
              alt=""
              className="mr-0 stroke-emerald-500"
            />
          </button>
        )}
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}

export default TextInput;
