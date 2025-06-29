import React from "react";
import DeleteProductModal from "../modal/DeleteModal";
import TableFilter from "./TableFilter";
import TableSearch from "./TableSearch";
import TableSort from "./TableSort";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import {
  Data,
  SortSchema,
  FilterData,
  TableSchema,
  ActionOptions,
  Meta,
} from "../../../types/table.type";
import NoItemsFound from "../ui/NoItemsFound";
import TablePagination from "./TablePagination";
import ConfirmModal from "../modal/PromotionConfirmModal";
import { getCachedPersonalInfo } from "@/cache/get-cached-personal-info";

type Props = {
  filterData: FilterData;
  tableSchema: TableSchema;
  data: Meta | Data;
  sortData: SortSchema;
  actionOptions?: ActionOptions;
  tableType?: "ORDER" | "MANAGE_ORDER";
};

async function Table({
  filterData,
  tableSchema,
  data: meta,
  sortData,
  actionOptions,
  tableType,
}: Props) {
  const data = "count" in meta ? meta.data : meta;
  const count = "count" in meta ? meta.count : undefined;
  let filterTarget = "filter";

  const personalInfo = await getCachedPersonalInfo();
  if (tableType == "ORDER" || tableType == "MANAGE_ORDER") {
    filterTarget = "vendor_status";
  }

  return (
    <div className="flex flex-col">
      <ConfirmModal />
      <DeleteProductModal deleteAction={actionOptions?.delete} />
      <div className="overflow-x-visible min-w-[900px] border dark:border-gray-600 rounded-[20px]">
        <div className="flex justify-between p-3 items-center">
          <div className="flex items-center gap-4">
            <TableFilter filterTarget={filterTarget} filterData={filterData} />
            <TableSearch action={actionOptions?.search?.action} />
          </div>
          <TableSort sortData={sortData} />
        </div>
        <table className="table overflow-x-scroll">
          <TableHead
            tableSchema={tableSchema}
            allItemIds={data.map((prod) => prod.id + "")}
          />
          {data.length > 0 ? (
            <TableBody
              data={data}
              tableSchema={tableSchema}
              actionOptions={actionOptions}
              isSuperUser={personalInfo?.is_superuser}
            />
          ) : (
            <NoItemsFound />
          )}
        </table>
      </div>
      <TablePagination count={count} />
    </div>
  );
}

export default Table;
