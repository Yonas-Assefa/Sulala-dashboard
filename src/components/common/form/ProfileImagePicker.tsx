"use client";
import React from "react";
import CropImageModal from "../modal/CropImageModal";
import { closeModal, openModal } from "@/lib/modals";
import { dataURLtoFile } from "@/utils/convertDataURLtoFile";
import { deleteShopProfile } from "@/actions/settings/delete-shop-profile";
import { useFormState } from "react-dom";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import ImageDeleteModal from "./ImageDeleteModal";
import { useTranslations } from "next-intl";

type Props = {
  error?: string | undefined;
  name?: string;
  id?: string;
  defaultValue?: string;
  disabled?: boolean;
};

function ProfileImagePicker({
  error,
  name,
  id,
  defaultValue,
  disabled,
}: Props) {
  const [image, setImage] = React.useState<{
    dataUrl: boolean;
    value: string | undefined;
  }>({ dataUrl: false, value: defaultValue });
  const [imageTem, setImageTem] = React.useState<{
    dataUrl: boolean;
    value: string | undefined;
  }>();
  const [rawImage, setRawImage] = React.useState<string | undefined>();
  const [saved, setSaved] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = React.useTransition();

  const [formState, setFormState] = React.useState(EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);

  const t = useTranslations("Commons");

  React.useEffect(() => {
    if (inputRef.current && image.dataUrl) {
      const dataTransfer = new DataTransfer();
      const file = dataURLtoFile(image.value, "image.png");
      dataTransfer.items.add(file);
      inputRef.current.files = dataTransfer.files;
    }
  }, [image]);

  const handleCropChange = (event: HTMLCanvasElement["toDataURL"]) => {
    setImage({ dataUrl: true, value: event.toString() });
    setSaved(false);
  };

  const cancelCrop = () => {
    setImage(imageTem || { dataUrl: false, value: undefined });
    setImageTem(undefined);
  };

  const saveCrop = () => {
    setImageTem(undefined);
  };

  const handleDelete = () => {
    startTransition(async () => {
      const form = new FormData();
      form.append("profile_photo", "");
      const response = await deleteShopProfile(form);
      setFormState(response);
      if (response.status === "SUCCESS") {
        setImage({ dataUrl: false, value: undefined });
        setRawImage(undefined);
        closeModal("image_delete_modal");
      }
    });
  };
  const handleCancel = () => {
    closeModal("image_delete_modal");
  };

  const handleRawImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageTem(image);
    const selectedFiles = Array.from(
      event.target.files as Iterable<File> | ArrayLike<File>,
    );
    const uploadedImages = selectedFiles.map((file) =>
      URL.createObjectURL(file),
    );
    setRawImage(uploadedImages[0]);
    openModal("crop_image_setting_modal");
  };

  const handleRemoveImage = () => {
    openModal("image_delete_modal", true).then((result) => {
      if (result) {
        handleDelete();
      } else {
        handleCancel();
      }
    });
  };

  React.useEffect(() => {
    if (formState.status === "SUCCESS") {
      setSaved(true);
    }
  }, [formState]);

  return (
    <>
      <ImageDeleteModal isPending={isPending} />
      <CropImageModal
        saveCrop={saveCrop}
        cancelCrop={cancelCrop}
        handleCropChange={handleCropChange}
        rawImage={rawImage}
      />
      <div className="flex flex-row gap-4 items-center">
        {!image.value ? (
          <label
            htmlFor={id}
            className="flex flex-row gap-4 items-center cursor-pointer"
          >
            <div
              className={`cursor-pointer w-[6vw] min-w-[50px] flex justify-center items-center aspect-square rounded-full ${error ? "border-danger border bg-dangerlight" : "bg-tertiary"}`}
            >
              <img
                src={error ? "/icons/camera-red.svg" : "/icons/camera.svg"}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <p
                className={`font-semibold ${error ? "text-danger" : "text-primary"}`}
              >
                {t("add_photo")}
              </p>
              <div className="text-secondary flex flex-col gap-0">
                <span>{t("jpeg,_png")}</span>
                <span>{t("max_20_mb")}</span>
              </div>
            </div>
          </label>
        ) : (
          <div className="flex flex-row gap-4 items-center  w-full md:w-auto justify-start relative">
            <img
              width={100}
              height={100}
              src={image.value}
              alt=""
              className="rounded-full aspect-square w-[30vw]  md:w-[6vw] min-w-[50px]"
            />
            {!disabled ? (
              <div className="flex md:flex-row flex-col gap-2">
                <label
                  htmlFor={id}
                  className="text-primary font-semibold cursor-pointer"
                >
                  {t("change_photo")}
                </label>
                <button
                  type="button"
                  className="text-danger font-semibold"
                  onClick={handleRemoveImage}
                >
                  {t("delete_photo")}
                </button>
              </div>
            ) : (
              <p className="text-black/40 font-semibold cursor-not-allowed truncate">
                {t("readonly")}
              </p>
            )}
            {/* {
                            !saved &&
                            <div className='flex flex-row gap-2 right-0 justify-end relative md:absolute bottom-5 tooltip tooltip-bottom tooltip-hover hover:cursor-pointer tooltip-error' data-tip='⚠️ &nbsp;profile not saved!'>
                                <img src={"/icons/alert.svg"} alt="" className='w-[15px] aspect-square' />
                            </div>
                        } */}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          name={name}
          id={id}
          className="hidden"
          accept="image/*"
          onChange={handleRawImage}
        />
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </>
  );
}

export default ProfileImagePicker;
