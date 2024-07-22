import { OrderDataItem } from "../type";

export type OrderItemDataItem = OrderDataItem & {
  status:
    | "delivered"
    | "cancelled"
    | "in_delivery"
    | "new"
    | "accepted"
    | "declined";
  items?: Items[];
};

type Items = {
  label: string;
  value: string;
  image: string;
};
