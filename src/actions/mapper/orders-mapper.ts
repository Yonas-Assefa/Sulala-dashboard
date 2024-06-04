import { changeLocalToISODateOnly } from "@/utils/dateFormatter.util";
import { BASE_URL } from "@/config/urls";

export const ordersMapper = (orders: any) => {
  const modifeidOrders = orders.map((order: any) => ({
    ...order,
    ordered_at: changeLocalToISODateOnly(order.ordered_at),
    order_items: order.order_items.map((order_item: any) => ({
      ...order_item,
      label: order_item?.product.title,
      image: order_item?.product.images?.[0]
        ? `${BASE_URL}${order_item?.product.images?.[0]}`
        : "",
    })),
  }));

  return modifeidOrders;
};
