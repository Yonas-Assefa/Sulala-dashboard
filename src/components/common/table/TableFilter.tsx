"use client";
import { Link } from "@/i18n/navigation";
import React from "react";
import { FilterData } from "../../../types/table.type";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";

type Props = {
  filterData: FilterData;
};

function TableFilter({ filterData }: Props) {
  const { createQueryString, searchParams } = useCreateQueryString();
  return (
    <div role="tablist" className="tabs">
      {filterData.map((filter) => {
        const filter_label = filter.replace(/_/g, " ");
        const isActive =
          searchParams.get("filter") === filter ||
          (!searchParams.get("filter") && filter === "all");
        return (
          <Link
            key={filter}
            href={createQueryString("filter", filter) as any}
            role="tab"
            className={`tab capitalize rounded-[30px] bg-white text-black ${
              isActive ? "tab-active" : ""
            } bg-white text-black`}
          >
            {filter_label}
          </Link>
        );
      })}
    </div>
  );
}

export default TableFilter;
