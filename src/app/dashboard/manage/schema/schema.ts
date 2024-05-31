import { TableSchema } from "@/types/table.type";

export const promotionBadgeColorSchema = {
  approved: "bg-[#edfbe6] text-[#1d7941]",
  pending: "bg-[#fef6d0] text-[#43464c]",
  rejected: "bg-[#fde7e7] text-[#b91c1c]",
};

export const promotionTableSchema: TableSchema = {
  include: {
    checkbox: false,
    actions: {
      detail: true,
    },
  },
  schema: [
    {
      key: "vendor_name",
      title: "Vendor Name",
      type: "string",
    },
    {
      key: "vendor_email",
      title: "Vendor Email",
      type: "string",
    },
    {
      key: "phone_number",
      title: "Phone Number",
      type: "string",
    },
    {
      key: "shop_address",
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
