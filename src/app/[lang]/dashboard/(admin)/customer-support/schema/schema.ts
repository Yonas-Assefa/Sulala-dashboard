import { TableSchema } from "@/types/table.type";

export const customerSupportBadgeColorSchema = {
  answered: "bg-[#edfbe6] text-[#1d7941]",
  pending: "bg-[#fef6d0] text-[#43464c]",
};

export const customerSupportTableSchema: TableSchema = {
  include: {
    checkbox: false,
    actions: {
      detail: true,
    },
  },
  schema: [
    {
      key: "full_name",
      title: "Full Name",
      type: "string",
    },
    {
      key: "email",
      title: "Email Address",
      type: "string",
    },
    {
      key: "message",
      title: "Message",
      type: "string",
    },
    {
      key: "status",
      title: "Status",
      type: "string",
      badge: true,
      schema_colors: customerSupportBadgeColorSchema,
    },
  ],
};
