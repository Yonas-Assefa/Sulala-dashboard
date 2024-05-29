import Table from "@/components/common/table/Table";
import RevenueCard from "../components/RevenueCard";
import {
  orderItemData,
  orderItemFilterData,
  orderItemSortData,
} from "../schema/items/data";
import { orderItemTableSchema } from "../schema/items/schema";
import { getVendorsRevenueStas } from "@/actions/orders/get-vendors-revenue-stat";
async function Items() {
  const shopRevenueStat = await getVendorsRevenueStas();
  return (
    <div className="text-black flex flex-col w-full h-full gap-10">
      <div className="grid grid-cols-3 gap-5">
        <RevenueCard
          revenuePeriod="Total"
          totalCurrentSale={shopRevenueStat.total_revenue}
          totalCurrentFee={6100}
        />
        <RevenueCard
          revenuePeriod="Weekly"
          totalCurrentSale={shopRevenueStat.weekly_sales}
          totalCurrentFee={750}
        />
        <RevenueCard
          revenuePeriod="Daily"
          totalCurrentSale={shopRevenueStat.today_sales}
          totalCurrentFee={750}
        />
      </div>

      {/* ITEMS TABLE */}
      {/* <OrdersTable tableType="items" /> */}
      <Table
        data={orderItemData}
        filterData={orderItemFilterData}
        sortData={orderItemSortData}
        tableSchema={orderItemTableSchema}
      />
    </div>
  );
}

export default Items;
