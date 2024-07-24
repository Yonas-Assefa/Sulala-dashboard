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

type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

type TProduct = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

type TOrderItems = {
  id: number;
  shop: number;
  product: TProduct;
  unit_price: number;
  quantity: number;
  fee: number;
  shipping: number;
  discount: number;
  paid: boolean;
  status: string;
  ordered_at: string | null;
  canceled_at: string | null;
  delivered_at: string | null;
  delivery_tile: string | null;
  total_price: number;
  auto_delivery: boolean;
  frequency: number;
  next_delivery_date: string | null;
  driver: string | null;
  label: string;
  image: string;
};

type TManageOrders = {
  id: number;
  shop_id: number;
  shop_name: string;
  user: TUser;
  pickup_point: string;
  pickup_type: string;
  is_cash_on_delivery: boolean;
  total_amount: number;
  amount: number;
  order_items: TOrderItems[];
  payment_type: string;
};

// export const ordersMapper = (orders: TOrder[]) => {
export const manageOrdersMapper = async (orders: TManageOrders[]) => {
  const modifeidOrders = orders.map((order) => ({
    ...order,
    order_id: order?.id,
    shop_id: order.shop_id,
    ordered_at: changeLocalToISODateOnly(order?.order_items?.[0]?.ordered_at),
    status: order?.order_items?.[0]?.status,
    price: order?.total_amount,
    fee: order?.order_items?.[0]?.fee,
    payment_type: order.payment_type,
    id: order?.order_items?.[0]?.id,
    order_items: order.order_items.map((order_item) => ({
      ...order_item,
      label: order_item?.product.title,
      image: order_item?.product.images?.[0]
        ? constructImageUrl(order_item?.product.images, true)
        : "",
    })),
  }));

  return modifeidOrders;
};

export const manageOrderDetailMapper = async (
  orders: TManageOrders[],
  id: string,
) => {
  const order = orders.find((order) => order?.order_items?.[0]?.id == +id);
  return {
    ...order,
    order_id: order?.id,
    ordered_at: formatDate(order?.order_items?.[0]?.ordered_at),
    canceled_at: formatDate(order?.order_items?.[0]?.canceled_at),
    delivered_at: formatDate(order?.order_items?.[0]?.delivered_at),
    next_delivery_date: formatDate(order?.order_items?.[0]?.next_delivery_date),
    customer_detail: {
      id: order?.user.id,
      email: order?.user.email,
      first_name: order?.user.first_name,
      last_name: order?.user.last_name,
    },
    shipping_address: {
      pickup_type: order?.pickup_type,
      pickup_address: order?.pickup_point,
    },
    billing_address: "",
    driver_detail: order?.order_items?.[0]?.driver,
    order_status: [
      {
        status: order?.order_items[0].status,
      },
    ],
    order_items: order?.order_items.map((item) => ({
      ...item,
      unit_price: formatNumber(item.unit_price),
      fee: formatNumber(item.fee),
      total_price: formatNumber(item.total_price),

      product_name: item.product.title,
      image: item?.product.images?.[0]
        ? constructImageUrl(item?.product.images, true)
        : "",
    })),
    status: order?.order_items?.[0]?.status,
    fee: formatNumber(order?.order_items?.[0]?.fee ?? 0),
    discount: formatNumber(order?.order_items?.[0]?.discount ?? 0),
    total_price: formatNumber(order?.order_items?.[0]?.total_price ?? 0),
    unit_price: formatNumber(order?.order_items?.[0]?.unit_price ?? 0),
    total_amount: formatNumber(order?.total_amount ?? 0),
  };
};
