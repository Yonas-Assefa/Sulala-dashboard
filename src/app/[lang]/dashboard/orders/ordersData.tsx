import { formatNumber } from "@/utils/priceFormatter.util";
export const orderItemsMockData: OrderItemsMockData = [
  {
    order_number: 12345,
    status: "delivered",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    items: 1,
  },

  {
    order_number: 12345,
    status: "cancelled",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    items: 2,
  },
  {
    order_number: 12345,
    status: "in_delivery",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    items: 2,
  },
  {
    order_number: 12345,
    status: "delivered",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    items: 1,
  },

  {
    order_number: 12345,
    status: "cancelled",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    items: 2,
  },
  {
    order_number: 12345,
    status: "in_delivery",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    items: 3,
  },
];

export const orderServicesMockData: OrdersServiceMockData = [
  {
    order_number: 12345,
    status: "active",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    service: "Grooming",
  },

  {
    order_number: 12345,
    status: "in_active",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    service: "Grooming",
  },
  {
    order_number: 12345,
    status: "active",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    service: "Washing",
  },
  {
    order_number: 12345,
    status: "in_active",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    service: "Washing",
  },

  {
    order_number: 12345,
    status: "active",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    service: "Washing",
  },
  {
    order_number: 12345,
    status: "in_active",
    date: "12.03.24",
    price: formatNumber(123),
    fee: formatNumber(12),
    service: "Grooming",
  },
];

type OrderItemsMockData = {
  order_number: number;
  status: keyof typeof orderItemsStatusColors;
  date: string;
  price: string;
  fee: string;
  items: number;
}[];

type OrdersServiceMockData = {
  order_number: number;
  status: keyof typeof orderServicesStatusColors;
  date: string;
  price: string;
  fee: string;
  service: string;
}[];

export const orderItemsStatusColors = {
  delivered: "bg-[#edfbe6] text-[#1d7941]",
  cancelled: "bg-[#f6f6f6] text-[#52565d]",
  in_delivery: "bg-[#fef6d0] text-[#43464c]",
};

export const orderServicesStatusColors = {
  active: "bg-[#edfbe6] text-[#1d7941]",
  in_active: "bg-[#f6f6f6] text-[#52565d]",
};

export const orderItemsDeliveryStatus = {
  delivered: "Delivered",
  cancelled: "Cancelled",
  in_delivery: "In Delivery",
};

export const orderServicesType = {
  active: "Active",
  in_active: "Inactive",
};
