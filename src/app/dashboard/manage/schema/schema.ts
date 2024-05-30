import { TableSchema } from "@/types/table.type";

export const promotionBadgeColorSchema = {
  approved: "bg-[#edfbe6] text-[#1d7941]",
  pending: "bg-[#fef6d0] text-[#43464c]",
  rejected: "bg-[#fde7e7] text-[#b91c1c]",
};

export const promotionTableSchema: TableSchema = {
  include: {
    checkbox: true,
    actions: {
      detail: true,
    },
  },
  schema: [
    {
      key: "vender_name",
      title: "Vendor Name",
      type: "string",
    },
    {
      key: "vendor_email",
      title: "Vendor Email",
      type: "string",
    },
    {
      key: "status",
      title: "Status",
      type: "badge",
    },
    {
      key: "vendor_phone_number",
      title: "Phone Number",
      type: "string",
    },
    {
      key: "vendor_address",
      title: "Address",
      type: "string",
    },
    {
      key: "date",
      title: "Date",
      type: "date",
    },
    {
      key: "shop_name",
      title: "Shop Name",
      type: "string",
    },
  ],
};
