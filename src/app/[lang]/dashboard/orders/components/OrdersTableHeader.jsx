"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "@/i18n/navigation";

function OrdersTableHeader() {
  const searchParams = useSearchParams();
  return (
    <div className="flex justify-between p-3 items-center">
      <div className="flex items-center gap-4">
        <div role="tablist" className="tabs">
          {["all", "active", "draft", "archived"].map((filter) => {
            return (
              <Link
                href={`?filter=${filter}`}
                role="tab"
                className={`tab capitalize rounded-[30px] bg-white text-black ${searchParams.get("filter") === filter ? "tab-active" : ""
                  } bg-white text-black`}
              >
                {filter}
              </Link>
            );
          })}
        </div>
        <div className="border flex flex-row gap-1 p-1 rounded-[30px]">
          <img src="/icons/search.svg" alt="" />
          <input
            type="text"
            className="bg-white outline-none border-0 focus:outline-none focus:border-0"
            placeholder="Search by name or number"
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 ">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="bg-white border rounded-[30px] p-1 px-3 flex flex-row gap-2"
          >
            <img src="/icons/swap_vert.svg" alt="" />
            <p>
              Sort by date: <span>Newest</span>
            </p>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-white border rounded-box w-52"
          >
            <p className="text-black font-semibold">Sort by</p>
            <div className="flex flex-col gap-3 p-2">
              <label
                htmlFor="radio-1"
                className="flex flex-row gap-2 items-center cursor-pointer"
              >
                className="flex flex-row gap-2 items-center cursor-pointer"
                <input
                  type="radio"
                  name="radio-5"
                  id="radio-2"
                  className="radio radio-success border-secondary"
                />
                <p>Product title</p>
              </label>
              <label
                htmlFor="radio-3"
                className="flex flex-row gap-2 items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="radio-5"
                  id="radio-3"
                  className="radio radio-success border-secondary"
                />
                <p>Created</p>
              </label>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrdersTableHeader;
