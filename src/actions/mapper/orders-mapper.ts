import {
  changeLocalToISODateOnly,
  formatDate,
} from "@/utils/dateFormatter.util";
import { constructImageUrl } from "@/lib/images";
import { formatNumber } from "@/utils/priceFormatter.util";
import { filterUniqueOrderTimline } from "@/utils/filterDuplicateObject.util";

type TOrder = {
  id: number;
  order_items: any[];
  date: string;
};

export interface OrderTimelineEvent {
  event: string;
  created_at: string;
}

export type OrderEventType =
  | "NEW"
  | "ACCEPTED"
  | "CANCELLED"
  | "DECLINED"
  | "IN_DELIVERY"
  | "PAYMENT_PLACED"
  | "DELIVERED";

const ORDER_TIMELINE_MAPPER: Record<OrderEventType, string> = {
  NEW: "Order Placed",
  ACCEPTED: "Order Accepted",
  CANCELLED: "Order Cancelled",
  DECLINED: "Order Declined",
  IN_DELIVERY: "Order Shipped",
  PAYMENT_PLACED: "Order Payment Placed",
  DELIVERED: "Order Delivered",
};

export const ordersMapper = async (orders: any) => {
  const modifeidOrders = orders.map((order: any) => ({
    ...order,
    ordered_at: changeLocalToISODateOnly(order?.date),
    status: order.vendor_order_status,
    payment_type: order.cash_on_delivery ? "Cash on Delivery" : "Online",
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
    schedule_delivery_start: formatDate(order.schedule_delivery_start),
    schedule_delivery_end: formatDate(order.schedule_delivery_end),
    driver_assigned:
      order.order_items &&
      order.order_items.length > 0 &&
      order.order_items[0].driver !== null
        ? "Assigned"
        : "Unassigned",
    driver_detail:
      order.order_items && order.order_items.length > 0
        ? order.order_items[0].driver
        : null,

    order_items: order.order_items.map((item: any) => ({
      ...item,
      unit_price: formatNumber(item.unit_price),
      fee: formatNumber(item.fee),
      total_price: formatNumber(item.total_price),

      product_name: item.product.title,
      image: item?.product.images?.[0]
        ? constructImageUrl(item?.product.images, true)
        : "",
    })),

    order_timeline: order.order_timeline
      .sort(
        (a: OrderTimelineEvent, b: OrderTimelineEvent) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .map(({ event, created_at }: OrderTimelineEvent) => ({
        event:
          ORDER_TIMELINE_MAPPER[event.toUpperCase() as OrderEventType] ||
          "Unknown Event",
        created_at: formatDate(created_at),
      })),

    fee: formatNumber(order.fee),
    discount: formatNumber(order.discount),
    order_total: formatNumber(order.order_total),
    total_price: formatNumber(order.total_price),
    total_amount: formatNumber(order.total_amount),
  };
};
