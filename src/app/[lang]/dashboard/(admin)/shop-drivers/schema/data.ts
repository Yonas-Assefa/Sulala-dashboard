import { PromotionDataItem } from "./type";

export const promotionData: PromotionDataItem[] = [
  {
    id: 1,
    vender_name: "John Doe",
    vendor_email: "johndoe@gmail.com",
    status: "approved",
    vendor_phone_number: "123456789",
    date: "2021-09-01",
    shop_name: "Shop 1",
    vendor_address: "Address 1",
  },
  {
    id: 2,
    vender_name: "Jane Doe",
    vendor_email: "doejane@gmail.com",
    status: "rejected",
    vendor_phone_number: "987654321",
    date: "2021-09-02",
    shop_name: "Shop 2",
    vendor_address: "Address 2",
  },
];

export const promotionSortData = [
  {
    label: "Date",
    value: "start_date",
  },
  {
    label: "Product title",
    value: "name",
  },
  {
    label: "Created at",
    value: "created_at",
  },
];

export const promotionFilterData = ["all", "answered", "pending"];
