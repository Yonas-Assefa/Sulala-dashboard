import React from "react";
import { orderItemBadgeColorSchema } from "@/app/[lang]/dashboard/orders/schema/items/schema";

type Props = {
  status: string;
  type?: "ORDER" | "PAYMENT" | "DRIVER" | "DEFAULT";
  statusType?: string;
};

const driverAndPaymentStatusColors = {
  default: "bg-[#fef6d0] text-[#43464c]",
  fail: "bg-[#f0f0f0] text-[#6c757d]",
  success: "bg-[#edfbe6] text-[#1d7941]",
};

type OrderStatus = keyof typeof orderItemBadgeColorSchema;

function StatusBadge({ status, type = "DEFAULT" }: Props) {
  const determineStatusType = (): string => {
    let statusColorAndFont;
    switch (type) {
      case "ORDER":
        statusColorAndFont =
          orderItemBadgeColorSchema[
            status.toLocaleLowerCase() as OrderStatus
          ] || driverAndPaymentStatusColors.default;
        break;

      case "PAYMENT":
        if (status.toLocaleUpperCase() == "PAID") {
          statusColorAndFont = driverAndPaymentStatusColors.success;
        } else if (status.toLocaleUpperCase() == "UNPAID") {
          statusColorAndFont = driverAndPaymentStatusColors.fail;
        } else {
          statusColorAndFont = driverAndPaymentStatusColors.default;
        }
        break;

      case "DRIVER":
        if (status == "Assigned") {
          statusColorAndFont = driverAndPaymentStatusColors.success;
        } else if (status == "Unassigned") {
          statusColorAndFont = driverAndPaymentStatusColors.fail;
        } else {
          statusColorAndFont = driverAndPaymentStatusColors.default;
        }
        break;

      case "DEFAULT":
        statusColorAndFont = driverAndPaymentStatusColors.default;
    }

    return statusColorAndFont;
  };

  const bgtheme = determineStatusType();

  const resolvedStatusType = determineStatusType();
  return (
    <div className={`${bgtheme} text-sm px-3 py-1 rounded-md capitalize`}>
      {status.replace("_", " ").toLocaleLowerCase()}
    </div>
  );
}

export default StatusBadge;
