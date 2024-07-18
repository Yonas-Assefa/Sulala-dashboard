import { TableSchema } from "@/types/table.type";

export const orderServiceBadgeColorSchema = {
  active: "bg-[#edfbe6] text-[#1d7941]",
  inactive: "bg-[#f6f6f6] text-[#52565d]",
};

export const orderServiceTableSchema: TableSchema = {
  include: {
    checkbox: false,
    actions: undefined,
  },
  schema: [
    {
      key: "id",
      title: "№",
      type: "number",
    },
    {
      key: "order_number",
      title: "Order number",
      type: "string",
    },
    {
      key: "status",
      title: "Status",
      type: "string",
      badge: true,
      schema_colors: orderServiceBadgeColorSchema,
    },
    {
      key: "date",
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
      key: "services",
      title: "Services",
      type: "string",
      dropdown: true,
    },
  ],
};
