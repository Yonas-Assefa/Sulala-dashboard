"use client";
import { approveReject } from "@/actions/admin-manage/approve-reject-drivers";
import TextAreaInput from "@/components/common/form/TextAreaInput";
import TextInput from "@/components/common/form/TextInput";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { getoneFromArray } from "@/utils/getOneFromArray";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormState } from "react-dom";

type Props = {
  initialData: any;
};
function CustomerDetailForm({ initialData }: Props) {
  const t = useTranslations("Manage");
  const [fileFullScreen, setFileFullScreen] = React.useState(false);
  const [file, setfile] = React.useState<
    "profile_photo" | "license_front" | "license_back" | "id_front" | "id_back"
  >();
  const [status, setStatus] = React.useState<"APPROVE" | "REJECT">();

  const TABS = [
    "profile_photo",
    "license_front",
    "license_back",
    "id_front",
    "id_back",
  ];

  const [formState, action] = useFormState(approveReject, EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);

  const handleFileFullScreen = () => {
    setFileFullScreen(!fileFullScreen);
  };

  const handleStatusChange = () => {
    setStatus(status === "APPROVE" ? "REJECT" : "APPROVE");
  };

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-3">
      <div className="bg-tertiary dark:bg-gray-800 text-black dark:text-white col-span-2 p-8 rounded-[40px] flex flex-col gap-3">
        <h3 className="font-semibold text-xl">{t("customer_info")}</h3>
        <div className="max-w-[1300px] flex flex-col md:grid md:grid-cols-2 gap-3">
          <TextInput
            defaultValue={initialData?.first_name}
            disabled
            label={t("first_name")}
          />
          <TextInput
            defaultValue={initialData?.last_name}
            disabled
            label={t("last_name")}
          />
          <TextInput
            defaultValue={initialData?.email}
            disabled
            label={t("email_address")}
            type="email"
          />
          <TextInput
            defaultValue={initialData?.username}
            disabled
            label={t("username")}
            type="text"
          />
          <TextInput
            defaultValue={initialData?.phone_number}
            disabled
            label={t("phone_number")}
            type="text"
          />
          <TextInput
            defaultValue={initialData?.address}
            disabled
            label={t("address")}
            type="text"
          />
          <TextInput
            defaultValue={initialData?.license_number}
            disabled
            label={t("license_number")}
            type="text"
          />
        </div>
        <div className="bg-tertiary dark:bg-gray-600 col-span-2 p-8 rounded-[40px] flex flex-col gap-3">
          <h3 className="font-semibold text-xl">{t("driver_files")}</h3>
          <div className="flex flex-col md:flex-row gap-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setfile(tab as any);
                  setFileFullScreen(true);
                }}
                className="bg-tertiary dark:bg-gray-500 border-4 rounded-lg border-primary/50 w-full md:w-1/2 max-w-[1300px] h-[200px] flex flex-col justify-center items-center"
              >
                <img
                  src={initialData[tab]}
                  alt=""
                  className="w-1/2 h-1/2 object-contain"
                />
                <p className="text-center">{t(tab)}</p>
              </button>
            ))}
          </div>
          <div
            className={`${fileFullScreen ? "modal modal-open" : "hidden"}`}
            onClick={handleFileFullScreen}
          >
            <div className="overflow-scroll group/file relative border-4 rounded-lg active:border-primary/50 w-11/12 max-w-5xl h-[100vh]">
              <button
                className="bg-tertiary border-primary border rounded-md absolute top-0 right-0 tooltip"
                data-tip="make full screen"
              >
                <img
                  src={
                    fileFullScreen
                      ? "/icons/minimize.svg"
                      : "/icons/maximize.svg"
                  }
                  alt=""
                />
              </button>
              <iframe
                src={getoneFromArray(initialData[file as any])}
                allowFullScreen
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-tertiary dark:bg-gray-800 text-black dark:text-white p-8 rounded-[40px] flex flex-col gap-3">
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
          <div className="flex flex-col gap-3 text-black dark:text-white bg-white dark:bg-gray-600 p-4 rounded-lg">
            <h4 className="font-semibold ">{t("notify_the_user_via")}</h4>
            <div className="flex flex-row gap-3 text-sm">
              <div className="flex flex-row gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="notify_via"
                  value="phone"
                  id="phone"
                  className="radio"
                />
                <label htmlFor="phone">{t("phone")}</label>
              </div>
              <div className="flex flex-row gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="notify_via"
                  value="email"
                  id="email"
                  className="radio"
                />
                <label htmlFor="email">{t("email")}</label>
              </div>
            </div>
            {formState?.fieldErrors?.notify_via?.[0] && (
              <span className="text-xs text-danger">
                {formState?.fieldErrors?.notify_via?.[0]}
              </span>
            )}
          </div>
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

export default CustomerDetailForm;
