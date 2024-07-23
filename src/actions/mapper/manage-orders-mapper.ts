import {
  changeLocalToISODateOnly,
  formatDate,
} from "@/utils/dateFormatter.util";
import { constructImageUrl } from "@/lib/images";
import { formatNumber } from "@/utils/priceFormatter.util";
type TOrder = {
  id: number;
  order_items: any[];
  date: string;
};

type TAdminOrderView = {
  id: number;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  pickup_point: string;
  pickup_type: string;
  is_cash_on_delivery: boolean;
  total_amount: number;
  ordered_at: string;
  order_items: {
    id: number;
    shop: number;
    product: {
      id: number;
      title: string;
      price: number;
      images: string[];
    };
    unit_price: number;
    quantity: number;
    fee: number;
    shipping: number;
    discount: number;
    paid: boolean;
    status: string;
    ordered_at: string;
    canceled_at: string | null;
    delivered_at: string | null;
    delivery_time: string | null;
    total_price: number;
  };
};

// export const ordersMapper = (orders: TOrder[]) => {
export const manageOrdersMapper = async (orders: any) => {
  const modifeidOrders = orders.map((order: any) => ({
    ...order,
    ordered_at: changeLocalToISODateOnly(order?.date),
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
    billing_address: "",
    driver_detail: null,
    order_status: [
      {
        status: order.status,
        scheduled_delivery_start: order.schedule_delivery_start,
        scheduled_delivery_end: order.schedule_delivery_end,
      },
    ],
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

    fee: formatNumber(order.fee),
    discount: formatNumber(order.discount),
    order_total: formatNumber(order.order_total),
    total_price: formatNumber(order.total_price),
    total_amount: formatNumber(order.total_amount),
  };
};
