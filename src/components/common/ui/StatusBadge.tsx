import React from "react";

type Props = {
  status: string;
  statusType?: keyof typeof bgColors;
};

const bgColors = {
  default: "bg-secondary",
  fail: "bg-[#ed8888] text-[#52565d]",
  success: "bg-[#bafd99] text-[#1d7941]",
};

function StatusBadge({ status, statusType = "default" }: Props) {
  return (
    <div
      className={`${bgColors[statusType]} text-sm text-black px-3 py-1 rounded-md `}
    >
      {status}
    </div>
  );
}

export default StatusBadge;
