import { TableSchema } from "@/types/table.type";

export const orderItemBadgeColorSchema = {
  delivered: "bg-[#edfbe6] text-[#1d7941]",
  cancelled: "bg-[#f6f6f6] text-[#52565d]",
  in_delivery: "bg-[#fef6d0] text-[#43464c]",
  new: "bg-[#e7f3fe] text-[#1a73e8]",
  accepted: "bg-[#e0f7fa] text-[#00796b]",
  declined: "bg-[#fdeceb] text-[#d93025]",
};

export const orderItemTableSchema: TableSchema = {
  include: {
    checkbox: false,
    actions: {
      detail: true,
    },
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
      key: "payment_type",
      title: "Payment Type",
      type: "string",
    },
    {
      key: "payment_status",
      title: "Payment Status",
      type: "string",
    },

    {
      key: "order_items",
      title: "Items",
      type: "string",
      dropdown: true,
      // orderItemBadgeColorSchema
    },
  ],
};
