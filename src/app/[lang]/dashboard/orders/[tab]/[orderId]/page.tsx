import { getSingleOrder } from "@/actions/orders/get-vendor-orders";
import OrderDetailPage from "./components/OrderDetailPage";

type Props = {
  params: {
    orderId: string;
  };
  searchParams: {
    item: string;
  };
};

async function page({ params: { orderId }, searchParams: { item } }: Props) {
  const orderDetail = await getSingleOrder(item);

  return <OrderDetailPage orderDetail={orderDetail} />;
}
export default page;
