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
      key: "first_name",
      title: "First Name",
      type: "string",
    },
    {
      key: "last_name",
      title: "Last Name",
      type: "string",
    },
    {
      key: "email",
      title: "Email Address",
      type: "string",
    },
    {
      key: "username",
      title: "Username",
      type: "string",
    },
    {
      key: "phone_number",
      title: "Phone number",
      type: "string",
    },
    {
      key: "address",
      title: "Address",
      type: "string",
    },
  ],
};
