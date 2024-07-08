"use client";
import { GroupedCategory } from "@/lib/convertAndGroupCategories";
import { pushSuccessNotification } from "@/utils/pushNotification.util";
import { useTranslations } from "next-intl";
import React from "react";

type TCategoryProps = {
  categories: GroupedCategory[];
};

function CategoriesList({ categories }: TCategoryProps) {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<GroupedCategory[]>(categories);

  const t = useTranslations("Glossary");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredData = categories.map((item) => {
      return {
        group: item.group,
        categories: item.categories.filter((category) => {
          return category.name.toLowerCase().includes(search.toLowerCase());
        }),
      };
    });
    setData(filteredData);
  };

  const handleCopy = (item: { id: string | number; name: string }) => {
    navigator.clipboard.writeText(item.id + "");
    pushSuccessNotification(`Copied '${item.name}' ID`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 pb-16">
      <h2 className="font-bold uppercase text-primary dark:text-green-500 text-xl">
        {t("category")}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="input input-bordered flex items-center gap-2 bg-primary/20 text-black"
      >
        <input
          value={search}
          onChange={handleSearch}
          type="text"
          className="grow h-10 text-black dark:text-white"
          placeholder={t("search")}
        />
        <button className="flex bg-tertiary dark:bg-gray-600 hover:bg-primary dark:hover:bg-green-500 p-1 rounded-full fill-black dark:fill-white hover:scale-110 hover:fill-tertiary dark:hover:fill-gray-600 transition-all">
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
      </form>
      <div className="flex-grow overflow-x-auto mb-10 md:mb-0">
        {data.map((category) => (
          <table className="table table-pin-rows">
            <thead>
              <tr
                key={category.group}
                className="bg-primary dark:bg-green-500 text-white"
              >
                <th>{category.group}</th>
                <th className="w-[100px]">ID</th>
              </tr>
            </thead>
            <tbody>
              {category.categories.map((item) => {
                const filterWordMarked = item.name
                  .toLowerCase()
                  .replace(
                    search.toLowerCase(),
                    `<mark>${search.toLowerCase()}</mark>`,
                  );
                return (
                  <tr key={item.id}>
                    <td
                      dangerouslySetInnerHTML={{ __html: filterWordMarked }}
                    ></td>
                    <td className="flex flex-row justify-between">
                      <p>{item.id}</p>
                      <button
                        onClick={() => handleCopy(item)}
                        className="tooltip hover:bg-primary/20 dark:bg-gray-400 p-1 rounded-lg"
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
                );
              })}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;
