import React from "react";
import Table from "@/components/common/table/Table";
import { promotionFilterData, promotionSortData } from "./schema/data";
import { customerSupportTableSchema } from "./schema/schema";
import { TableProps as Props } from "@/types/props.type";
import { getTranslations } from "next-intl/server";
import { changeObjToFormData } from "@/lib/helper";
import { getDeliveryPartners } from "@/actions/admin-manage/get-delivery-partners";

async function page({
  searchParams: { search, filter, sort, sort_by, page, page_size },
}: Props) {
  const deliveryPartners = await getDeliveryPartners(
    changeObjToFormData({
      search,
      filter,
      sort,
      sort_by,
      page,
      page_size,
    }),
  );

  const t = await getTranslations("Manage");

  return (
    <>
      <div className="text-black flex flex-col w-full h-full p-8 gap-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl md:text-4xl font-semibold font-serif">
            {t("manage_delivery_partners")}
          </h1>
        </div>

        <Table
          data={deliveryPartners}
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
