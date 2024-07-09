import { GroupedCategory } from "@/lib/convertAndGroupCategories";
import React from "react";

const PLACEHOLDER_GLOSSARY: GroupedCategory[] = [];

function page() {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <h2 className="font-bold text-primary text-xl">PRODUCT STATUS</h2>
      <label className="input input-bordered flex items-center gap-2 bg-primary/20 text-black">
        <input type="text" className="grow h-10" placeholder="Search" />
        <button className="flex bg-tertiary hover:bg-secondary p-1 rounded-full fill-black hover:scale-110 hover:fill-tertiary transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>
      <div className="flex-grow overflow-x-auto mb-10 md:mb-0">
        {PLACEHOLDER_GLOSSARY.map((category) => (
          <table className="table table-pin-rows">
            <thead>
              <tr key={category.group} className="bg-primary text-white">
                <th>{category.group}</th>
                <th className="w-[100px]">ID</th>
              </tr>
            </thead>
            <tbody>
              {category.categories.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="flex flex-row justify-between">
                    <p>{item.id}</p>
                    <button
                      className="tooltip hover:bg-primary/20 p-1 rounded-lg"
                      data-tip="copy"
                    >
                      <img
                        src="/icons/clipboard.svg"
                        alt=""
                        className="w-[20px] aspect-square"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default page;
