export const mockeOrdersDataFromApi = [
  {
    order_info: {
      order_id: 4,
      email: "",
      first_name: "Владислав",
      last_name: "Хоменко",
      address: "Bole next to Alem Cinema Building",
      ordered_at: "2024-05-30T10:33:48+0000",
      price: 888114.0,
      fee: 0.0,
      status: "NEW",
    },
    orderItems: [
      {
        id: 1,
        product_id: 2,
        title: "هذا هو عنوان المنتج الخاص بي",
        price: 12.0,
        images: ["/media/products/product_2860_id_1.png"],
        unit_price: 12.0,
        quantity: 2,
        fee: 0.0,
        shipping: 0.0,
        discount: 0.0,
        paid: false,
        status: null,
        canceled_at: null,
        delivered_at: null,
        delivery_time: null,
        total_price: "24.00",
      },
      {
        id: 2,
        product_id: 3,
        title: "alisonwakerblue",
        price: 45.0,
        images: ["/media/products/product_3283_id_1.jpeg"],
        unit_price: 45.0,
        quantity: 2,
        fee: 0.0,
        shipping: 0.0,
        discount: 0.0,
        paid: false,
        status: null,
        canceled_at: null,
        delivered_at: null,
        delivery_time: null,
        total_price: "90.00",
      },
      {
        id: 3,
        product_id: 1,
        title: "Gretchen Wilcox",
        price: 888.0,
        images: ["/media/products/product_2025_id_1.png"],
        unit_price: 888.0,
        quantity: 1000,
        fee: 0.0,
        shipping: 0.0,
        discount: 0.0,
        paid: false,
        status: null,
        canceled_at: null,
        delivered_at: null,
        delivery_time: null,
        total_price: "888000.00",
      },
    ],
  },
];
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
