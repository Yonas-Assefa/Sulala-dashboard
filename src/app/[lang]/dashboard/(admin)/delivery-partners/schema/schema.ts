import { TableSchema } from "@/types/table.type";

export const customerSupportBadgeColorSchema = {
  answered: "bg-[#edfbe6] text-[#1d7941]",
  pending: "bg-[#fef6d0] text-[#43464c]",
};

export const customerSupportTableSchema: TableSchema = {
  include: {
    checkbox: false,
    actions: {
      detail: false,
    },
  },
  schema: [
    {
      key: "driver_name",
      title: "Driver Name",
      type: "string",
    },
    {
      key: "online_status",
      title: "Online Status",
      type: "string",
    },
    {
      key: "license_image",
      title: "License",
      type: "string",
    },
    {
      key: "civil_id_image",
      title: "Civil Id",
      type: "string",
    },
    {
      key: "vehicle",
      title: "Vehicle Driving",
      type: "string",
    },
    {
      key: "availability",
      title: "Availability",
      type: "string",
    },
    {
      key: "orders_delivered",
      title: "Orders Delivered",
      type: "number",
    },
  ],
};
