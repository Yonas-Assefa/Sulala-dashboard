import Table from "@/components/common/table/Table";
import RevenueCard from "../components/RevenueCard";
import { ordersMapper } from "@/actions/mapper/orders-mapper";
import {
  orderItemData,
  orderItemFilterData,
  orderItemSortData,
} from "../schema/items/data";
import { orderItemTableSchema } from "../schema/items/schema";
import { getVendorsRevenueStas } from "@/actions/orders/get-vendors-revenue-stat";
import { getOrders } from "@/actions/orders/get-vendor-orders";
async function Items() {
  const shopRevenueStat = await getVendorsRevenueStas();
  const orders = await getOrders();

  return (
    <div className="text-black flex flex-col w-full h-full gap-10">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
        <RevenueCard
          revenuePeriod="Total"
          totalCurrentSale={shopRevenueStat.total_revenue}
          totalCurrentFee={0}
        />
        <RevenueCard
          revenuePeriod="Weekly"
          totalCurrentSale={shopRevenueStat.weekly_sales}
          totalCurrentFee={0}
        />
        <RevenueCard
          revenuePeriod="Daily"
          totalCurrentSale={shopRevenueStat.today_sales}
          totalCurrentFee={0}
        />
      </div>

      {/* ITEMS TABLE */}
      {/* <OrdersTable tableType="items" /> */}
      <Table
        data={orders}
        filterData={orderItemFilterData}
        sortData={orderItemSortData}
        tableSchema={orderItemTableSchema}
      />
    </div>
  );
}

export default Items;
