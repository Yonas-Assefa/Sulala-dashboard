"use client";
import { Data } from "@/types/table.type";
import Link from "next/link";
import ItemsPerPageSelector from "./ItemsPerPageSelector";
import { useEffect, useState } from "react";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { useTranslations } from "next-intl";

export const DEFAULTPAGESIZE = 10;

export default function Pagination({ dataCount }: { dataCount: number }) {
  const t = useTranslations("Commons");

  const { createQueryStringAndPush, createQueryString, searchParams } =
    useCreateQueryString();
  const currentPage = Number(searchParams.get("page") || 1);
  const [itemsPerPage, setItemsPerPage] = useState(
    searchParams.get("page_size") || DEFAULTPAGESIZE
  );

  const handleItemClick = (pageSize: number) => {
    createQueryStringAndPush("page_size", pageSize.toString());
    setItemsPerPage(pageSize);
  };

  const totalPages = Math.ceil(
    dataCount /
      (typeof itemsPerPage === "string" ? parseInt(itemsPerPage) : itemsPerPage)
  );
  const minPagesToDisplay = Math.min(totalPages, 5);

  //pagination pages array
  const totalPaginationPages: any = [];

  for (let index = 1; index < totalPages + 1; index++) {
    totalPaginationPages.push(index);
  }
  // State for current pagination pages to display
  const [currentPaginationPages, setCurrentPaginationPages] = useState(
    totalPaginationPages.slice(0, minPagesToDisplay)
  );
  const [currentActivePage, setCurrentActivePage] = useState(currentPage);

  const current_page_start = (currentActivePage - 1) * Number(itemsPerPage) + 1;
  const current_page_end = Math.min(
    currentActivePage * Number(itemsPerPage),
    dataCount
  );

  useEffect(() => {
    const temp_pagination = totalPaginationPages.slice(0, minPagesToDisplay);
    if (!temp_pagination.includes(currentActivePage)) {
      const PAGE = 1;

      setCurrentActivePage(1); // Set currentActivePage to 1 if it's not in temp_pagination
      createQueryStringAndPush("page", PAGE.toString());
      createQueryString("pag_size", itemsPerPage.toString());
    }

    setCurrentPaginationPages(temp_pagination);
  }, [itemsPerPage, dataCount]);

  // Update currentPaginationPages when currentActivePage changes
  useEffect(() => {
    if (
      currentActivePage >
      currentPaginationPages[currentPaginationPages.length - 1]
    ) {
      const endIndex = currentActivePage;
      const startIndex = currentActivePage - currentPaginationPages.length;
      setCurrentPaginationPages(
        totalPaginationPages.slice(startIndex, endIndex)
      );
    }

    if (currentActivePage < currentPaginationPages[0]) {
      const startIndex = currentActivePage - 1;
      const endIndex = currentActivePage + currentPaginationPages.length - 1;
      setCurrentPaginationPages(
        totalPaginationPages.slice(startIndex, endIndex)
      );
    }
  }, [currentActivePage, totalPaginationPages, dataCount]);

  return (
    <>
      <div className="flex flex-row justify-between	 items-center	 self-end gap-[40px] border rounded-lg mr-2 px-5 py-2 bg-white-100">
        <div className="">
          <h3>
            {t("pagination_showing")} {current_page_start} - {current_page_end}{" "}
            {t("pagination_of")} {dataCount} {t("pagination_orders")}
          </h3>
        </div>
        <div className="flex flex-row gap-4">
          <nav>
            <ul className="flex items-center -space-x-px h-10">
              <li>
                <Link
                  href={createQueryString(
                    "page",
                    (currentActivePage === 1
                      ? 1
                      : currentActivePage - 1
                    ).toString()
                  )}
                  className={`flex items-center justify-center px-4 h-10 ms-0 border border-e-0 border-gray-300 rounded-s-lg ${
                    currentActivePage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentActivePage((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </Link>
              </li>
              {currentPaginationPages.map((page: number, index: number) => {
                return (
                  <li key={index}>
                    <Link
                      href={createQueryString("page", page.toString()) as any}
                      className={`flex items-center justify-center px-4 h-10 leading-tight ${
                        currentActivePage === page
                          ? "text-white bg-primary"
                          : "text-gray-700 bg-white border border-gray-300"
                      }`}
                      onClick={() => {
                        setCurrentActivePage(page);
                      }}
                    >
                      {page}
                    </Link>
                  </li>
                );
              })}

              <li>
                <Link
                  href={
                    createQueryString(
                      "page",
                      (currentActivePage === totalPaginationPages.length
                        ? totalPaginationPages.length
                        : currentActivePage + 1
                      ).toString()
                    ) as any
                  }
                  className={`flex items-center justify-center px-4  h-10 leading-tight text-gray-700 bg-white border border-gray-300 rounded-e-lg ${currentActivePage === totalPaginationPages.length ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    setCurrentActivePage((prev) =>
                      prev === totalPaginationPages.length
                        ? totalPaginationPages.length
                        : prev + 1
                    );
                  }}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
