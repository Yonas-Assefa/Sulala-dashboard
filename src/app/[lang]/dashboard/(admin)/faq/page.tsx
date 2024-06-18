import React from "react";
import Table from "@/components/common/table/Table";
import { promotionFilterData, promotionSortData } from "./schema/data";
import { customerSupportTableSchema } from "./schema/schema";
import { TableProps as Props } from "@/types/props.type";
import { getTranslations } from "next-intl/server";

async function page(
  {
    // searchParams: { search, filter, sort, sort_by },
  }: Props,
) {
  // const pendingShops: any = await getSupportRequests(
  //   changeObjToFormData({ search, filter, sort, sort_by }),
  // );
  const t = await getTranslations("Manage");

  return (
    <>
      <div className="text-black flex flex-col w-full h-full p-8 gap-10">
        {/* HEADER FOR MY PRODUCTS */}
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl md:text-4xl font-semibold font-serif">
            {t("manage_faqs")}
          </h1>
        </div>

        {/* <PromotionCampaignTable /> */}
        <Table
          // data={pendingShops}
          data={[]}
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
