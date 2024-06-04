import React from "react";
import { formatNumber } from "@/utils/priceFormatter.util";

interface Props {
  revenuePeriod: string;
  totalCurrentFee: number;
  totalCurrentSale: number;
}

function RevenueCard({
  revenuePeriod,
  totalCurrentFee,
  totalCurrentSale,
}: Props) {
  return (
    <div
      className={`p-6 rounded-2xl flex justify-between items-end flex-row ${
        revenuePeriod == "Total"
          ? "bg-[#E1ECB9]"
          : revenuePeriod == "Weekly"
          ? "bg-[#FEF6D0]"
          : revenuePeriod == "Daily"
          ? "bg-[#CCF4D8]"
          : "bg-gray-200"
      }`}
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-primary/70">
          {revenuePeriod == "Total"
            ? "Total revenue "
            : revenuePeriod == "Weekly"
            ? "Weekly Sales "
            : revenuePeriod == "Daily"
            ? "Today Sales "
            : null}{" "}
          (after fee)
        </h2>
        <h1 className="text-primary/100 font-bold text-2xl font-serif leading-8">
          {" "}
          {formatNumber(totalCurrentSale)}
        </h1>
      </div>
      <div>
        <h3 className="text-primary/70">
          Total fee{" "}
          <span className="text-[#064F23] font-serif font-bold">
            {formatNumber(totalCurrentFee)}
          </span>
        </h3>
      </div>
    </div>
  );
}

export default RevenueCard;
