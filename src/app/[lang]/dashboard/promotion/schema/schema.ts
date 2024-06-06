import { TableSchema } from "@/types/table.type";

export const promotionBadgeColorSchema = {
  active: "bg-[#edfbe6] text-[#1d7941]",
  completed: "bg-[#f6f6f6] text-[#52565d]",
  scheduled: "bg-[#fef6d0] text-[#43464c]",
  paused: "bg-[#fde7e7] text-[#b91c1c]",
};

export const promotionTableSchema: TableSchema = {
  include: {
    checkbox: true,
    actions: {
      edit: true,
      delete: true,
      toggle: true,
      promote: false,
    },
  },
  schema: [
    {
      key: "campaign_name",
      title: "Campaign name",
      type: "string",
      image: false,
      image_key: undefined,
    },
    {
      key: "promotion_type",
      title: "Promotion type",
      type: "string",
      image: false,
      image_key: undefined,
    },
    {
      key: "status",
      title: "Status",
      type: "string",
      badge: true,
      schema_colors: promotionBadgeColorSchema,
    },
    {
      key: "start_date",
      title: "Start date",
      type: "date",
    },
    {
      key: "end_date",
      title: "End date",
      type: "date",
    },
    {
      key: "impressions",
      title: "Impressions",
      type: "number",
    },
    {
      key: "number_of_clicks",
      title: "NoC",
      type: "number",
      tooltips: "Number of clicks",
    },
    {
      key: "amount_spend",
      title: "Amount spend",
      type: "number",
    },
  ],
};
