import React from "react";
import { ActionOptions, TableSchema } from "../../../types/table.type";
import TableCheckbox from "./TableCheckbox";
import TableBadge from "./TableBadge";
import TableActions from "./TableActions";
import TableDropDown from "./TableDropDown";
import { formatNumber } from "@/utils/priceFormatter.util";
import { formatPiece } from "@/utils/pieceFormatter.util";
import Image from "next/image";
import TableData from "./TableData";
import TableBreadCrumb from "./TableBreadCrumb";

type Props = {
  tableSchema: TableSchema;
  data: Record<string, any>[];
  actionOptions?: ActionOptions;
  isSuperUser?: boolean;
};

function TableBody({ tableSchema, data, actionOptions, isSuperUser }: Props) {
  return (
    <tbody>
      {data.map((product, index) => {
        const last_items = index > data.length - 3;
        return (
          <tr
            className="border-secondary/30 dark:border-white/50 text-black dark:text-white"
            key={product.id}
          >
            {tableSchema.include.checkbox && (
              <TableCheckbox item_id={product.id} />
            )}
            {tableSchema.schema.map((schema) => {
              const product_key = product[schema.key as keyof typeof product];
              return (
                <td key={schema.key}>
                  {schema.badge ? (
                    <TableBadge
                      product_key={product_key}
                      schema={schema}
                      last_items={last_items}
                      isSuperUser={isSuperUser}
                    />
                  ) : schema.dropdown ? (
                    <TableDropDown
                      items={product_key}
                      label={schema.title}
                      last_items={last_items}
                      productId={product.id}
                    />
                  ) : (
                    <div className="flex flex-row gap-3 items-center max-w-[30vw] text-center overflow-x-hidden">
                      {schema.image && (
                        <div className=" w-[30px] h-[40px] content-stretch flex flex-col justify-center">
                          <Image
                            width={100}
                            height={100}
                            src={
                              product.images.length > 0
                                ? product[
                                    schema.image_key as keyof typeof product
                                  ]
                                : "/images/product-placeholder.jpg"
                            }
                            alt=""
                            className="max-w-[30px] max-h-[30px]"
                          />
                        </div>
                      )}
                      {!schema.breadcrumb ? (
                        <TableData product_key={product_key} schema={schema} />
                      ) : (
                        <TableBreadCrumb product_key={product_key} />
                      )}
                    </div>
                  )}
                </td>
              );
            })}
            {tableSchema.include.actions && (
              <TableActions
                promote={tableSchema.include.actions.promote}
                is_promoted={product.is_promoted}
                is_disabled={product.is_promote_disabled}
                delete={tableSchema.include.actions.delete}
                edit={tableSchema.include.actions.edit}
                detail={tableSchema.include.actions.detail}
                product={product}
                toggle={tableSchema.include.actions.toggle}
                actionOptions={actionOptions}
              />
            )}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
