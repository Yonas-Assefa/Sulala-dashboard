"use client";
import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import { TextInputProps } from "@/types/props.type";
import { useParams } from "next/navigation";
import React from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { debounce } from "lodash";
import { getLocationSuggetion } from "@/actions/google/get-location-suggestion";
import { getLocationGeoCode } from "@/actions/google/get-location-geocode";

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
  >([]);
  const [geoLocation, setGeoLocation] = React.useState<// {
  //   description: string;
  //   lat: string;
  //   long: string;
  //   is_manual: boolean;
  // }
  string>();
  const dropdownRef = React.useRef<HTMLDetailsElement>(null);
  const optionListRef = useDetectClickOutside({
    onTriggered: () => {
      dropdownRef.current?.removeAttribute("open");
    },
  });
  const [isPending, startTransition] = React.useTransition();
  const { lang } = useParams();

  React.useEffect(() => {
    if (setValue && defaultValue) {
      setValue(defaultValue);
      emitVal && emitVal(defaultValue);
    }
  }, [defaultValue]);

  const handleClear = () => {
    if (disabled || isPending) return;
    setValue("");
    setGeoLocation("");
    emitVal && emitVal("");
  };

  const loadAddressOptions = async (inputValue: string) => {
    if (inputValue) {
      try {
        startTransition(async () => {
          const places = await getLocationSuggetion(inputValue || "");
          dropdownRef.current?.setAttribute("open", "true");
          setAddressOptions(places);
          console.log({ places });
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      setAddressOptions([]);
      dropdownRef.current?.removeAttribute("open");
    }
  };

  const debouncedLoadAddressOptions = React.useCallback(
    debounce(loadAddressOptions, 1000),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const { value } = e.target;
    setValue(value);
    emitVal && emitVal(value);

    if (!value) {
      setAddressOptions([]);
      setGeoLocation("");
    } else {
      debouncedLoadAddressOptions(value);
    }
  };

  const getGeoLocation = async (address: string) => {
    try {
      startTransition(async () => {
        const data = await getLocationGeoCode(address);
        setGeoLocation(data);
        console.log({ fetchedData: data });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    // emitVal && emitVal(selectedValue);
    // setAddressOptions([]);
    getGeoLocation(selectedValue);
    console.log({ selectedValue });
    dropdownRef.current?.removeAttribute("open");
  };

  return (
    <label
      ref={ref}
      htmlFor={id + "_geolocation"}
      className="flex flex-col gap-3"
    >
      <p className="self-start text-black dark:text-white">
        {label}
        {required && (
          <span className="text-danger">
            *&nbsp;
            <sup className="text-xs opacity-70">(required)</sup>
          </span>
        )}
      </p>
      <input
        type="text"
        hidden
        id={id}
        name={name}
        value={geoLocation || ""}
        onChange={() => {}}
      />
      <details
        ref={dropdownRef}
        className="relative w-full"
        open={addressOptions.length > 0}
      >
        <summary
          className={`flex items-center relative overflow-hidden justify-between gap-0 border rounded-[40px] w-full ${error ? "bg-dangerlight border-danger" : "bg-white dark:bg-gray-800 focus-within:border-primary"}`}
        >
          <input
            id={id + "_geolocation"}
            type={type == "number" ? "text" : type}
            placeholder={placeholder || "Type here"}
            name={name || "_geolocation"}
            className={`input text-black dark:text-white disabled:text-secondary w-full bg-transparent disabled:bg-transparent caret-primary selection:bg-primary selection:text-tertiary focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none ${disabled && "cursor-not-allowed opacity-50"}`}
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
              disabled={disabled || isPending}
            >
              {isPending ? (
                <div className="flex flex-col justify-center items-center rounded-full bg-primary/30 animate-pulse">
                  <span className="loading loading-ring loading-md text-primary"></span>
                </div>
              ) : (
                <img
                  src="/x-circle.svg"
                  alt=""
                  className="mr-0 stroke-emerald-500"
                />
              )}
            </button>
          )}
        </summary>
        {/* DROPDOWN LIST STARTS FROM HERE */}
        <div
          tabIndex={0}
          ref={optionListRef}
          className="dropdown-content z-10 menu p-2 absolute my-2 border-2 shadow rounded-box w-full bg-white dark:bg-gray-700"
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
                      className={`label-text label w-full flex justify-between text-black dark:text-white text-md ${disabled ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
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
