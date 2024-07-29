"use client";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import React from "react";

type Props = {
  metricsNav: { label: string; value: string }[];
};
function StatisticNav({ metricsNav }: Props) {
  const { createQueryStringAndPush, searchParams } = useCreateQueryString();

  const metrics = searchParams.get("metrics");

  const handleClick = (value: string) => {
    createQueryStringAndPush("metrics", value);
  };

  return (
    <nav className=" bg-tertiary p-8 w-full">
      <ul className="flex gap-4">
        [
        {metricsNav.map((nav) => (
          <li
            key={nav.value}
            onClick={() => handleClick(nav.value)}
            className={`text-black hover:text-primary hover:underline font-semibold cursor-pointer transition-all 
            ${metrics == nav.value && "text-primary underline"}
            `}
          >
            {nav.label}
          </li>
        ))}
        ]
      </ul>
    </nav>
  );
}

export default StatisticNav;
