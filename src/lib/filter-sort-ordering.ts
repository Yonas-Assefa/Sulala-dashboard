import { DEFAULT_ITEMS_PER_PAGE } from "@/config/table.config";

export const getFilterSortOrdering = (formData?: FormData) => {
  const search = getFormDataItem("search", formData);
  const vendor_status = (formData?.get("vendor_status") || "")
    .toString()
    ?.toUpperCase();
  const status = vendor_status == "ALL" ? "" : vendor_status;

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

  return { search, status, ordering, page, page_size, vendor_status };
};

const getFormDataItem = (key: string, formData?: FormData) => {
  const result = formData?.get(key) || "";
  if (result == "undefined") return "";
  return result;
};
