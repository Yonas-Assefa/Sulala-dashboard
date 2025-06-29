"use client";
import React from "react";
import { Schema } from "../../../types/table.type";

type Prop = {
  product_key: string;
  schema: Schema;
  last_items: boolean;
  isSuperUser?: boolean;
};

function TableBadge({ product_key, schema, last_items, isSuperUser }: Prop) {
  const selectRef = React.useRef<HTMLDetailsElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        selectRef.current.removeAttribute("open");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="flex">
      <details
        className={`dropdown ${
          !last_items ? "dropdown-bottom" : "dropdown-top"
        }`}
        ref={selectRef}
      >
        <summary
          className={`flex relative gap-1 flex-row items-center p-2 cursor-pointer rounded-[30px] px-3 ${
            schema.schema_colors?.[
              product_key
                .toLocaleLowerCase()
                .replace(" ", "_") as keyof typeof schema.schema_colors
            ]
          }`}
        >
          <p className="capitalize text-[12px]">
            {product_key.replace("_", " ").toLocaleLowerCase()}
          </p>
          <img
            src="/icons/chevron-down.svg"
            className="w-[20px] aspect-auto"
            alt=""
          />
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 mt-3 shadow bg-white border rounded-box w-52"
        >
          <div className="flex flex-col gap-3 p-2">
            {Object.keys(schema.schema_colors || {}).map((color_key) => {
              const isSelected =
                product_key.toLocaleLowerCase().replace(" ", "_") === color_key;
              return (
                <div
                  className={`flex flex-row justify-between gap-2 items-center cursor-pointer ${isSelected || isSuperUser ? "flex" : "hidden"}`}
                  key={color_key}
                >
                  {/* {product_key === color && <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-success" />} */}
                  <p>{color_key.replace("_", " ")}</p>
                  {isSelected && <img src="/icons/check.svg" alt="" />}
                </div>
              );
            })}
          </div>
        </ul>
      </details>
    </div>
  );
}

export default TableBadge;
