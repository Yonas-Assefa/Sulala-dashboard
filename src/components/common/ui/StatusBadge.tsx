import React from "react";

type Props = {
  status: string;
  statusType?: keyof typeof bgColors;
};

const bgColors = {
  default: "bg-[#fef6d0] text-[#43464c]",
  fail: "bg-[#f6f6f6] text-[#52565d]",
  success: "bg-[#edfbe6] text-[#1d7941]",
};

const BG_COLORS_MAPPER = {
  fail: ["UNPAID", "UNASSIGNED"],
  success: ["DELIVERED", "PAID", "ASSIGNED"],
};

const ORDER_STATUS_MAP = {
  NEW: "New",
  ACCEPTED: "Accepted",
  IN_DELIVERY: "In Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

type ORDER_STATUS =
  | "NEW"
  | "ACCEPTED"
  | "IN_DELIVERY"
  | "CANCELLED"
  | "DELIVERED";

function StatusBadge({ status, statusType = "default" }: Props) {
  const determineStatusType = (): keyof typeof bgColors => {
    if (statusType) {
      return statusType;
    } else if (BG_COLORS_MAPPER.fail.includes(status.toUpperCase())) {
      return "fail";
    } else if (BG_COLORS_MAPPER.success.includes(status.toUpperCase())) {
      return "success";
    } else {
      return "default";
    }
  };

  const resolvedStatusType = determineStatusType();
  return (
    <div
      className={`${bgColors[resolvedStatusType]} text-sm text-black px-3 py-1 rounded-md `}
    >
      {ORDER_STATUS_MAP[status as ORDER_STATUS]
        ? ORDER_STATUS_MAP[status as ORDER_STATUS]
        : status}
    </div>
  );
}

export default StatusBadge;
