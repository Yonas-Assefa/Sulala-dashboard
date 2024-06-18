export type PromotionDataItem = {
  id: number;
  vender_name: string;
  vendor_email: string;
  status: "approved" | "rejected" | "pending";
  vendor_phone_number: string;
  vendor_address: string;
  date: string;
  shop_name: string;
  [key: string]: any;
};
