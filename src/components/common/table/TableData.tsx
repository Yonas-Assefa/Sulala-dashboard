"use client";
import { formatPiece } from "@/utils/pieceFormatter.util";
import { formatNumber } from "@/utils/priceFormatter.util";
import React from "react";

type TableDataProps = {
  product_key: any;
  schema: {
    type: string;
  };
};
function TableData({ product_key, schema }: TableDataProps) {
  const SUBSTRING_LENGTH = 200;
  const content = !product_key
    ? "N/A"
    : schema.type == "money"
      ? formatNumber(product_key)
      : schema.type == "pieces"
        ? formatPiece(product_key)
        : (product_key + "").toLowerCase();
  const [showDetails, setShowDetails] = React.useState(
    content?.toString().length > SUBSTRING_LENGTH ? false : true,
  );
  const contentToShow = !showDetails
    ? content?.toString().substring(0, SUBSTRING_LENGTH) + "..."
    : content;

  return (
    <div className="">
      <p className="text-black dark:text-white text-left">{contentToShow}</p>
      {content?.toString().length > SUBSTRING_LENGTH && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-primary dark:text-green-600 text-xs underline"
        >
          {showDetails ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default TableData;
