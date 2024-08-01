import { DEFAULT_ITEMS_PER_PAGE } from "@/config/table.config";

type Prop = {
  type?: string;
  formData?: FormData;
};

export const getFilterSortOrdering = ({ type = "default", formData }: Prop) => {
  const search = getFormDataItem("search", formData);
  const filterType = type === "order" ? "vendor_status" : "filter";
  const filter = (formData?.get(`${filterType}`) || "")
    .toString()
    ?.toUpperCase();
  const status = filter == "ALL" ? "" : filter;

  const sort_by = getFormDataItem("sort_by", formData);
  const sort = getFormDataItem("sort", formData);

  let ordering = "";
  if (sort_by && sort_by == "oldest") ordering += "-";
  if (sort) ordering += sort;

  const initialPage = formData?.get("page")?.toString();
  const initialPageSize = formData?.get("page_size")?.toString();

  const page = initialPage && initialPage !== "undefined" ? initialPage : 1;
  const page_size =
    initialPageSize && initialPageSize !== "undefined"
      ? initialPageSize
      : DEFAULT_ITEMS_PER_PAGE;

  return { search, status, ordering, page, page_size };
};

const getFormDataItem = (key: string, formData?: FormData) => {
  const result = formData?.get(key) || "";
  if (result == "undefined") return "";
  return result;
};
