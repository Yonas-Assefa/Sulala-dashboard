"use client";
import { DEFAULT_ITEMS_PER_PAGE } from "@/config/table.config";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { useTranslations } from "next-intl";
import React from "react";

const PAGE_SIZES = [1, 3, 5, 10, 20, 50];
function TablePagination({ count }: { count: number | undefined }) {
  const { createQueryStringAndPush, searchParams } = useCreateQueryString();
  const page = searchParams.get("page") || 1;
  const page_size = searchParams.get("page_size") || DEFAULT_ITEMS_PER_PAGE;
  const [isPending, startTransition] = React.useTransition();

  const t = useTranslations("Commons");

  const handleNextClick = () => {
    startTransition(() => {
      createQueryStringAndPush([
        { key: "page", value: +page + 1 + "" },
        { key: "page_size", value: page_size + "" },
      ]);
    });
  };

  const handlePreviousClick = () => {
    startTransition(() => {
      createQueryStringAndPush([
        { key: "page", value: +page - 1 + "" },
        { key: "page_size", value: page_size + "" },
      ]);
    });
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      createQueryStringAndPush([
        { key: "page", value: "1" },
        { key: "page_size", value: e.target.value },
      ]);
    });
  };

  if (!count) return null;

  return (
    <div className="flex relative flex-col items-center opacity-70 hover:opacity-100">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        {/* Showing <span className="font-semibold text-gray-900 ">1</span> to <span className="font-semibold text-gray-900 ">10</span> of <span className="font-semibold text-gray-900 ">100</span> Entries */}
      </span>
      <div className="select-none inline-flex mt-2 xs:mt-0 gap-4 items-center">
        <button
          onClick={handlePreviousClick}
          disabled={page == 1}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-primary bg-tertiary dark:bg-gray-800 dark:disabled:bg-gray-800 rounded-e rounded-full hover:bg-primary hover:text-white active:scale-105 transition-all disabled:text-secondary disabled:bg-tertiary disabled:cursor-not-allowed"
        >
          &lt;&lt;
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-400">
          <span className="font-semibold text-primary dark:text-white">
            {isPending ? (
              <span className="loading loading-bars loading-xs"></span>
            ) : (
              `${page} of ${Math.ceil(count / +page_size)}`
            )}
          </span>
        </span>
        <button
          onClick={handleNextClick}
          disabled={count <= +page * +page_size}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-primary bg-tertiary dark:bg-gray-800 dark:disabled:bg-gray-800 rounded-s rounded-full hover:bg-primary hover:text-white active:scale-105 transition-all disabled:text-secondary disabled:bg-tertiary disabled:cursor-not-allowed"
        >
          &gt;&gt;
        </button>
        <div className="text-xs text-primary dark:text-white flex flex-row gap-3">
          <select
            name="page size"
            className="bg-primary text-white font-semibold"
            value={page_size}
            onChange={handlePageSizeChange}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <p>per page</p>
        </div>
      </div>
    </div>
  );
}

export default TablePagination;
