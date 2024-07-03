"use client";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import SecondaryButton from "../ui/SecondaryButton";
import { closeModal } from "@/lib/modals";
import { useTranslations } from "next-intl";

type Props = {
  handleCropChange: (event: any) => void;
  rawImage: string | undefined;
  saveCrop: () => void;
  cancelCrop: () => void;
};

function CropImageModal({
  handleCropChange,
  rawImage,
  saveCrop,
  cancelCrop,
}: Props) {
  const cropperRef = React.useRef<ReactCropperElement>(null);
  const t = useTranslations("Commons");

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    handleCropChange(cropper?.getCroppedCanvas().toDataURL());
  };

  const handleSave = () => {
    saveCrop();
    closeModal("crop_image_setting_modal");
  };

  const handleCancel = () => {
    cancelCrop();
    closeModal("crop_image_setting_modal");
  };

  return (
    <dialog id="crop_image_setting_modal" className="modal">
      <div
        className={`modal-box w-11/12 max-w-sm bg-white dark:bg-gray-800 px-0`}
      >
        <div className="border-b-2 border-gray-200 pb-3">
          <h3 className="font-bold text-xl text-black dark:text-white text-center font-serif">
            {t("crop_your_photo")}
          </h3>
        </div>
        <div className="px-5 flex flex-col gap-3 mt-4">
          <Cropper
            src={rawImage}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={9 / 9}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
          <PrimaryButton
            name={t("save")}
            handleClick={handleSave}
            type="button"
          />
          <SecondaryButton
            name={t("cancel")}
            handleClick={handleCancel}
            type="button"
          />
        </div>
      </div>
    </dialog>
  );
}

export default CropImageModal;
