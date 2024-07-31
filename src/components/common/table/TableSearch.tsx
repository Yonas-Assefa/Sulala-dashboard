"use client";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import React, { useRef } from "react";
import { debounce, set } from "lodash";
import { FormState } from "@/utils/formStateHelper";
import SearchIcon from "@/assets/icons/SearchIcon";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  action: ((formData: FormData) => Promise<FormState>) | undefined;
};
function TableSearch({ action }: Props) {
  const { createQueryStringAndPush, searchParams } = useCreateQueryString();
  const search = searchParams.get("search");
  const [value, setValue] = React.useState(search || "");
  const previousValue = React.useRef(value);
  const [searchResult, setSearchResult] = React.useState<
    { name: string; id: number }[]
  >([]);
  const [isPending, startTransition] = React.useTransition();
  const debouncedSearch = useDebounce(value ? value : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    previousValue.current = value;
    setValue(e.target.value);
  };

  // const handleSearch = () => {
  //     if (search == undefined && value == '') setSearchResult([])
  //     startTransition(async () => {
  //         const formData = new FormData()
  //         formData.append('search', value)
  //         formData.append('search_type', 'table_search')
  //         const searchResult = await action?.(formData)
  //         if (searchResult && Array.isArray(searchResult)) {
  //             setSearchResult(searchResult)
  //         }
  //     })
  // }

  // const handleSearchResultClick = (value: string) => {
  //     setSearchResult([])
  //     createQueryStringAndPush('search', value)
  // }

  const handleSearchEnterClick = () => {
    startTransition(() => {
      setSearchResult([]);
      createQueryStringAndPush("search", debouncedSearch);
    });
  };

  // const debouncedSearch = debounce(handleSearch, 2000)

  // React.useEffect(() => {
  //     debouncedSearch()
  // }, [value])

  // React.useEffect(() => {
  //     setValue(search || '')
  // }, [search])

  React.useEffect(() => {
    if (previousValue.current != "") {
      handleSearchEnterClick();
    }
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <form
        action={handleSearchEnterClick}
        className="border dark:border-gray-700 flex flex-row gap-1 p-1 rounded-[30px] relative focus-within:border-primary"
      >
        {isPending ? (
          <span className="loading loading-bars loading-xs text-primary"></span>
        ) : (
          <SearchIcon />
        )}
        <input
          onChange={handleChange}
          value={value}
          type="text"
          autoFocus
          className={`bg-white outline-none border-0 focus:outline-none text-black dark:bg-black dark:text-white `}
          placeholder="Seach my products"
          disabled={isPending}
        />
        {/* {isPending && <span className="loading loading-dots loading-xs text-primary/80 absolute right-2 top-2"></span>} */}
      </form>
      {/* <div tabIndex={0} className={`absolute z-20 menu p-0 mt-2 shadow bg-white border rounded-box w-full ${searchResult.length > 0 ? 'block' : 'hidden'}`}>
                <ul className='w-full'>
                    {
                        searchResult.map((item) => {
                            return (
                                <li
                                    className='border-b w-full truncate text-black' key={item.id}
                                    onClick={() => {
                                        handleSearchResultClick(item.name)
                                    }}
                                >
                                    <p>{item.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div> */}
    </div>
  );
}

export default TableSearch;
