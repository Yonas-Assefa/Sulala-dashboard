"use client";
import { approveReject } from "@/actions/admin-manage/approve-reject-shops";
import DateInput from "@/components/common/form/DateInput";
import ProfileImagePicker from "@/components/common/form/ProfileImagePicker";
import RadioInput from "@/components/common/form/RadioInput";
import TextAreaInput from "@/components/common/form/TextAreaInput";
import TextInput from "@/components/common/form/TextInput";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormState } from "react-dom";

type Props = {
  initialData: any;
};
function VendorDetailForm({ initialData }: Props) {
  const [fileFullScreen, setFileFullScreen] = React.useState(false);
  const [file, setfile] = React.useState<"tax" | "cert">("tax");
  const [status, setStatus] = React.useState<"APPROVE" | "REJECT">();

  const t = useTranslations("Manage");

  const handleFileFullScreen = () => {
    setFileFullScreen(!fileFullScreen);
  };

  const handleStatusChange = () => {
    setStatus(status === "APPROVE" ? "REJECT" : "APPROVE");
  };

  const [formState, action] = useFormState(approveReject, EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-3">
      <div className="bg-tertiary col-span-2 p-8 rounded-[40px] flex flex-col gap-3">
        <h3 className="font-semibold text-xl">{t("vendor_info")}</h3>
        <div className="max-w-[1300px] grid grid-cols-1 md:grid-cols-2 gap-3">
          <ProfileImagePicker
            disabled
            defaultValue={initialData?.profile_photo || "/images/no-image.png"}
            id="profile_image"
            name="profile_image"
          />
          <TextInput
            defaultValue={initialData?.vendor_name}
            disabled
            label={t("vendor_name")}
            name="name"
          />
          <TextInput
            defaultValue={initialData?.vendor_email}
            disabled
            label={t("vendor_email")}
            name="email"
            type="email"
          />
          <TextInput
            defaultValue={initialData?.phone_number}
            disabled
            label={t("vendor_phone_number")}
            name="phone number"
          />
        </div>
      </div>
      <div className="bg-tertiary p-8 rounded-[40px] flex flex-col gap-3">
        <h3 className="font-semibold text-xl">{t("vendor_shop_info")}</h3>
        <div className="max-w-[1300px] grid grid-cols-1 gap-3">
          <TextInput
            defaultValue={initialData?.shop_name}
            disabled
            label={t("vendor_shop_name")}
            name="shop_name"
          />
          <TextInput
            defaultValue={initialData?.shop_categories}
            disabled
            label={t("vendor_shop_categories")}
            name="category"
          />
          <DateInput
            defaultValue={initialData?.date}
            disabled
            label={t("vendor_shop_registration_date")}
            name="registration_date"
          />
          <TextInput
            defaultValue={initialData?.shop_address}
            disabled
            label={t("vendor_address")}
            name="address"
          />
        </div>
      </div>
      <div className="bg-tertiary col-span-2 p-8 rounded-[40px] flex flex-col gap-3">
        <h3 className="font-semibold text-xl">{t("vendor_files")}</h3>
        <div className="flex flex-row gap-4">
          <button
            className={
              file == "tax"
                ? "font-semibold bg-primary text-white p-1 px-3 rounded-md"
                : "font-semibold bg-secondary text-white p-1 px-3 rounded-md"
            }
            onClick={() => setfile("tax")}
          >
            {t("tax_file")}
          </button>
          <button
            className={
              file == "cert"
                ? "font-semibold bg-primary text-white p-1 px-3 rounded-md"
                : "font-semibold bg-secondary text-white p-1 px-3 rounded-md"
            }
            onClick={() => setfile("cert")}
          >
            {t("certificate_file")}
          </button>
        </div>
        <div
          className={`${fileFullScreen ? "modal modal-open" : "max-w-[1300px]"}`}
          onClick={handleFileFullScreen}
        >
          <div className="overflow-scroll group/file relative border-4 rounded-lg active:border-primary/50 w-11/12 max-w-5xl h-[100vh]">
            <button
              className="bg-tertiary border-primary border rounded-md absolute top-0 right-0 tooltip"
              data-tip="make full screen"
            >
              <img
                src={
                  fileFullScreen ? "/icons/minimize.svg" : "/icons/maximize.svg"
                }
                alt=""
              />
            </button>
            <iframe
              src={
                file == "tax"
                  ? initialData.shop_tax_forms
                  : initialData.shop_certificates
              }
              allowFullScreen
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
      <div className="bg-tertiary p-8 rounded-[40px] flex flex-col gap-3">
        <h3 className="font-semibold text-xl">{t("vendor_approval_action")}</h3>
        <form action={action} className="flex flex-col gap-4">
          <input
            type="text"
            value={initialData.id}
            name="vendor_id"
            id="vendor_id"
            onChange={() => {}}
            hidden
          />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-1">
                <input
                  type="radio"
                  name="status"
                  value="APPROVE"
                  id="approve"
                  className="radio radio-warning"
                  onChange={handleStatusChange}
                  checked={status == "APPROVE"}
                />
                <label
                  htmlFor="approve"
                  className={`cursor-pointer ${status == "APPROVE" && "font-semibold text-warning drop-shadow-md"}`}
                >
                  {t("approve")}
                </label>
              </div>
              <div className="flex flex-row gap-1">
                <input
                  type="radio"
                  name="status"
                  value="REJECT"
                  id="reject"
                  className="radio radio-error"
                  onChange={handleStatusChange}
                  checked={status == "REJECT"}
                />
                <label
                  htmlFor="reject"
                  className={`cursor-pointer ${status == "REJECT" && "font-semibold text-error drop-shadow-md"}`}
                >
                  {t("reject")}
                </label>
              </div>
              {formState?.fieldErrors?.status?.[0] && (
                <span className="text-xs text-danger">
                  {formState?.fieldErrors?.status?.[0]}
                </span>
              )}
            </div>
            {status == "REJECT" && (
              <TextAreaInput
                label={t("reason")}
                placeholder={t("type_here")}
                name="reason"
                id="reason"
                required
                error={formState?.fieldErrors?.reason?.[0]}
              />
            )}
          </div>
          <div className="">
            <PrimaryButton disabled={!status?.length} padding="md" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default VendorDetailForm;
