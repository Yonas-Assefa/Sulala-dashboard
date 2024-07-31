"use client";
import { Link } from "@/i18n/navigation";
import React from "react";
import { FilterData } from "../../../types/table.type";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";

type Props = {
  filterData: FilterData;
  filterTarget?: string;
};

function TableFilter({ filterData, filterTarget }: Props) {
  const { createQueryString, searchParams } = useCreateQueryString();
  return (
    <div role="tablist" className="tabs">
      {filterData.map((filter) => {
        const filter_label = filter.replace(/_/g, " ");
        const isActive =
          searchParams.get(`${filterTarget}`) === filter ||
          (!searchParams.get(`${filterTarget}`) && filter === "all");
        return (
          <Link
            key={filter}
            href={createQueryString(`${filterTarget}`, filter) as any}
            role="tab"
            className={`tab capitalize rounded-[30px] ${
              isActive
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-white text-black dark:bg-black dark:text-white"
            } `}
          >
            {filter_label}
          </Link>
        );
      })}
    </div>
  );
}

export default TableFilter;
