"use client";
import React from "react";
import SummaryDescription from "../common/SummaryDescription";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import DateInput from "@/components/common/form/DateInput";
import ImageListSelector from "@/components/common/form/ImageListSelector";
import TextInput from "@/components/common/form/TextInput";
import CustomRadioWithConditionalInput from "@/components/common/form/RadioWithConditionalInput";
import budgetingOptions from "../../data/budgeting.json";
import destinationOptions from "../../data/destination.json";
import { createUpdatePromotion } from "@/actions/promotion/create-update-promotion";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { useFormState } from "react-dom";
import {
  BUDGETING_TYPE_CHOICES,
  DESTINATION_TYPE_CHOICES,
} from "../../data/discount-contants";
import { formatNumber as priceFormatter } from "@/utils/priceFormatter.util";
import { useParams, useSearchParams } from "next/navigation";
import { removePromotionBannerFile } from "@/actions/promotion/remove-promotion-banner-file";
import { convertToArray } from "@/utils/convertObjToArray";
import { useTranslations } from "next-intl";

type Props = {
  products: any;
  promotion: any;
};
function BannerAdsForm({ products, promotion }: Props) {
  const [campaignName, setCampaignName] = React.useState<string>();
  const [destinationType, setDestinationType] = React.useState<string>();
  const [shop, setShop] = React.useState<string>();
  const [items, setItems] = React.useState<string>();
  const [budgeting, setBudgeting] = React.useState<string>();
  const [budget, setBudget] = React.useState<string>();
  const [banners, setBanners] = React.useState<(File | string)[]>([]);
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");

  const searchParams = useSearchParams();
  const itemType = searchParams.get("type")?.toString() || "";

  const t = useTranslations("Promotion");

  const params = useParams();
  const actionType = params.action;

  const [formState, action] = useFormState(
    createUpdatePromotion,
    EMPTY_FORM_STATE,
  );

  useToastMessage(formState);
  useRedirectRoute(formState);

  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-6">
      <form
        action={action}
        className="col-span-2 flex flex-col gap-5 bg-white dark:bg-black text-black dark:text-white"
      >
        <div className="flex flex-col gap-5 bg-tertiary dark:bg-gray-700 rounded-[30px] p-8">
          <input
            type="text"
            hidden
            value="BANNER"
            name="promotion_type"
            id="promotion_type"
            onChange={() => {}}
          />
          <input
            type="text"
            hidden
            value={itemType}
            name="item_type"
            id="item_type"
            onChange={() => {}}
          />
          <input
            type="text"
            hidden
            value={actionType}
            name="action_type"
            id="action_type"
            onChange={() => {}}
          />
          <input
            type="text"
            hidden
            value={promotion?.id}
            name="item_id"
            id="item_id"
            onChange={() => {}}
          />
          <h3 className="font-semibold text-xl">{t("general_info")}</h3>
          <div className="max-w-[1300px] gap-5 flex flex-col">
            <TextInput
              id="campaign_name"
              name="campaign_name"
              defaultValue={promotion?.campaign_name}
              value={campaignName}
              setValue={setCampaignName}
              placeholder={t("enter_campaign_name")}
              label={t("campaign_name")}
              error={formState?.fieldErrors?.name?.[0]}
              required
            />
            {/* <TextAreaInput id='description' placeholder='Enter description/promotional quotes' label='Description/Promotional quotes'   /> */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <DateInput
                setValue={setStartDate}
                defaultValue={promotion?.start_date}
                label={t("start_date_&_time")}
                id="start_datetime"
                name="start_datetime"
                error={formState?.fieldErrors?.start_date?.[0]}
                required
              />
              <DateInput
                setValue={setEndDate}
                defaultValue={promotion?.end_date}
                label={t("end_date_&_time")}
                id="end_datetime"
                name="end_datetime"
                error={formState?.fieldErrors?.end_date?.[0]}
                required
              />
            </div>
            <div className="col-span-2">
              <ImageListSelector
                setValue={setBanners}
                defaultValues={convertToArray(promotion?.ad_files)}
                label={t("banner_ads")}
                id="ad_files"
                name="ad_files"
                error={formState?.fieldErrors?.files?.[0]}
                onDelete={{
                  action: removePromotionBannerFile,
                  formData: [
                    { key: "item_id", value: promotion?.id },
                    {
                      key: "file_path",
                      value: promotion?.deconstructed_ad_files,
                    },
                  ],
                }}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-tertiary dark:bg-gray-700 rounded-[30px] p-8">
          <div className="flex">
            <h3 className="font-semibold text-xl">{t("destination")}</h3>
            <span className="text-danger">
              *&nbsp;
              {/* <sup className="text-xs opacity-70">(required)</sup> */}
            </span>
          </div>
          <div className="max-w-[1300px] gap-6 flex flex-col">
            <CustomRadioWithConditionalInput
              data={destinationOptions}
              inputForEach={true}
              key={"destination-type"}
              id={"destination_type"}
              name={"destination_type"}
              setValue={setDestinationType}
              value={destinationType}
              defaultValue={promotion?.destination_type}
              error={formState?.fieldErrors?.promotional_discount_type?.[0]}
              childError={{
                products: formState?.fieldErrors?.products?.[0],
                shop: formState?.fieldErrors?.shop?.[0],
              }}
              childSetValue={{
                products: setItems,
                shop: setShop,
              }}
              childValue={{
                products: items,
                shop: shop,
              }}
              childOptions={{
                products: products,
              }}
              childDefaultValue={{
                products: promotion?.products,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-tertiary dark:bg-gray-700 rounded-[30px] p-8">
          <div className="flex">
            <h3 className="font-semibold text-xl">{t("budgeting")}</h3>
            <span className="text-danger">
              *&nbsp;
              {/* <sup className="text-xs opacity-70">(required)</sup> */}
            </span>
          </div>
          <div className="max-w-[1300px] gap-6 flex flex-col">
            <CustomRadioWithConditionalInput
              data={budgetingOptions}
              inputForEach={false}
              key={"budgeting"}
              id={"budgeting"}
              name={"budgeting"}
              setValue={setBudgeting}
              value={budgeting}
              defaultValue={promotion?.budgeting}
              error={formState?.fieldErrors?.budgeting?.[0]}
              childError={{ budget: formState?.fieldErrors?.budget?.[0] }}
              childSetValue={{ budget: setBudget }}
              childValue={{ budget: budget }}
              childDefaultValue={{ budget: promotion?.budget }}
            />
          </div>
        </div>
        <div className="flex flex-row fixed bottom-0 md:relative p-2 md:p-0">
          <PrimaryButton
            padding={"md"}
            name={t("pay_&_schedule")}
            type="submit"
          />
        </div>
      </form>
      <div className="col-span-1 bg-white dark:bg-black text-black dark:text-white flex flex-col gap-8">
        <div className="bg-tertiary dark:bg-gray-700 rounded-[30px] p-8 flex flex-col gap-5">
          <h3 className="font-semibold text-xl">{t("summary")}</h3>
          <SummaryDescription
            title={t("campaign_name")}
            description={campaignName}
          />
          <SummaryDescription
            title={t("start_date_&_time")}
            description={startDate}
          />
          <SummaryDescription
            title={t("end_date_&_time")}
            description={endDate}
          />
          <SummaryDescription
            title={t("banner")}
            description={
              banners.find((b) => b instanceof File)
                ? "unuploaded"
                : banners.length > 0
                  ? "uploaded."
                  : "no file selected"
            }
          />
          <SummaryDescription
            title={t("destination")}
            description={
              DESTINATION_TYPE_CHOICES.find(
                (ele) => ele.value == destinationType,
              )?.label
            }
          />
          {destinationType == "LIST_OF_PRODUCTS" && (
            <SummaryDescription title={t(itemType)} description={items} />
          )}
          <SummaryDescription
            title={t("budgeting")}
            description={
              BUDGETING_TYPE_CHOICES.find((ele) => ele.value == budgeting)
                ?.label
            }
          />
          <SummaryDescription
            title={t("budget")}
            description={priceFormatter(+(budget || 0))}
          />
        </div>
      </div>
    </div>
  );
}

export default BannerAdsForm;
