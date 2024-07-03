import React from "react";
import EditServiceWorkTime from "./components/modals/EditServiceWorkTime";
import Table from "@/components/common/table/Table";
import ServiceHead from "./components/ServiceHead";
import {
  servicesFilterData,
  servicesSortData,
  serviceData,
} from "./schema/data";
import { serviceTableSchema } from "./schema/schema";
import ComingSoon from "@/components/common/ui/ComingSoon";

function page() {
  return (
    <>
      <ComingSoon />
      <EditServiceWorkTime />
      <div className="text-black flex flex-col w-full h-full p-8 gap-10">
        {/* HEADER FOR MY SERVICES */}
        <ServiceHead />

        <Table
          data={serviceData}
          filterData={servicesFilterData}
          tableSchema={serviceTableSchema}
          sortData={servicesSortData}
        />
      </div>
    </>
  );
}

export default page;
