"use client";
import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import { MeasurementUnits } from "@/types/input-field.type";
import { WeightVolumeInputProps } from "@/types/props.type";
import React from "react";

const UNITS = [
  {
    type: "Weight",
    label: "Kilogram",
    value: "KG",
  },
  {
    type: "Weight",
    label: "Gram",
    value: "G",
  },
  {
    type: "Weight",
    label: "Pound",
    value: "LB",
  },
  {
    type: "Weight",
    label: "Ounce",
    value: "OZ",
  },
  {
    type: "Volume",
    label: "Liter",
    value: "L",
  },
  {
    type: "Volume",
    label: "Milliliter",
    value: "ML",
  },
  {
    type: "Volume",
    label: "Cubic Meter",
    value: "CUBIC_M",
  },
  {
    type: "Volume",
    label: "Cubic Centimeter",
    value: "CUBIC_CM",
  },
];

const MEASURE_TYPES = ["Weight", "Volume"];

function WeightVolumeInput({
  value: otVal,
  disabled,
  setValue: emitVal,
  id,
  placeholder,
  label,
  name,
  autoComplete,
  error,
  defaultValue,
  required,
  unit,
}: WeightVolumeInputProps) {
  const [value, setValue] = React.useState(defaultValue || otVal || "");
  const ref = useScrollToErrorField<HTMLLabelElement>(error);
  const [measureType, setMeasureType] = React.useState<"Weight" | "Volume">(
    "Weight",
  );
  const [unitValue, setUnitValue] = React.useState<MeasurementUnits>(
    unit || ("KG" as MeasurementUnits),
  );

  React.useEffect(() => {
    if (setValue && defaultValue) {
      setValue(defaultValue);
      emitVal && emitVal(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const { value } = e.target;
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
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
      <div className="w-full flex flex-row justify-between px-4">
        <p className="self-start text-black">
          {label}
          {required && (
            <span className="text-danger">
              *&nbsp;
              <sup className="text-xs opacity-70">(required)</sup>
            </span>
          )}
        </p>
        <select
          name="measure_type"
          id="measure_type"
          className="text-[10px] select-none cursor-pointer flex flex-row gap-2 overflow-hidden border border-secondary/40 bg-tertiary rounded-[30px] justify-center items-center px-1"
          onChange={(e) =>
            setMeasureType(e.target.value as "Weight" | "Volume")
          }
          value={measureType}
        >
          {MEASURE_TYPES.map((type) => (
            <option key={type} value={type} className="bg-white text-primary">
              {type}
            </option>
          ))}
        </select>
      </div>
      <div
        className={`flex items-stretch overflow-hidden relative justify-between gap-0 border rounded-[40px] w-full ${error ? "bg-dangerlight border-danger" : "bg-white focus-within:border-primary"}`}
      >
        <input
          id={id}
          type={"text"}
          placeholder={placeholder || "Type here"}
          name={name || "text-input"}
          className={`input text-black disabled:text-secondary w-full bg-transparent rounded-none disabled:bg-transparent caret-primary selection:bg-primary selection:text-tertiary focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none ${disabled && "cursor-not-allowed opacity-50"}`}
          autoComplete={autoComplete || "false"}
          value={value}
          onChange={handleChange}
          defaultValue={defaultValue}
          // disabled={disabled}
          // {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute right-[105px] bottom-[13px] ${
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
        <select
          name="unit"
          id="unit"
          className="bg-tertiary text-primary w-[100px] text-center text-sm"
          onChange={(e) => setUnitValue(e.target.value as MeasurementUnits)}
          value={unitValue}
        >
          {UNITS.filter((unit) => unit.type == measureType).map((unit) => (
            <option
              key={unit.value}
              value={unit.value}
              className="bg-white text-primary "
            >
              {unit.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}

export default WeightVolumeInput;
