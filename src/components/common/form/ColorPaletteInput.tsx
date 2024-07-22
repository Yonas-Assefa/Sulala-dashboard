"use client";
import { SelectInputSchema } from "@/types/input-field.type";
import { ColorPaletteInputProps } from "@/types/props.type";
import { useTranslations } from "next-intl";
import { HexColorPicker } from "react-colorful";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import TextInput from "./TextInput";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

type TChildError = {
  id: string;
  title: string;
};

function ColorPaletteInput({
  setValue,
  placeholder,
  label,
  name,
  id,
  error,
  multi = false,
  nested = false,
  withImage = false,
  data,
  defaultValue,
  searchable = false,
  required,
  onChange,
  className,
  inputAreaOnly,
  disabled,
}: ColorPaletteInputProps) {
  const [options, setOptions] = React.useState<SelectInputSchema[]>(data || []);

  const defaultSelected = !defaultValue
    ? []
    : typeof defaultValue === "string" || typeof defaultValue === "number"
      ? nested
        ? options
            .map((option) => option.options)
            ?.flatMap((opt) => opt)
            ?.filter((opt) => opt && opt.value == defaultValue)
        : options
            .filter((option) => option.value == defaultValue)
            .filter(Boolean)
      : Array.isArray(defaultValue)
        ? defaultValue.length == 0
          ? []
          : defaultValue
              .map((val) => {
                if (typeof val == "string" || typeof val == "number") {
                  return options.find((option) => option.value == val);
                } else {
                  return val;
                }
              })
              .filter(Boolean)
        : typeof defaultValue === "object"
          ? [defaultValue as SelectInputSchema]
          : [];

  const [selected, setSelected] = React.useState<
    Omit<SelectInputSchema, "options">[]
  >(defaultSelected as SelectInputSchema[]);
  const [selectedParent, setSelectedParent] =
    React.useState<SelectInputSchema | null>(null);
  const [computedValue, setComputedValue] = React.useState<string | null>(null);
  const selectRef = React.useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = React.useState(false);
  const [childErrorItem, setChildErrorItem] = React.useState<
    TChildError[] | null
  >(null);

  // COLOR OPTIONS
  const [color, setColor] = React.useState("");
  const [colorPalette, setColorPalette] = React.useState<string[]>([]);
  // COLOR OPTIONS

  const t = useTranslations("Commons");

  const openDropdown = () => {
    selectRef.current?.setAttribute("open", "true");
    setOpen(true);
  };

  const closeDropdown = () => {
    selectRef.current?.removeAttribute("open");
    setOpen(false);
  };

  const ref: React.RefObject<HTMLDivElement> = useDetectClickOutside({
    onTriggered: closeDropdown,
  });

  const handleSelect = (value: string) => {
    if (nested) {
      // IF NESTED SET TO TRUE, AND SELECTED PARENT IS NULL, SET SELECTED PARENT
      if (!selectedParent) {
        const selectedParentValue = options.find(
          (option) => option.value === value,
        ) as SelectInputSchema;
        if (selectedParentValue && selectedParentValue.options) {
          // SET THE DROPDOWN OPTIONS TO THE SELECTED PARENT OPTIONS
          setSelectedParent(selectedParentValue);
          setOptions(selectedParentValue.options);
          openDropdown();
        }
      } else {
        // IF NESTED SET TO TRUE, AND SELECTED PARENT IS NOT NULL, SET SELECT CHILD
        if (selectedParent) {
          const selectedChildValue = options.find(
            (option) => option.value === value,
          ) as SelectInputSchema;
          if (multi) {
            // IF MULTI SELECT IS TRUE, ADD OR REMOVE THE SELECTED CHILD TO THE SELECTED ARRAY
            if (
              selected.find((item) => item.value == selectedChildValue?.value)
            ) {
              setSelected(
                selected.filter(
                  (item) => item.value != selectedChildValue?.value,
                ),
              );
            } else if (selectedChildValue) {
              setSelected([...selected, selectedChildValue]);
            }
          } else {
            // IF MULTI SELECT IS FALSE, SET THE SELECTED CHILD TO THE SELECTED ARRAY AS THE ONLY ITEM
            if (
              selected.find((item) => item.value == selectedChildValue?.value)
            ) {
              setSelected(
                selected.filter(
                  (item) => item.value != selectedChildValue?.value,
                ),
              );
            } else {
              setSelected([selectedChildValue]);
            }
            setSelectedParent(null);
            setOptions(data || []);
            closeDropdown();
          }
        }
      }
      return;
    }

    // IF NESTED SET TO FALSE, SET THE SELECTED VALUE TO THE SELECTED ARRAY
    const selectedValue = options.find((option) => option.value === value);
    if (multi) {
      // IF MULTI SELECT IS TRUE, ADD OR REMOVE THE SELECTED VALUE TO THE SELECTED ARRAY
      if (selected.find((item) => item.value === selectedValue?.value)) {
        setSelected(
          selected.filter((item) => item.value !== selectedValue?.value),
        );
      } else if (selectedValue) {
        setSelected([...selected, selectedValue]);
      }
    } else if (selectedValue) {
      // IF MULTI SELECT IS FALSE, SET THE SELECTED VALUE TO THE SELECTED ARRAY AS THE ONLY ITEM
      setSelected([selectedValue]);
      closeDropdown();
    }
  };

  // THIS COMPUTED VALUE IS USED TO DISPLAY THE SELECTED ITEMS IN THE INPUT FIELD
  useEffect(() => {
    if (selected.length === 0) {
      setComputedValue("");
      if (setValue) setValue("");
      if (onChange) onChange([]);
    } else {
      setComputedValue(selected.map((item) => item.label).join(", "));
      if (setValue) setValue(selected.map((item) => item.label).join(", "));
      if (onChange) onChange(selected.map((item) => item.value));
    }
  }, [selected]);

  useEffect(() => {
    if (ref.current && error) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }

    const arrayRegex = /\[.+]/g;
    const ObjRegex = /\{'id': (\d+), 'title': '([^']+)'\}/g;

    const message = error?.match(arrayRegex)?.[0] || "";

    const extractedObjects: TChildError[] = [];
    let match;

    while ((match = ObjRegex.exec(message)) !== null) {
      const id = match[1];
      const title = match[2];
      const product = { id, title };
      extractedObjects.push(product);
    }

    setChildErrorItem(extractedObjects);
  }, [error]);

  return (
    // REF IS USED TO DETECT CLICK OUTSIDE THE DROPDOWN PARENT DIV ELEMENT TO TRIGGER CLOSE DROPDOWN
    // SELECT REF IS USED TO OPEN AND CLOSE THE DROPDOWN
    <div ref={ref} className="flex flex-col w-full gap-3">
      {/* <input type="text" id={id} name={name} value={multi ? selected.map(s => s.value) : selected[0]?.value} hidden onChange={() => { }} /> */}
      {/* HIDDEN INPUTS OF SELECTED VALUE FOR FORM DATA SUBMISSION */}
      {selected.map((item, i) => (
        <input
          type="text"
          id={id}
          name={name}
          value={item.value}
          key={i}
          hidden
          onChange={() => {}}
        />
      ))}
      {!inputAreaOnly && (
        <p className="self-start capitalize">
          {label}
          {required && (
            <span className="text-danger">
              *&nbsp;
              {/* <sup className="text-xs opacity-70">{t("(required)")}</sup> */}
            </span>
          )}
        </p>
      )}
      <details
        ref={selectRef}
        onClick={(e) => disabled && e.preventDefault()}
        className={`dropdown bg-white dark:bg-gray-800 rounded-[30px] m-0 p-0 border w-full hover:bg-white dark:hover:bg-gray-700 outline-none ${className}`}
      >
        {/* SUMMARY HOLDS SELECTED COMPUTED VALUE OR PLACEHOLDER IF THERE IS NO SELECTED VALUE */}
        <summary
          className={`flex items-center overflow-hidden px-3 justify-between gap-0 rounded-[40px] w-full cursor-pointer input select-none focus:outline-none ${computedValue ? "text-black dark:text-white" : "text-gray-400"} ${className} ${error ? "border-danger bg-dangerlight" : "focus-within:border-primary bg-transparent"} ${disabled && "opacity-50 cursor-not-allowed"}`}
        >
          <p className="truncate">
            {computedValue || placeholder || t("select_one")}
          </p>
          <img
            src="/icons/chevron-down.svg"
            alt=""
            className={`transition-all ${open && "rotate-180"}`}
          />
        </summary>
        {/* DROPDOWN LIST STARTS FROM HERE */}
        <div
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 my-3 border-2 shadow rounded-box w-full bg-white dark:bg-gray-700"
        >
          <div className="w-full flex flex-col gap-3 items-center justify-center">
            <div className="w-full flex flex-row justify-center items-center">
              <HexColorPicker color={color} onChange={setColor} />
            </div>
            <div>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="bg-white text-black border p-1 border-primary/50"
              />
            </div>
            <div className="flex flex-row justify-between gap-3">
              <SecondaryButton
                name="Add Color"
                handleClick={() => setColorPalette([...colorPalette, color])}
              />
            </div>
            <ul>
              {colorPalette.map((color, i) => (
                <li
                  key={i}
                  className="flex flex-row justify-between items-center gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <p className="text-black">{color}</p>
                  <button
                    onClick={() =>
                      setColorPalette(colorPalette.filter((c) => c !== color))
                    }
                    className="text-black"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-row justify-between gap-3">
              <PrimaryButton
                name="Save Colors"
                handleClick={() => onChange && onChange(colorPalette)}
                disabled={colorPalette?.length == 0}
              />
            </div>
          </div>
        </div>
      </details>
      {!inputAreaOnly && error && (
        <span className="text-xs text-danger">
          {childErrorItem
            ? error?.replace(
                /\[.+]/,
                `(${childErrorItem?.map((obj) => obj.title).join(", ")})`,
              )
            : error}
        </span>
      )}
    </div>
  );
}

export default ColorPaletteInput;
