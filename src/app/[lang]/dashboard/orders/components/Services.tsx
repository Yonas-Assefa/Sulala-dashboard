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

async function Services() {
  const shopRevenueStat = await getVendorsRevenueStas();
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <>
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
