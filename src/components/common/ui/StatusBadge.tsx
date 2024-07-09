import React from "react";

type Props = {
  status: string;
  statusType?: keyof typeof bgColors;
};

const bgColors = {
  default: "bg-[#fef6d0] text-[#43464c]",
  fail: "bg-[#f6f6f6] text-[#52565d]",
  success: "bg-[#f0f5ff] text-[#1e3a8a]",
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
  // Determine if the status belongs to "fail" or "success"
  const determineStatusType = (): keyof typeof bgColors => {
    if (BG_COLORS_MAPPER.fail.includes(status)) {
      return "fail";
    } else if (BG_COLORS_MAPPER.success.includes(status)) {
      return "success";
    } else {
      return "default";
    }
  };

  // Get the appropriate statusType based on the status
  const resolvedStatusType = determineStatusType();
  console.log("status of colors", resolvedStatusType);

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
