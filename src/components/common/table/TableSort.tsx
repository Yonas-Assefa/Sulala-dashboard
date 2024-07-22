"use client";
import SwapVertIcon from "@/assets/icons/SwapVertIcon";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { SortSchema } from "@/types/table.type";
import React from "react";

type Props = {
  sortData: SortSchema;
};

function TableSort({ sortData }: Props) {
  const { createQueryStringAndPush, searchParams } = useCreateQueryString();

  const handleChange = (value: string) => {
    createQueryStringAndPush("sort", value);
  };

  const sort_filter = sortData.find(
    (ele) => ele.value == searchParams.get("sort"),
  )?.label;
  const sort_by = searchParams.get("sort_by") || "newest";

  const handleSortBy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (sort_by === "newest") {
      createQueryStringAndPush("sort_by", "oldest");
    } else {
      createQueryStringAndPush("sort_by", "newest");
    }
  };

  return (
    <div className="flex flex-row gap-2 ">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="bg-white border dark:border-gray-700 rounded-[30px] p-1 px-3 flex flex-row gap-2 text-black dark:bg-black dark:text-white"
        >
          <button
            className={`from-primary/20 to-white hover:bg-gradient-to-b hover:scale-110 transition-all rounded-full w-[25px] ${sort_by === "newest" ? "transform rotate-180" : ""}`}
            onClick={handleSortBy}
          >
            <SwapVertIcon />
          </button>
          <p className="capitalize text-sm">
            Sort by {sort_filter}: <span>{sort_by}</span>
          </p>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-white border rounded-box w-52"
        >
          <p className="text-black font-semibold">Sort by</p>
          <div className="flex flex-col gap-3 p-2">
            {sortData.map((sort) => {
              const isChecked = searchParams.get("sort") === sort.value;
              return (
                <label
                  htmlFor={sort.value}
                  className="flex flex-row gap-2 items-center cursor-pointer"
                  key={sort.value}
                >
                  <input
                    type="radio"
                    name="radio-5"
                    id={sort.value}
                    className="radio radio-success border-secondary"
                    checked={isChecked}
                    onChange={() => handleChange(sort.value)}
                  />
                  <p>{sort.label}</p>
                </label>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default TableSort;
