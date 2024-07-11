import { DEFAULT_ITEMS_PER_PAGE } from "@/config/table.config";

export const getFilterSortOrdering = (formData?: FormData) => {
  const search = getFormDataItem("search", formData);
  const filter = (formData?.get("filter") || "").toString()?.toUpperCase();
  const status = filter == "ALL" ? "" : filter;
  const page_size = formData?.get("page_size") || DEFAULT_ITEMS_PER_PAGE;

  const sort_by = getFormDataItem("sort_by", formData);
  const sort = getFormDataItem("sort", formData);

  let ordering = "";
  if (sort_by && sort_by == "oldest") ordering += "-";
  if (sort) ordering += sort;

  const page = formData?.get("page") || 1;

  return { search, status, ordering, page, page_size };
};

const getFormDataItem = (key: string, formData?: FormData) => {
  const result = formData?.get(key) || "";
  if (result == "undefined") return "";
  return result;
};
