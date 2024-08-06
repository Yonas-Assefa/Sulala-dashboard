"use client";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Item = {
  label: string;
  value: string;
  image?: string;
};

type Props = {
  items?: Item[];
  label: string;
  last_items?: boolean;
  productId?: number;
};

function TableDropDown({ items, label, productId }: Props) {
  const renderItems = () => {
    if (!Array.isArray(items) || items.length === 0) {
      return null;
    }

    const renderedItems = items.slice(0, 5).map((item, index) => (
      <div key={index} className="flex flex-row items-center gap-3">
        <img
          src={item.image ? item.image : "/placeholder.png"}
          alt=""
          className="w-6 h-6"
        />
        <p className="truncate">{item.label}</p>
      </div>
    ));

    if (items.length > 5) {
      renderedItems.push(
        <div key="show-more" className="flex flex-row justify-center">
          <Link
            href={`/dashboard/orders/items/detail?item=${productId}&type=product`}
            role="button"
            className="px-5 py-1 rounded-[24px] hover:bg-secondary/100 bg-secondary/30"
          >
            Show more
          </Link>
        </div>,
      );
    }

    return renderedItems;
  };

  return (
    <div className={`dropdown dropdown-end`}>
      <div tabIndex={0} role="button" className="bg-white flex flex-row">
        <p>
          {items?.length} {label}
        </p>
        <img
          src="/icons/chevron-down.svg"
          className="w-[20px] aspect-auto"
          alt=""
        />
      </div>
      <div className="dropdown-content border rounded-xl z-[1] menu p-4 gap-4 shadow bg-white w-72 text-ellipsis overflow-hiddenn dark:bg-black">
        <p className="text-black font-semibold">{label}</p>
        <div className="flex flex-col gap-4 w-64">{renderItems()}</div>
      </div>
    </div>
  );
}

export default TableDropDown;
