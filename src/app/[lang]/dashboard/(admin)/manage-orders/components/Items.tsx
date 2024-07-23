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

  // const shopRevenueStat = await getVendorsRevenueStas();
  const shopRevenueStat = {
    total: {
      revenue: 0,
      fee: 0,
    },
    weekly: {
      revenue: 0,
      fee: 0,
    },
    today: {
      revenue: 0,
      fee: 0,
    },
  };
  // const orders = await getOrders(ordersFormData);
  const orders: object[] = [];

  return (
    <div className="text-black flex flex-col w-full h-full gap-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
