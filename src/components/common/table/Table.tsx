import React, { ReactNode } from "react";
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
} from "../../../types/table.type";
import NoItemsFound from "../ui/NoItemsFound";
import Pagination from "../ui/Pagination";

type Props = {
  filterData: FilterData;
  tableSchema: TableSchema;
  data: Data;
  sortData: SortSchema;
  actionOptions?: ActionOptions;
};

function Table({
  filterData,
  tableSchema,
  data,
  sortData,
  actionOptions,
}: Props) {
  return (
    <>
      <DeleteProductModal deleteAction={actionOptions?.delete} />
      <div className="overflow-x-scroll min-w-[900px] border rounded-[20px]">
        <div className="flex justify-between p-3 items-center">
          <div className="flex items-center gap-4">
            <TableFilter filterData={filterData} />
            <TableSearch action={actionOptions?.search?.action} />
          </div>
          <TableSort sortData={sortData} />
        </div>
        <table className="table">
          <TableHead
            tableSchema={tableSchema}
            allItemIds={data.map((prod) => prod.id + "")}
          />
          {data.length > 0 ? (
            <TableBody
              mockData={data}
              tableSchema={tableSchema}
              actionOptions={actionOptions}
            />
          ) : (
            <NoItemsFound />
          )}
        </table>
      </div>
      <div className="flex flex-row self-end">
        <Pagination data={100} />
      </div>
    </>
  );
}

export default Table;
