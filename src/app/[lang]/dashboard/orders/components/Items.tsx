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
import { changeObjToFormData } from "@/lib/helper";
import Pagination from "@/components/common/ui/Pagination";
import { TOTAL_ORDERS_COUNT } from "@/actions/mapper/orders-mapper";

type SearchParams = {
  search: string;
  filter: string;
  sort: string;
  sort_by: string;
  page_size: string;
  page: string;
};

type ItemsProps = {
  searchParams: SearchParams;
};

async function Items({ searchParams }: ItemsProps) {
  const { search, filter, sort, sort_by, page_size, page } = searchParams;
  const ordersFormData = changeObjToFormData({
    search,
    filter,
    sort,
    sort_by,
    page_size,
    page,
  });

  const shopRevenueStat = await getVendorsRevenueStas();
  const orders = await getOrders(ordersFormData);

  return (
    <div className="text-black flex flex-col w-full h-full gap-10">
      <div className="grid grid-cols-3 gap-5">
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
      {TOTAL_ORDERS_COUNT > 0 && (
        <div className="flex flex-row self-end">
          <Pagination dataCount={TOTAL_ORDERS_COUNT} />
        </div>
      )}
    </div>
  );
}

export default Items;
