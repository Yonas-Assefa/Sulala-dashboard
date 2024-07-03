export type TPromotion = {
  id: number;
  name: string;
  noc: number;
  start_date: string;
  end_date: string;
  impressions: number;
  ad_files: string[];
};

export type TPromotionWithPagination = {
  count: number;
  data: TPromotion[];
};
