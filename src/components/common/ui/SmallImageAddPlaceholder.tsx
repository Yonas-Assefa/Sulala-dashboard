import React from "react";

type Props = {
  id: string;
};

function SmallImageAddPlaceholder({ id }: Props) {
  return (
    <label
      htmlFor={id}
      className="bg-[#ffffff] dark:bg-gray-800 cursor-pointer block h-[180px] aspect-square rounded-[20px]"
    >
      <div className="w-full h-full flex justify-center items-center group transition-all">
        <img
          src="/icons/image.svg"
          alt=""
          className="w-[30px] aspect-square block group-hover:hidden"
        />
        <div className=" hidden group-hover:flex flex-col justify-center items-center">
          <div></div>
          <img
            src="/icons/plus.svg"
            alt=""
            className="w-[30px] aspect-square"
          />
          <p className="text-[12px] text-secondary">add image</p>
        </div>
      </div>
    </label>
  );
}

export default SmallImageAddPlaceholder;
