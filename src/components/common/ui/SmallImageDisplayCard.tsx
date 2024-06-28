import { motion } from "framer-motion";
import React from "react";
import ImageUnselectButton from "./ImageUnselectButton";
import Image from "next/image";

type Props = {
  file: File | string;
  handleRemoveImage: (file: string | File) => void;
};

function SmallImageDisplayCard({ file, handleRemoveImage }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
      key={typeof file == "string" ? file : file.name}
      className="bg-[#d9d9d9] block h-[180px] aspect-square rounded-[20px] relative"
    >
      <ImageUnselectButton
        // handleClick={() => {
        //     setFileList((prevFile) => prevFile.filter((_, i) => i !== index))
        // }}
        handleClick={() => handleRemoveImage(file)}
      />
      <Image
        width={100}
        height={100}
        src={typeof file == "string" ? file : URL.createObjectURL(file)}
        alt=""
        className="w-full h-full rounded-[20px]"
      />
    </motion.div>
  );
}

export default SmallImageDisplayCard;
