import { getSingleManageOrder } from "@/actions/admin-manage/get-manage-orders";
import OrderDetailPage from "./components/OrderDetailPage";
import { getDeliveryPartners } from "@/actions/admin-manage/get-delivery-partners";
import { customMapper } from "@/actions/mapper/custom-mapper";

type Props = {
  params: {
    orderId: string;
  };
  searchParams: {
    item: string;
  };
};

async function page({ params: { orderId }, searchParams: { item } }: Props) {
  const orderDetail = await getSingleManageOrder(item);
  const deliveryPartners = customMapper({
    data: await getDeliveryPartners(),
    opt: [
      {
        to: "label",
        converter: (item) =>
          `${item.driver_name} (${item.availability}) (${item.online_status})`,
      },
      {
        to: "value",
        from: "id",
      },
      {
        to: "image",
        from: "profile_photo",
      },
    ],
  });
  console.log({ orderDetail });

  return (
    <OrderDetailPage
      orderDetail={orderDetail}
      deliveryPartners={deliveryPartners}
    />
  );
}
export default page;
