import React from "react";

function StatisticNav() {
  return (
    <nav className=" bg-tertiary p-8 w-full">
      <ul className="flex gap-4">
        <li className="text-black hover:text-primary hover:underline font-semibold cursor-pointer transition-all">
          Order & Delivery Metrics
        </li>
      </ul>
    </nav>
  );
}

export default StatisticNav;
