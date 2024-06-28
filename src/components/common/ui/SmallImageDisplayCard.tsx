import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ImageUnselectButton from "./ImageUnselectButton";
import Image from "next/image";
import { uploadImage } from "@/actions/common/upload-image";
import { pushErrorNotification } from "@/utils/pushNotification.util";
import { Console } from "@/lib/print";

type Props = {
  file: File | string;
  handleRemoveImage: (file: string | File) => void;
  replaceImage?: (file: string) => void;
  usePreUploader?: boolean;
};

function SmallImageDisplayCard({
  file,
  handleRemoveImage,
  replaceImage,
  usePreUploader,
}: Props) {
  const [progress, setProgress] = React.useState(0);
  const [progressStatus, setProgressStatus] = React.useState<
    "pending" | "success" | "error"
  >("pending");
  const [openProgressDisplay, setOpenProgressDisplay] = React.useState(
    !usePreUploader || typeof file == "string" ? false : true,
  );

  React.useEffect(() => {
    if (usePreUploader && file instanceof File) {
      const formData = new FormData();
      formData.append("file", file);
      setProgress(30);
      uploadImage(formData)
        .then((res) => {
          if (res.success) {
            setProgress(100);
            setTimeout(() => {
              setProgressStatus("success");
              Console.log({ data: res.message });
              replaceImage?.(res.message);
              setTimeout(() => {
                setOpenProgressDisplay(false);
              }, 2000);
            }, 1000);
          } else {
            setProgressStatus("error");
            pushErrorNotification(res.message);
          }
        })
        .catch(() => {
          setProgressStatus("error");
          pushErrorNotification("Failed to upload image");
        });
    }
  }, []);
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
      {openProgressDisplay && (
        <div className="absolute top-0 p-4 rounded-[18px] rounded-tr-none bg-white/80 w-full h-full flex flex-col justify-center items-center z-10">
          <AnimatePresence>
            {progressStatus == "pending" && (
              <motion.progress
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="progress transition-all progress-success w-full bg-tertiary"
                value={progress}
                max="100"
              ></motion.progress>
            )}
            {progressStatus == "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="flex flex-col text-[14px] font-semibold justify-center items-center text-primary"
              >
                <p>Completed!</p>
              </motion.div>
            )}
            {progressStatus == "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="flex flex-col text-[14px] font-semibold justify-center items-center text-danger"
              >
                <p>Failed!</p>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(file)}
                  className="text-secondary bg-white rounded-[20px] px-3 hover:text-danger hover:bg-dangerlight transition-all"
                >
                  remove
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export default SmallImageDisplayCard;
