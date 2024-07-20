import React from "react";
import Table from "@/components/common/table/Table";
import { promotionFilterData, promotionSortData } from "./schema/data";
import { customerSupportTableSchema } from "./schema/schema";
import { TableProps as Props } from "@/types/props.type";
import { getTranslations } from "next-intl/server";
import { changeObjToFormData } from "@/lib/helper";
import { getPendingDrivers } from "@/actions/admin-manage/get-pending-drivers";

async function page({
  searchParams: { search, filter, sort, sort_by },
}: Props) {
  const pendingDrivers: any = await getPendingDrivers(
    changeObjToFormData({ search, filter, sort, sort_by }),
  );

  const t = await getTranslations("Manage");

  return (
    <>
      <div className="text-black flex flex-col w-full h-full p-8 gap-10">
        {/* HEADER FOR MY PRODUCTS */}
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl md:text-4xl font-semibold font-serif">
            {"Manage Shop Drivers"}
          </h1>
        </div>

        {/* <PromotionCampaignTable /> */}
        <Table
          data={pendingDrivers}
          filterData={promotionFilterData}
          tableSchema={customerSupportTableSchema}
          sortData={promotionSortData}
          actionOptions={{}}
        />
      </div>
    </>
  );
}

export default page;
