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
import TablePagination from "./TablePagination";

type Meta = {
  data: Data;
  count: number;
};

type Props = {
  filterData: FilterData;
  tableSchema: TableSchema;
  data: Meta | Data;
  sortData: SortSchema;
  actionOptions?: ActionOptions;
};

function Table({
  filterData,
  tableSchema,
  data: meta,
  sortData,
  actionOptions,
}: Props) {
  const data = "count" in meta ? meta.data : meta;
  const count = "count" in meta ? meta.count : undefined;
  return (
    <div className="flex flex-col">
      <DeleteProductModal deleteAction={actionOptions?.delete} />
      <div className="overflow-x-visible min-w-[900px] border rounded-[20px]">
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
              data={data}
              tableSchema={tableSchema}
              actionOptions={actionOptions}
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
