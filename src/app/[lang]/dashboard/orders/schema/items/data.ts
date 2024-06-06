import { OrderItemDataItem } from "./type";

export const orderItemData: OrderItemDataItem[] = [
  {
    id: 1,
    order_number: "12345",
    status: "delivered",
    date: "12.03.24",
    price: 123,
    fee: 12,
    items: [
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
    ],
  },

  {
    id: 2,
    order_number: "12345",
    status: "cancelled",
    date: "12.03.24",
    price: 123,
    fee: 12,
    items: [
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
    ],
  },
  {
    id: 3,
    order_number: "12345",
    status: "in_delivery",
    date: "12.03.24",
    price: 123,
    fee: 12,
    items: [
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
    ],
  },
  {
    id: 4,
    order_number: "12345",
    status: "delivered",
    date: "12.03.24",
    price: 123,
    fee: 12,
    items: [
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
    ],
  },

  {
    id: 5,
    order_number: "12345",
    status: "cancelled",
    date: "12.03.24",
    price: 123,
    fee: 12,
    items: [
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
    ],
  },
  {
    id: 6,
    order_number: "12345",
    status: "in_delivery",
    date: "12.03.24",
    price: 123,
    fee: 12,
    items: [
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
      {
        label: "Pet, Horse & Cattle Shampoo",
        value: "pet_hourse_cattle_shampoo",
        image: "/images/milktake-silver.svg",
      },
    ],
  },
];

export const orderItemSortData = [
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Product title",
    value: "product_title",
  },
  {
    label: "Created",
    value: "created",
  },
];

export const orderItemFilterData = [
  "all",
  "delivered",
  "cancelled",
  "in_delivery",
];
