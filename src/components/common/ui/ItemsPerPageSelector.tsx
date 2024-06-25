"use client";

const pageSizes = [1, 10, 15, 20];
type Props = {
  itemsPerPage: number | string;
  handleItemClick: (arg0: number) => void;
};

function ItemsPerPageSelector({ itemsPerPage, handleItemClick }: Props) {
  // const { createQueryStringAndPush, searchParams } = useCreateQueryString();

  // Initialize itemsPerPage state with localStorage value or DEFAULTPAGESIZE
  // const [itemsPerPage, setItemsPerPage] = useState(
  //   searchParams.get("page_size") || DEFAULTPAGESIZE
  // );

  // const handleItemClick = (pageSize: number) => {
  //   createQueryStringAndPush("page_size", pageSize.toString());
  //   setItemsPerPage(pageSize);
  // };

  return (
    <div className="m-1 dropdown dropdown-top dropdown-end w-fit">
      <div
        tabIndex={0}
        role="button"
        className="bg-white border w-fit rounded-[30px] p-1 px-3 flex flex-row gap-2"
      >
        Page size: {itemsPerPage}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-0 shadow bg-white rounded-box w-fit"
      >
        {pageSizes.map((pageSizeOption) => (
          <li
            key={pageSizeOption}
            onClick={() => handleItemClick(pageSizeOption)}
            className={`cursor-pointer p-0 m-0`}
          >
            <a
              className={` hover:bg-primary ${itemsPerPage == pageSizeOption ? "bg-primary" : ""}`}
            >
              {pageSizeOption}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsPerPageSelector;
