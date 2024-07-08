import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import React, { useEffect } from "react";

type Props = {
  id?: string;
  value?: string;
  setValue?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  name?: string;
  autoComplete?: string;
  error?: string;
  onClear?: () => void;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
};

function TextAreaInput({
  id,
  name,
  label,
  placeholder,
  error,
  defaultValue,
  setValue,
  value,
  required,
  disabled,
  className,
  autoFocus,
}: Props) {
  const ref = useScrollToErrorField<HTMLDivElement>(error);

  const props = {};
  if (value) {
    Object.assign(props, { value });
  }
  if (setValue) {
    Object.assign(props, {
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value),
    });
  }

  useEffect(() => {
    if (setValue && defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  return (
    <div ref={ref} className={`flex flex-col gap-3 ${className}`}>
      <label htmlFor={id} className="self-start text-black dark:text-white">
        {label}
        {required && (
          <span className="text-danger">
            *&nbsp;
            {/* <sup className='text-xs opacity-70'>(required)</sup> */}
          </span>
        )}
      </label>
      <textarea
        name={name}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`textarea focus:border-primary outline-none focus:outline-none disabled:bg-white disabled:text-secondary disabled:border-secondary/50 dark:disabled:bg-gray-800 textarea-bordered rounded-[20px] textarea-lg w-full h-full text-black dark:text-white ${error ? "bg-dangerlight border-danger" : "bg-white dark:bg-gray-800"}`}
        {...props}
      ></textarea>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

export default TextAreaInput;
