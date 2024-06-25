"use client";
import {
  GOOGLE_MAPS_AUTOCOMPLETE_URL,
  GOOGLE_MAPS_GEOCODE_URL,
  GOOGLE_MAPS_KEY,
} from "@/config/urls";
import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import { TextInputProps } from "@/types/props.type";
import { useParams } from "next/navigation";
import React from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

function GeoLocationInput({
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
}: TextInputProps) {
  const [value, setValue] = React.useState(defaultValue || otVal || "");
  const ref = useScrollToErrorField<HTMLLabelElement>(error);
  const [addressOptions, setAddressOptions] = React.useState<
    { value: string; label: string }[]
  >([
    {
      label: "New York, NY, USA",
      value: "New York, NY, USA",
    },
    {
      label: "Los Angeles, CA, USA",
      value: "Los Angeles, CA, USA",
    },
    {
      label: "Chicago, IL, USA",
      value: "Chicago, IL, USA",
    },
    {
      label: "Houston, TX, USA",
      value: "Houston, TX, USA",
    },
    {
      label: "Phoenix, AZ, USA",
      value: "Phoenix, AZ, USA",
    },
    {
      label: "Philadelphia, PA, USA",
      value: "Philadelphia, PA, USA",
    },
    {
      label: "San Antonio, TX, USA",
      value: "San Antonio, TX, USA",
    },
    {
      label: "San Diego, CA, USA",
      value: "San Diego, CA, USA",
    },
    {
      label: "Dallas, TX, USA",
      value: "Dallas, TX, USA",
    },
    {
      label: "San Jose, CA, USA",
      value: "San Jose, CA, USA",
    },
  ]);
  const [geoLocation, setGeoLocation] = React.useState<string>();
  const dropdownRef = React.useRef<HTMLDetailsElement>(null);
  const optionListRef = useDetectClickOutside({
    onTriggered: () => {
      dropdownRef.current?.removeAttribute("open");
    },
  });
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
      const re = /^[0-9\b]+$/;
      if (value === "" || re.test(value)) {
        setValue(value);
        emitVal && emitVal(value);
      }
    } else {
      setValue(value);
      emitVal && emitVal(value);
    }
    dropdownRef.current?.setAttribute("open", "");
  };

  const handleClear = () => {
    if (disabled) return;
    setValue("");
    emitVal && emitVal("");
  };

  const loadAddressOptions = async (inputValue: string) => {
    if (inputValue) {
      try {
        const response = await fetch(
          `${GOOGLE_MAPS_AUTOCOMPLETE_URL}?input=${inputValue}&key=${GOOGLE_MAPS_KEY}`,
        );
        const data = await response.json();
        let places: { value: string; label: string }[] = [];
        data?.data?.predictions?.map(
          (place: { description: string }, i: number) => {
            places = [
              ...places,
              { value: place.description, label: place.description },
            ];
          },
        );

        setAddressOptions(places);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getGeoLocation = async (address: string) => {
    try {
      const response = await fetch(
        `${GOOGLE_MAPS_GEOCODE_URL}?address=${address}&key=${GOOGLE_MAPS_KEY}`,
      );
      const data = await response.json();
      setGeoLocation(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    // emitVal && emitVal(selectedValue);
    // setAddressOptions([]);
    getGeoLocation(selectedValue);
    dropdownRef.current?.removeAttribute("open");
  };

  return (
    <label ref={ref} htmlFor={id} className="flex flex-col gap-3">
      <p className="self-start text-black">
        {label}
        {required && (
          <span className="text-danger">
            *&nbsp;
            <sup className="text-xs opacity-70">(required)</sup>
          </span>
        )}
      </p>
      <details
        ref={dropdownRef}
        className="relative w-full"
        open={addressOptions.length > 0}
      >
        <summary
          className={`flex items-center relative overflow-hidden justify-between gap-0 border rounded-[40px] w-full ${error ? "bg-dangerlight border-danger" : "bg-white focus-within:border-primary"}`}
        >
          <input
            id={id}
            type={type == "number" ? "text" : type}
            placeholder={placeholder || "Type here"}
            name={name || "text-input"}
            className={`input text-black disabled:text-secondary w-full bg-transparent disabled:bg-transparent caret-primary selection:bg-primary selection:text-tertiary focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none ${disabled && "cursor-not-allowed opacity-50"}`}
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
              className={`absolute bottom-[13px] ${lang !== "ar" ? "right-[13px]" : "left-[13px]"} ${
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
        </summary>
        {/* DROPDOWN LIST STARTS FROM HERE */}
        <div
          tabIndex={0}
          ref={optionListRef}
          className="dropdown-content z-[1] menu p-2 absolute my-2 border-2 shadow rounded-box w-full bg-white"
        >
          <div className="max-h-[300px] overflow-y-scroll block">
            {/* DROPDOWN VALUE GOES HERE */}
            {addressOptions.map((option, i) => {
              return (
                <li
                  onClick={() => !disabled && handleSelect(option.value)}
                  key={option.value}
                >
                  <div
                    className={`form-control w-full flex flex-row justify-between rounded-none ${addressOptions.length !== i + 1 && "border-b"}`}
                  >
                    <label
                      htmlFor="1"
                      className={`label-text label w-full flex justify-between text-black text-md ${disabled ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                    >
                      {option.label}
                    </label>
                  </div>
                </li>
              );
            })}
          </div>
        </div>
      </details>
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}

export default GeoLocationInput;
