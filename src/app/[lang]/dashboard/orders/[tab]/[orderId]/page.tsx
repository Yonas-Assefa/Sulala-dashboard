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
  const res = await getSingleOrder(item);
  console.log("params of detail: ", item, res);

  return <OrderDetailPage res={res} />;
}
export default page;
