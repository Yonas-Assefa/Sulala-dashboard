import React from "react";

type IconProps = {
  className?: string;
  height?: number;
  width?: number;
};
function SearchIcon({
  className = "fill-[#232323] mt-[2px] dark:fill-white",
  height = 20,
  width = 20,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_92_7913)">
        <path d="M12.9167 11.6667H12.2583L12.025 11.4417C12.8417 10.4917 13.3333 9.25833 13.3333 7.91667C13.3333 4.925 10.9083 2.5 7.91667 2.5C4.925 2.5 2.5 4.925 2.5 7.91667C2.5 10.9083 4.925 13.3333 7.91667 13.3333C9.25833 13.3333 10.4917 12.8417 11.4417 12.025L11.6667 12.2583V12.9167L15.8333 17.075L17.075 15.8333L12.9167 11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.99167 4.16667 7.91667C4.16667 5.84167 5.84167 4.16667 7.91667 4.16667C9.99167 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99167 11.6667 7.91667 11.6667Z" />
      </g>
      <defs>
        <clipPath id="clip0_92_7913">
          <rect width={width} height={height} />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SearchIcon;
