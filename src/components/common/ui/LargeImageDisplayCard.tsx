import React from "react";
import ImageUnselectButton from "./ImageUnselectButton";
import Image from "next/image";

type Props = {
  fileList: (File | string)[];
  handleRemoveImage: (file: string | File) => void;
};

function LargeImageDisplayCard({ fileList, handleRemoveImage }: Props) {
  return (
    <div className="w-full">
      <div className="bg-[#d9d9d9] block rounded-[20px] relative">
        <ImageUnselectButton
          handleClick={() => handleRemoveImage(fileList[0])}
        />
        <Image
          width={500}
          height={500}
          quality={100}
          src={
            typeof fileList[0] == "string"
              ? fileList[0]
              : URL.createObjectURL(fileList[0])
          }
          alt=""
          className="w-full h-full rounded-[20px]"
          // loader={({ src, width, quality }) => `https://example.com/${src}?w=${width}&q=${quality || 75}`}
          placeholder="blur"
          blurDataURL="/images/banner.png"
        />
      </div>
    </div>
  );
}

export default LargeImageDisplayCard;
