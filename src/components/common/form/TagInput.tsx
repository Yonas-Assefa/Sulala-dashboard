"use client";
import React from "react";

type MultiTextInputProps = {
  defaultValue?: string[];
  disabled?: boolean;
  setValue?: (value: string[]) => void;
  id: string;
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
};

function TagInput({
  defaultValue,
  disabled,
  setValue: emitVal,
  id,
  name,
  label,
  error,
  placeholder,
  required,
}: MultiTextInputProps) {
  const [value, setValue] = React.useState<string>("");
  const [values, setValues] = React.useState<string[]>(defaultValue || []);
  const [toDelete, setToDelete] = React.useState<number>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const eventValue = e.target.value;

    if (eventValue.endsWith(",")) {
      if (!eventValue.slice(0, -1)) return;
      setValues([...values, eventValue.slice(0, -1)]);
      setValue("");
      emitVal && emitVal([...values, eventValue.slice(0, -1)]);
    } else {
      setValue(eventValue);
    }
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      e.stopPropagation();
      if (toDelete !== undefined) setToDelete(undefined);
      if (!value) return;
      setValues([...values, value]);
      setValue("");
      emitVal && emitVal([...values, value]);
    } else if (e.key === "Backspace" && value === "") {
      e.preventDefault();
      e.stopPropagation();
      if (values.length === 0) return;

      if (toDelete === undefined) {
        setToDelete(values.length - 1);
      } else {
        setValues(values.slice(0, -1));
        setToDelete(undefined);
        emitVal && emitVal(values.slice(0, -1));
      }
    } else {
      if (toDelete !== undefined) setToDelete(undefined);
      return;
    }
  };

  const handleClearAll = () => {
    if (disabled) return;
    setValues([]);
    emitVal && emitVal([]);
  };

  return (
    <label htmlFor={id} className="flex flex-col gap-3">
      {values.map((item, i) => (
        <input
          type="text"
          id={id}
          name={name}
          value={item}
          key={i}
          hidden
          onChange={() => {}}
        />
      ))}
      <p className="self-start text-black">
        {label}
        {required && (
          <span className="text-danger">
            *&nbsp;
            <sup className="text-xs opacity-70">(required)</sup>
          </span>
        )}
      </p>
      <div
        className={`flex gap-1 relative flex-wrap items-center px-3 py-2 justify-start border rounded-[40px] w-full ${error ? "bg-dangerlight border-danger" : "bg-white dark:bg-gray-800 focus-within:border-primary"}`}
      >
        {values.map((tag, index) => (
          <span
            key={index}
            className={`inline-block text-white px-2 py-1 text-xs rounded-[30px] ${toDelete === index ? "bg-danger" : "bg-primary"} transition-all`}
          >
            {tag}
            <button
              type="button"
              onClick={() => {
                setValues(values.filter((_, i) => i !== index));
                emitVal && emitVal(values.filter((_, i) => i !== index));
              }}
              className="pl-1"
            >
              <span className="bg-secondary inline-flex justify-center items-center hover:bg-danger transition-all drop-shadow-md px-[3px] rounded-full">
                &times;
              </span>
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          placeholder={placeholder || "Type here"}
          name={name || "text-input"}
          className={`input flex-grow-1 h-[30px] p-0 m-0 max-w-[150px] text-black dark:text-white bg-transparent disabled:bg-transparent caret-primary selection:bg-primary selection:text-tertiary focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none ${disabled ? "opacity-40 cursor-not-allowed" : "opacity-100 cursor-auto"}`}
          autoComplete={"false"}
          value={value}
          onChange={handleChange}
          onKeyDown={handleSubmit}
          // {...props}
        />
        <div className="text-xs text-secondary absolute right-2">
          {values.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className={
                disabled
                  ? "opacity-40 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }
            >
              <img
                src="/x-circle.svg"
                alt=""
                className="mr-0 stroke-emerald-500"
              />
            </button>
          )}
        </div>
      </div>
      {value.length ? (
        <div className="w-full flex justify-start gap-2 opacity-70">
          <span className="text-xs text-secondary">
            Enter, Tab, Comma to add
          </span>
          <span className="text-xs text-danger">Backspace, X to remove</span>
        </div>
      ) : null}
      {toDelete !== undefined && (
        <span className="text-xs text-danger opacity-70">
          Press Backspace again to confirm removing the item
        </span>
      )}

      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}

export default TagInput;
