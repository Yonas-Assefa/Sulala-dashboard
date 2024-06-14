import Table from "@/components/common/table/Table";
import RevenueCard from "../components/RevenueCard";
import { ordersMapper } from "@/actions/mapper/orders-mapper";
import {
  orderItemData,
  orderItemFilterData,
  orderItemSortData,
} from "../schema/items/data";
import { orderItemTableSchema } from "../schema/items/schema";
import { getVendorsRevenueStats } from "@/actions/orders/get-vendors-revenue-stat";
import { getOrders } from "@/actions/orders/get-vendor-orders";
async function Items() {
  const shopRevenueStat = await getVendorsRevenueStats();
  const orders = await getOrders();

  return (
    <div className="text-black flex flex-col w-full h-full gap-10">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
        <RevenueCard
          revenuePeriod="Total"
          totalCurrentSale={shopRevenueStat.total.revenue}
          totalCurrentFee={shopRevenueStat.total.fee}
        />
        <RevenueCard
          revenuePeriod="Weekly"
          totalCurrentSale={shopRevenueStat.weekly.revenue}
          totalCurrentFee={shopRevenueStat.weekly.fee}
        />
        <RevenueCard
          revenuePeriod="Daily"
          totalCurrentSale={shopRevenueStat.today.revenue}
          totalCurrentFee={shopRevenueStat.today.fee}
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
