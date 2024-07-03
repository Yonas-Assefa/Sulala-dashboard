import React from "react";

type IconProps = {
  className?: string;
  height?: number;
  width?: number;
};

function SwapVertIcon({
  className = "fill-[#232323] mt-[2px] dark:fill-white",
  height = 20,
  width = 20,
}: IconProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_924_277798)">
          <path d="M13.3337 14.175V8.33333H11.667V14.175H9.16699L12.5003 17.5L15.8337 14.175H13.3337ZM7.50033 2.5L4.16699 5.825H6.66699V11.6667H8.33366V5.825H10.8337L7.50033 2.5ZM13.3337 14.175V8.33333H11.667V14.175H9.16699L12.5003 17.5L15.8337 14.175H13.3337ZM7.50033 2.5L4.16699 5.825H6.66699V11.6667H8.33366V5.825H10.8337L7.50033 2.5Z" />
        </g>
        <defs>
          <clipPath id="clip0_924_277798">
            <rect width={width} height={height} />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default SwapVertIcon;
