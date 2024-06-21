import RevenueCard from "./RevenueCard";
import OrdersTable from "./OrdersTable";
import Table from "@/components/common/table/Table";
import {
  orderServiceData,
  orderServiceFilterData,
  orderServiceSortData,
} from "../schema/services/data";
import { orderServiceTableSchema } from "../schema/services/schema";
import { getVendorsRevenueStas } from "@/actions/orders/get-vendors-revenue-stat";

type SearchParams = {
  search: string;
  filter: string;
  sort: string;
  sort_by: string;
  page?: string;
  page_size?: string;
};

type ServicesProps = {
  searchParams: SearchParams;
};

async function Services({ searchParams }: ServicesProps) {
  const { search, filter, sort, sort_by } = searchParams;
  const shopRevenueStat = await getVendorsRevenueStas();

  return (
    <>
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

        {/* Services TABLE */}
        {/* <OrdersTable tableType="services" /> */}
        <Table
          data={orderServiceData}
          filterData={orderServiceFilterData}
          sortData={orderServiceSortData}
          tableSchema={orderServiceTableSchema}
        />
      </div>
    </>
  );
}

export default Services;
