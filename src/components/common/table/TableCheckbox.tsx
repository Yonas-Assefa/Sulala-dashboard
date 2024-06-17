"use client";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import React from "react";

type Props = {
  item_id?: string;
  items_id?: string[];
  isHeader?: boolean;
};

function TableCheckbox({ item_id, isHeader, items_id }: Props) {
  const { createQueryStringAndPush, searchParams } = useCreateQueryString();

  const selected_items = searchParams.get("item")?.toString()?.split(",") || [];
  let isChecked = false;

  if (!isHeader) {
    isChecked = selected_items.includes(item_id + "");
  } else {
    isChecked =
      selected_items?.length !== 0 &&
      selected_items?.length === items_id?.length;
  }

  const handleClick = () => {
    if (isChecked) {
      if (!isHeader && item_id) {
        const selected_items =
          searchParams.get("item")?.toString()?.split(",") || [];
        const new_selected_items = selected_items?.filter(
          (item) => item !== item_id + ""
        );
        createQueryStringAndPush("item", new_selected_items?.join(","));
      } else {
        createQueryStringAndPush("item", "");
      }
    } else {
      if (!isHeader && item_id) {
        const selected_items =
          searchParams.get("item")?.toString()?.split(",") || [];
        const new_selected_items = selected_items?.concat(item_id);
        createQueryStringAndPush("item", new_selected_items?.join(","));
      } else {
        createQueryStringAndPush("item", items_id?.join(","));
      }
    }
  };
  return (
    <td>
      <label>
        <input
          onChange={handleClick}
          type="checkbox"
          className="checkbox checkbox-success border-gray-400/50 checked:border-success"
          checked={isChecked}
        />
      </label>
    </td>
  );
}

export default TableCheckbox;
