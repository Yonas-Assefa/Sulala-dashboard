"use client";
import { Data } from "@/types/table.type";
import Link from "next/link";
import ItemsPerPageSelector from "./ItemsPerPageSelector";
import { useState } from "react";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";

export const DEFAULTPAGESIZE = 10;

type Props = {
  data: Data;
};

export default function Pagination({ data = 15 }: { data: number }) {
  const { createQueryStringAndPush, searchParams } = useCreateQueryString();

  const [itemsPerPage, setItemsPerPage] = useState(
    searchParams.get("page_size") || DEFAULTPAGESIZE
  );

  const handleItemClick = (pageSize: number) => {
    createQueryStringAndPush("page_size", pageSize.toString());
    setItemsPerPage(pageSize);
  };
  const totalCurrentPages =
    data /
    (typeof itemsPerPage === "string" ? parseInt(itemsPerPage) : itemsPerPage);

  const minPagesToDisplay = Math.min(totalCurrentPages, 7);
  const numOfPages = [];
  for (let index = 1; index < totalCurrentPages + 1; index++) {
    numOfPages.push(index);
  }
  const [currentActivePage, setCurrentActivePage] = useState(1);
  return (
    <>
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        handleItemClick={handleItemClick}
      />
      <nav>
        <ul className="flex items-center -space-x-px h-10">
          <li>
            <Link
              href="#"
              className={`flex items-center justify-center px-4 h-10 ms-0 border border-e-0 border-gray-300 rounded-s-lg ${
                currentActivePage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
          {numOfPages.map((page, index) => {
            return (
              <li key={index}>
                <Link
                  href="#"
                  className={`flex items-center justify-center px-4 h-10 leading-tight ${
                    currentActivePage === page
                      ? "text-white bg-primary"
                      : "text-gray-500 bg-white border border-gray-300"
                  }`}
                  onClick={() => setCurrentActivePage(page)}
                >
                  {page}
                </Link>
              </li>
            );
          })}

          <li>
            <Link
              href="#"
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${currentActivePage === numOfPages.length ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() =>
                setCurrentActivePage((prev) =>
                  prev === numOfPages.length ? numOfPages.length : prev + 1
                )
              }
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
    </>
  );
}
