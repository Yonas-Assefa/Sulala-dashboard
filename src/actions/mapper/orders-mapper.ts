import { changeLocalToISODateOnly } from "@/utils/dateFormatter.util";
import { BASE_URL } from "@/config/urls";

export let TOTAL_ORDERS_COUNT: number;
export const ordersMapper = (orders: any) => {
  TOTAL_ORDERS_COUNT = orders.count;
  console.log("log: ", TOTAL_ORDERS_COUNT);

  const modifeidOrders = orders.results.map((order: any) => ({
    ...order,
    ordered_at: changeLocalToISODateOnly(order?.date),
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
