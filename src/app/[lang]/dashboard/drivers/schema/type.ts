export type PromotionDataItem = {
  id: number;
  campaign_name: string;
  promotion_type: string;
  status: "active" | "completed" | "scheduled" | "paused";
  start_date: string;
  end_date: string;
  impressions: number;
  number_of_clicks: number;
  amount_spend: number;
  [key: string]: any;
};
