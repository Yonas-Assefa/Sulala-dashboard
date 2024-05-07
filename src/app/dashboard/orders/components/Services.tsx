import RevenueCard from "./RevenueCard";
import OrdersTable from "./OrdersTable";

function Services() {
  return (
    <>
      <div className="text-black flex flex-col w-full h-full gap-10">
        <div className="grid grid-cols-3 gap-5">
          <RevenueCard
            revenuePeriod="Total"
            totalCurrentSale={620000}
            totalCurrentFee={6100}
          />
          <RevenueCard
            revenuePeriod="Weekly"
            totalCurrentSale={150000}
            totalCurrentFee={750}
          />
          <RevenueCard
            revenuePeriod="Daily"
            totalCurrentSale={20000}
            totalCurrentFee={750}
          />

          
        </div>

        {/* Services TABLE */}
        <OrdersTable tableType="services" />
      </div>
    </>
  );
}

export default Services;
