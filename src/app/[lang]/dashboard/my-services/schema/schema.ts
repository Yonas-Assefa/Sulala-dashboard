import { TableSchema } from "@/types/table.type";

export const servicesBadgeColorSchema = {
  active: "bg-[#edfbe6] text-[#1d7941]",
  archived: "bg-[#f6f6f6] text-[#52565d]",
  draft: "bg-[#fef6d0] text-[#43464c]",
};

export const serviceTableSchema: TableSchema = {
  include: {
    checkbox: true,
    actions: {
      edit: true,
      delete: true,
      promote: true,
      toggle: false,
    },
  },
  schema: [
    {
      key: "id",
      title: "№",
      type: "number",
    },
    {
      key: "service_name",
      title: "Service",
      type: "string",
      image: false,
      image_key: undefined,
    },
    {
      key: "status",
      title: "Status",
      type: "string",
      badge: true,
      schema_colors: servicesBadgeColorSchema,
    },
    {
      key: "upload_date",
      title: "Upload date",
      type: "date",
    },
    {
      key: "price",
      title: "Price",
      type: "string",
    },
    {
      key: "category",
      title: "Category",
      type: "string",
    },
  ],
};
