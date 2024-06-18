"use client";
import { useState } from "react";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { DEFAULTPAGESIZE } from "./Pagination";

const pageSizes = [5, 10, 15, 20];
type Props = {
  itemsPerPage: number | string;
  handleItemClick: (arg0: number) => void;
};

function ItemsPerPageSelector({ itemsPerPage, handleItemClick }: Props) {
  console.log("items pere page", itemsPerPage);

  // const { createQueryStringAndPush, searchParams } = useCreateQueryString();

  // Initialize itemsPerPage state with localStorage value or DEFAULTPAGESIZE
  // const [itemsPerPage, setItemsPerPage] = useState(
  //   searchParams.get("page_size") || DEFAULTPAGESIZE
  // );

  // const handleItemClick = (pageSize: number) => {
  //   createQueryStringAndPush("page_size", pageSize.toString());
  //   setItemsPerPage(pageSize);
  // };

  return (
    <div className="dropdown dropdown-top  w-fit">
      <div
        tabIndex={0}
        role="button"
        className="bg-white border w-fit rounded-[30px] p-1 px-3 flex flex-row gap-2"
      >
        Page size: {itemsPerPage}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-fit"
      >
        {pageSizes.map((pageSizeOption) => (
          <li
            key={pageSizeOption}
            onClick={() => handleItemClick(pageSizeOption)}
            className={`cursor-pointer `}
          >
            <a
              className={` border rounded-30  hover:bg-primary ${itemsPerPage == pageSizeOption ? "bg-primary" : ""}`}
            >
              {pageSizeOption}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsPerPageSelector;
