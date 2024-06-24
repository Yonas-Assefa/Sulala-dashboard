import { TableSchema } from "@/types/table.type";

export const orderItemBadgeColorSchema = {
  new: "bg-[#f0f5ff] text-[#1e3a8a]",
  delivered: "bg-[#edfbe6] text-[#1d7941]",
  cancelled: "bg-[#f6f6f6] text-[#52565d]",
  in_delivery: "bg-[#fef6d0] text-[#43464c]",
};

export const orderItemTableSchema: TableSchema = {
  include: {
    checkbox: false,
    actions: undefined,
  },
  schema: [
    {
      key: "order_id",
      title: "№",
      type: "number",
    },
    {
      key: "order_id",
      title: "Order number",
      type: "string",
      image: false,
      image_key: undefined,
    },
    {
      key: "status",
      title: "Status",
      type: "string",
      badge: true,
      schema_colors: orderItemBadgeColorSchema,
    },
    {
      key: "ordered_at",
      title: "Date",
      type: "date",
    },
    {
      key: "price",
      title: "Price",
      type: "money",
    },
    {
      key: "fee",
      title: "Fee",
      type: "money",
    },
    {
      key: "order_items",
      title: "Items",
      type: "string",
      dropdown: true,
    },
  ],
};
