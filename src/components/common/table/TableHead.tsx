import React from "react";
import { TableSchema } from "../../../types/table.type";
import TableDelete from "./TableDelete";
import TableCheckbox from "./TableCheckbox";

type Props = {
  tableSchema: TableSchema;
  allItemIds: string[];
};

function TableHead({ tableSchema, allItemIds }: Props) {
  return (
    <thead className="text-black bg-secondary/10 dark:bg-gray-800 dark:text-white">
      <tr className="border-secondary/30">
        {tableSchema.include.checkbox && (
          <TableCheckbox items_id={allItemIds} isHeader />
        )}
        {tableSchema.schema.map((schema) => {
          return (
            <th key={schema.key}>
              {!schema.tooltips ? (
                <p>{schema.title}</p>
              ) : (
                <div
                  className="tooltip bg-transparent tooltip-base"
                  data-tip={schema.tooltips}
                >
                  <p className="bg-transparent text-black dark:text-white cursor-pointer">
                    {schema.title}
                  </p>
                </div>
              )}
            </th>
          );
        })}
        {tableSchema.include.actions && tableSchema.include.checkbox && (
          <TableDelete />
        )}
        {tableSchema.include.actions && tableSchema.include.actions.detail && (
          <th>Actions</th>
        )}
      </tr>
    </thead>
  );
}

export default TableHead;
