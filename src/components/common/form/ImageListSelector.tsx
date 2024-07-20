"use client";
import React, { useEffect } from "react";
import { convertToArray } from "@/utils/convertObjToArray";
import { closeModal, openModal } from "@/lib/modals";
import ImageDeleteModal from "./ImageDeleteModal";
import {
  EMPTY_FORM_STATE,
  FormState,
  toFormState,
} from "@/utils/formStateHelper";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useTranslations } from "next-intl";
import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import { Console } from "@/lib/print";
import SmallImageDisplayCard from "../ui/SmallImageDisplayCard";
import LargeImageAddPlaceholder from "../ui/LargeImageAddPlaceholder";
import LargeImageDisplayCard from "../ui/LargeImageDisplayCard";
import { AnimatePresence } from "framer-motion";
import SmallImageAddPlaceholder from "../ui/SmallImageAddPlaceholder";

type Props = {
  multi?: boolean;
  label?: string;
  error?: string;
  id?: string;
  name?: string;
  defaultValues?: string[];
  setValue?: (val: (File | string)[]) => void;
  onDelete?: {
    action: (formData: FormData) => Promise<FormState>;
    formData: { key: string; value: string | Function }[];
  };
  usePreUploader?: boolean;
  required?: boolean;
};

function ImageListSelector({
  multi = false,
  label,
  error,
  name,
  id,
  defaultValues,
  setValue,
  onDelete,
  usePreUploader,
  required,
}: Props) {
  const [fileList, setFileList] = React.useState<(File | string)[]>(
    convertToArray(defaultValues),
  );
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [formState, setFormState] = React.useState(EMPTY_FORM_STATE);
  const [isPending, startTransition] = React.useTransition();

  const ref = useScrollToErrorField<HTMLDivElement>(error);

  const t = useTranslations("Commons");

  useToastMessage(formState);
  useRedirectRoute(formState);

  const handleDelete = async (file?: string) => {
    startTransition(async () => {
      const formData = new FormData();
      onDelete?.formData.forEach((ele) => {
        formData.append(
          ele.key,
          typeof ele.value == "function" ? ele.value(file) : ele.value,
        );
      });
      try {
        const response = await onDelete?.action(formData);
        setFormState(response || EMPTY_FORM_STATE);
        if (response?.status === "SUCCESS") {
          setFileList(
            !file ? [] : (prevFile) => prevFile.filter((f) => f !== file),
          );
          closeModal("image_delete_modal");
        }
      } catch (error) {
        Console.error(error);
        setFormState(toFormState("ERROR", "Failed to delete image"));
        closeModal("image_delete_modal");
      }
    });
  };

  const handleCancel = () => {
    closeModal("image_delete_modal");
  };

  useEffect(() => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      fileList.forEach(
        (file) => typeof file !== "string" && dataTransfer.items.add(file),
      );
      inputRef.current.files = dataTransfer.files;
    }
    if (setValue) {
      setValue(fileList);
    }
  }, [fileList]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(
      event.target.files as Iterable<File> | ArrayLike<File>,
    );
    setFileList(fileList.concat(selectedFiles));
  };

  const handleRemoveImage = (file: File | string) => {
    if (file instanceof File) {
      setFileList((prevFile) => prevFile.filter((f) => f !== file));
      return;
    }
    openModal("image_delete_modal", true).then((result) => {
      if (result) {
        handleDelete(file);
      } else {
        handleCancel();
      }
    });
  };
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <ImageDeleteModal isPending={isPending} />
      <div className="flex flex-row gap-2">
        <div className="flex">
          <p>{label || t("images")}</p>
          {required && (
            <span className="text-danger">
              *&nbsp;
              {/* <sup className="text-xs opacity-70">(required)</sup> */}
            </span>
          )}
        </div>
        {!multi && fileList?.length > 0 && fileList[0] instanceof File && (
          <div
            className="flex flex-row gap-2 justify-end tooltip tooltip-top tooltip-hover hover:cursor-pointer tooltip-error animate-pulse"
            data-tip={`⚠️  ${t("image_not_saved")}`}
          >
            <img
              src={"/icons/alert.svg"}
              alt=""
              className="w-[15px] aspect-square"
            />
          </div>
        )}
      </div>
      {fileList.length == 0 ? (
        <LargeImageAddPlaceholder id={id!} error={!!error} />
      ) : multi ? (
        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {fileList.map((file) => (
              <SmallImageDisplayCard
                file={file}
                handleRemoveImage={handleRemoveImage}
                key={typeof file == "string" ? file : file.name}
                addUploadedImage={(file) => {
                  setUploadedImages((prev) => [...prev, file]);
                }}
                removeUploadedImage={(file) => {
                  setUploadedImages((prev) => prev.filter((f) => f !== file));
                }}
                usePreUploader={usePreUploader}
              />
            ))}
          </AnimatePresence>
          <SmallImageAddPlaceholder id={id!} />
        </div>
      ) : (
        <LargeImageDisplayCard
          fileList={fileList}
          handleRemoveImage={handleRemoveImage}
        />
      )}
      <input
        type="file"
        ref={inputRef}
        name={name}
        id={id}
        data-testid="uploader"
        onChange={handleImageUpload}
        multiple={multi}
        accept="image/*"
        hidden
      />
      {uploadedImages.map((image) => (
        <input
          type="hidden"
          key={image}
          name={`uploaded_${name}`}
          id={`uploaded_${id}`}
          value={image}
          onChange={() => {}}
        />
      ))}

      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

export default ImageListSelector;
