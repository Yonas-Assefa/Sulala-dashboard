"use client";
import { SelectInputSchema } from "@/types/input-field.type";
import { CustomSelectInputProps } from "@/types/props.type";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

type TChildError = {
  id: string;
  title: string;
};

/**
 * Component to display a placeholder when there are no items to select.
 * @returns {JSX.Element} A placeholder message indicating no items are available.
 */
function NoItemPlaceholder(): JSX.Element {
  const t = useTranslations("Commons");
  return (
    <div className="bg-tertiary/50 dark:bg-gray-600 hover:cursor-pointer hover:bg-tertiary dark:hover:bg-gray-800 p-3 select-none flex flex-row justify-center gap-2 text-center font-semibold text-secondary">
      <img src="/icons/inbox.svg" className="w-[20px] opacity-30" />
      <p>{t("there_is_no_item_to_select_here")}</p>
    </div>
  );
}

/**
 * Custom select input component with support for nested, multi-select, and searchable options.
 * @param {CustomSelectInputProps} props - Props for configuring the SelectInput component.
 * @returns {JSX.Element} The custom select input component.
 */
function SelectInput({
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
}: CustomSelectInputProps): JSX.Element {
  const [options, setOptions] = React.useState<SelectInputSchema[]>(data || []);

  // Compute the initial selected options based on the defaultValue prop
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
  const [search, setSearch] = React.useState("");
  const [childErrorItem, setChildErrorItem] = React.useState<
    TChildError[] | null
  >(null);

  const t = useTranslations("Commons");

  // Functions to open and close the dropdown
  const openDropdown = () => {
    selectRef.current?.setAttribute("open", "true");
    setOpen(true);
  };

  const closeDropdown = () => {
    selectRef.current?.removeAttribute("open");
    setOpen(false);
  };

  // Handle click outside the component to close the dropdown
  const ref: React.RefObject<HTMLDivElement> = useDetectClickOutside({
    onTriggered: closeDropdown,
  });

  const { lang } = useParams();

  /**
   * Handle selecting an option.
   * @param {string} value - The value of the selected option.
   */
  const handleSelect = (value: string) => {
    if (nested) {
      // If the select is nested, handle parent-child selection logic
      if (!selectedParent) {
        // If no parent is selected, handle parent selection logic
        const selectedParentValue = options.find(
          (option) => option.value === value,
        ) as SelectInputSchema;
        if (selectedParentValue && selectedParentValue.options) {
          // If the selected parent has child options, set the selected parent and options
          setSelectedParent(selectedParentValue);
          setOptions(selectedParentValue.options);
          openDropdown();
        }
      } else {
        // If a parent is selected, handle child selection logic
        if (selectedParent) {
          const selectedChildValue = options.find(
            (option) => option.value === value,
          ) as SelectInputSchema;
          if (multi) {
            // Handle multi-select logic for nested options
            if (
              selected.find((item) => item.value == selectedChildValue?.value)
            ) {
              // If the child is already selected, remove it from the selected array
              setSelected(
                selected.filter(
                  (item) => item.value != selectedChildValue?.value,
                ),
              );
            } else if (selectedChildValue) {
              // If the child is not selected, add it to the selected array
              setSelected([...selected, selectedChildValue]);
            }
          } else {
            // Handle single-select logic for nested options
            if (
              selected.find((item) => item.value == selectedChildValue?.value)
            ) {
              // If the child is already selected, remove it from the selected array
              setSelected(
                selected.filter(
                  (item) => item.value != selectedChildValue?.value,
                ),
              );
            } else {
              // If the child is not selected, set it as the only selected item
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

    // Non-nested select logic
    const selectedValue = options.find((option) => option.value === value);
    if (multi) {
      // Handle multi-select logic
      if (selected.find((item) => item.value === selectedValue?.value)) {
        // If the item is already selected, remove it from the selected array
        setSelected(
          selected.filter((item) => item.value !== selectedValue?.value),
        );
      } else if (selectedValue) {
        // If the item is not selected, add it to the selected array
        setSelected([...selected, selectedValue]);
      }
    } else if (selectedValue) {
      // Handle single select logic
      setSelected([selectedValue]);
      closeDropdown();
    }
  };

  // Update the computed value and call setValue and onChange callbacks
  useEffect(() => {
    if (selected.length === 0) {
      setComputedValue("");
      if (setValue) setValue("");
      if (onChange) onChange("");
    } else {
      setComputedValue(selected.map((item) => item.label).join(", "));
      if (setValue) setValue(selected.map((item) => item.label).join(", "));
      if (onChange) onChange(selected.map((item) => item.value));
    }
  }, [selected]);

  // Scroll to the component if there's an error and extract child error items if any
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

  /**
   * Handle search input change to filter options.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The search input change event.
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(e.target.value);
    if (value) {
      // If the search input is not empty, filter the options based on the search value
      const filteredOptions =
        multi && !selectedParent
          ? data?.filter((option) =>
              option.label.toLowerCase().includes(value.toLowerCase()),
            )
          : options.filter((option) =>
              option.label.toLowerCase().includes(value.toLowerCase()),
            );
      setOptions(filteredOptions || []);
    } else {
      // If the search input is empty, reset the options to the original data
      setOptions(
        !selectedParent
          ? data || []
          : data?.find((option) => option.value === selectedParent?.value)
              ?.options || [],
      );
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setOptions(data || []);
  };

  return (
    // REF IS USED TO DETECT CLICK OUTSIDE THE DROPDOWN PARENT DIV ELEMENT TO TRIGGER CLOSE DROPDOWN
    // SELECT REF IS USED TO OPEN AND CLOSE THE DROPDOWN
    <div
      ref={ref}
      className={`flex flex-col w-full gap-3 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
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
          className={`flex items-center overflow-hidden px-3 justify-between gap-0 rounded-[40px] w-full input select-none focus:outline-none ${computedValue ? "text-black dark:text-white" : "text-gray-400"} ${className} ${error ? "border-danger bg-dangerlight" : !disabled ? "focus-within:border-primary bg-transparent" : "bg-transparent"} ${disabled && "opacity-50"}`}
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
          {
            // searchable &&
            searchable && (
              <div className="relative w-11/12">
                <input
                  type="text"
                  name={`search-${id}`}
                  id={`search-${id}`}
                  placeholder={`${t("search")} ${label?.toLowerCase()}...`}
                  className="bg-primary/10 border m-2 p-1 rounded-[10px] w-full focus:border-primary selection:bg-primary selection:text-tertiary caret-primary"
                  value={search}
                  onChange={handleSearch}
                />
                {search && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className={`absolute bottom-[14px] z-10 ${lang !== "ar" ? "right-[0px]" : "left-[0px]"}`}
                  >
                    <img
                      src="/x-circle.svg"
                      alt=""
                      className="mr-0 stroke-emerald-500 w-[17px] aspect-square"
                    />
                  </button>
                )}
              </div>
            )
          }
          {/* IF THERE IS SELECTED PARENT, THE FOLLOWING COMPONENT APPEARS WITH TITLE OF SELECTED PARENT AND BACK BUTTON */}
          {selectedParent && (
            <button
              onClick={() => {
                setSelectedParent(null);
                setOptions(data || []);
              }}
            >
              <div
                className={`form-control w-full flex flex-row justify-between rounded-none border-b`}
              >
                <img src="/icons/arrow-left.svg" alt="" />
                <label
                  htmlFor="1"
                  className="label-text font-semibold label w-full flex justify-between text-black dark:text-white text-md"
                >
                  {selectedParent.label}
                </label>
              </div>
            </button>
          )}
          <div className="max-h-[300px] overflow-y-scroll block">
            {/* DROPDOWN VALUE GOES HERE */}
            {options?.length == 0 ? (
              <NoItemPlaceholder />
            ) : (
              options.map((option, i) => {
                const disabled = option.disabled;
                const hasError = childErrorItem
                  ?.map((obj) => obj.id)
                  .includes(option.value + "");
                return (
                  <li
                    onClick={() => !disabled && handleSelect(option.value)}
                    key={option.value}
                  >
                    <div
                      className={`form-control w-full flex flex-row justify-between rounded-none ${options.length !== i + 1 && "border-b"} ${hasError && "border-danger bg-dangerlight"}`}
                    >
                      {/* IF DROPDOWN IS SET TO HAVE IMAGE INIT AND IMAGE SHOW IS ENABLED, IT WILL BE DISPLAYED HERE */}
                      {withImage && (
                        <Image
                          width={100}
                          height={100}
                          src={option?.image || ""}
                          alt=""
                          className="max-w-[20px] max-h-[20px"
                        />
                      )}
                      <label
                        htmlFor="1"
                        className={`label-text label w-full flex justify-between text-black dark:text-white text-md ${disabled ? "opacity-50" : "opacity-100"} ${hasError && "text-danger"}`}
                      >
                        {option.label}
                      </label>
                      {/* IF THIS ITEM IS IN SELECTED ITEMS LIST, CHECK MARK WILL APPEAR */}
                      {/* IF THE LIST IS PARENT ELEMENT AND HAS NESTED CHILD ELEMENT IN THEM, CHEVRON RIGHT MARK APPEARS */}
                      {nested && !selectedParent ? (
                        <img src="/icons/chevron-right.svg" alt="" />
                      ) : // THIS LINE CHECKS IF NESTED SELECTION IS ALLOWED AND SELECTED PARENT IS NOT NULL,
                      // OR NESTED SELECTION IS NOT ALLOWED AND SELECTED PARENT IS NULL,
                      // THEN IT CHECKS THE SELECTED ITEMS LIST EQAULS TO THIS ITEM
                      ((nested && selectedParent) ||
                          (!nested && !selectedParent)) &&
                        selected.find((item) => item.value === option.value) ? (
                        // IF MULTIPLE SELECTION IS ENABLED, CHECKBOX WILL APPEAR
                        // IF MULTIPLE SELECTION IS DISABLED, CHECK MARK WILL APPEAR
                        multi ? (
                          <input
                            type="checkbox"
                            className={`checkbox checkbox-success ${hasError && "checkbox-error"}`}
                            checked={true}
                          />
                        ) : (
                          <img
                            src="/icons/check.svg"
                            alt=""
                            className="w-[20px]"
                          />
                        )
                      ) : // ELSE IF SELECTED ITEM DOES NOT MATCH THIS ITEM, AND IF MULTI IS ENABLED, UNCHECKED CHECKBOX WILL APPEAR
                      // ELSE IF SELECTED ITEM DOES NOT MATCH THIS ITEM, AND IF MULTI IS DISABLED, NOTHING WILL APPEAR
                      multi ? (
                        <input
                          type="checkbox"
                          className="checkbox border-secondary"
                          checked={false}
                        />
                      ) : null}
                    </div>
                  </li>
                );
              })
            )}
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

export default SelectInput;
