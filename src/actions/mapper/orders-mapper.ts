import { changeLocalToISODateOnly } from "@/utils/dateFormatter.util";
import { constructImageUrl } from "@/lib/images";

type TOrder = {
  id: number;
  order_items: any[];
  date: string;
};

// export const ordersMapper = (orders: TOrder[]) => {
export const ordersMapper = (orders: any) => {
  const modifeidOrders = orders.map((order: any) => ({
    ...order,
    ordered_at: changeLocalToISODateOnly(order?.date),
    order_items: order.order_items.map((order_item: any) => ({
      ...order_item,
      label: order_item?.product.title,
      image: order_item?.product.images?.[0]
        ? constructImageUrl(order_item?.product.images, true)
        : "",
    })),
  }));

  return modifeidOrders;
};
