import {
  changeLocalToISODateOnly,
  formatDate,
} from "@/utils/dateFormatter.util";
import { constructImageUrl } from "@/lib/images";

type TOrder = {
  id: number;
  order_items: any[];
  date: string;
};

// export const ordersMapper = (orders: TOrder[]) => {
export const ordersMapper = async (orders: any) => {
  const modifeidOrders = orders.map((order: any) => ({
    ...order,
    ordered_at: changeLocalToISODateOnly(order?.date),
    id: order?.order_id,
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

export const orderDetailMapper = async (order: any) => {
  return {
    ...order,
    ordered_at: formatDate(order.ordered_at),
    customer_detail: {
      id: order.user.id,
      email: order.user.email,
      first_name: order.user.first_name,
      last_name: order.user.last_name,
    },
    shipping_address: {
      pickup_type: order.pickup_type,
      pickup_address: order.pickup_point,
    },
    billing_address: "", // Placeholder if billing address is not provided
    driver_detail: null, // Placeholder if driver detail is not provided
    order_status: [
      {
        status: order.status,
        scheduled_delivery_start: order.schedule_delivery_start,
        scheduled_delivery_end: order.schedule_delivery_end,
      },
    ],
    order_items: order.order_items.map((item: any) => ({
      ...item,
      product_name: item.product.title,
      image: item?.product.images?.[0]
        ? constructImageUrl(item?.product.images, true)
        : "",

      // id: item.id,
      // shop: item.shop,
      // product: item.product,
      // unit_price: item.unit_price,
      // quantity: item.quantity,
      // fee: item.fee,
      // shipping: item.shipping,
      // discount: item.discount,
      // paid: item.paid,
      // status: item.status,
      // ordered_at: item.ordered_at,
      // canceled_at: item.canceled_at,
      // delivered_at: item.delivered_at,
      // delivery_time: item.delivery_time,
      // total_price: item.total_price,
      // auto_delivery: item.auto_delivery,
      // frequency: item.frequency,
      // next_delivery_date: item.next_delivery_date,
      // driver: item.driver,
    })),
    order_total: order.order_total,
    discount: order.discount,
    fee: order.fee,
    total_amount: order.total_amount,
  };
};
