"use client";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import SummaryDescription from "../common/SummaryDescription";
import DateInput from "@/components/common/form/DateInput";
import ImageListSelector from "@/components/common/form/ImageListSelector";
import CustomRadioWithConditionalInput from "@/components/common/form/RadioWithConditionalInput";
import CustomMultiSelectInput from "@/components/common/form/SelectInput";
import TextAreaInput from "@/components/common/form/TextAreaInput";
import TextInput from "@/components/common/form/TextInput";
import { formatNumber as priceFormatter } from "@/utils/priceFormatter.util";
import { formatNumber as percentFormatter } from "@/utils/percentFormatter.util";
import promotionDiscountOptions from "../../data/promotional-discount-type.json";
import budgetingOptions from "../../data/budgeting.json";
import {
  BUDGETING_TYPE_CHOICES,
  DISCOUNT_TYPE_CHOICES,
} from "../../data/discount-contants";
import { createUpdatePromotion } from "@/actions/promotion/create-update-promotion";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { useFormState } from "react-dom";
import { formatPiece } from "@/utils/pieceFormatter.util";
import { convertToArray } from "@/utils/convertObjToArray";
import { useParams, useSearchParams } from "next/navigation";
import { removePromotionBannerFile } from "@/actions/promotion/remove-promotion-banner-file";
import { useTranslations } from "next-intl";

type Props = {
  products: any;
  promotion: any;
};
function ProductDiscountAdsForm({ products, promotion }: Props) {
  const [campaignName, setCampaignName] = React.useState<string>("");
  const [item, setItem] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [promoDiscountType, setPromoDiscountType] = React.useState<string>("");
  const [discount, setDiscount] = React.useState<any>();
  const [limitedPrice, setLimitedPrice] = React.useState<any>();
  const [cartTotal, setCartTotal] = React.useState<any>();
  const [budgeting, setBudgeting] = React.useState<string>();
  const [budget, setBudget] = React.useState<string>();
  const [banners, setBanners] = React.useState<(File | string)[]>([]);

  const t = useTranslations("Promotion");

  const searchParams = useSearchParams();
  const itemType = searchParams.get("type")?.toString() || "";

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
            value="DISCOUNT"
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
              value={campaignName}
              defaultValue={promotion?.campaign_name}
              setValue={setCampaignName}
              placeholder={t("enter_campaign_name")}
              label={t("campaign_name")}
              error={formState?.fieldErrors?.name?.[0]}
              required
            />
            <CustomMultiSelectInput
              data={products}
              value={item}
              setValue={setItem}
              id={itemType}
              name={itemType}
              label={t(
                itemType == "product" ? "products_list" : "services_list",
              )}
              defaultValue={promotion?.[`${itemType}s`]}
              // defaultValue={[9, 10]}
              placeholder={t(
                itemType == "product" ? "select_products" : "select_services",
              )}
              multi
              withImage={true}
              error={formState?.fieldErrors?.[`${itemType}s`]?.[0]}
              required
            />
            <TextAreaInput
              value={description}
              setValue={setDescription}
              defaultValue={promotion?.description}
              id="description"
              name="description"
              placeholder={t("enter_description/promotional_quote")}
              label={t("description/promotional_quote")}
              error={formState?.fieldErrors?.description?.[0]}
              required
            />
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
            <h3 className="font-semibold text-xl">
              {t("promotional_discount_type")}
            </h3>
            <span className="text-danger">
              *&nbsp;
              {/* <sup className="text-xs opacity-70">(required)</sup> */}
            </span>
          </div>
          <div className="max-w-[1300px] gap-6 flex flex-col">
            <CustomRadioWithConditionalInput
              data={promotionDiscountOptions}
              inputForEach={true}
              key={"promo-discount-type"}
              id={"promo_discount_type"}
              name={"promo_discount_type"}
              setValue={setPromoDiscountType}
              value={promoDiscountType}
              defaultValue={promotion?.promotional_discount_type}
              error={formState?.fieldErrors?.promotional_discount_type?.[0]}
              childError={{
                discount: formState?.fieldErrors?.discount?.[0],
                limited_price: formState?.fieldErrors?.limited_price?.[0],
                cart_total: formState?.fieldErrors?.cart_total?.[0],
              }}
              childDisabled={{
                // TO FIX: This is a temporary fix to disable the input fields
                limited_price: !(
                  item?.trim()?.split(",")?.filter(Boolean).length == 1
                ),
              }}
              childSetValue={{
                discount: setDiscount,
                limited_price: setLimitedPrice,
                cart_total: setCartTotal,
              }}
              childValue={{
                discount: discount,
                limited_price: limitedPrice,
                cart_total: cartTotal,
              }}
              childDefaultValue={{
                discount: promotion?.discount,
                limited_price: promotion?.limitedPrice,
                cart_total: promotion?.cartTotal,
              }}
              required
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
            title={t(itemType == "product" ? "product" : "service")}
            description={item}
          />
          <SummaryDescription
            title={t("description")}
            description={description}
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
                ? t("not_uploaded")
                : banners.length > 0
                  ? t("uploaded")
                  : t("no_file_selected")
            }
          />
          <SummaryDescription
            title={t("promotional_discount_type")}
            description={
              DISCOUNT_TYPE_CHOICES.find(
                (ele) => ele.value == promoDiscountType,
              )?.label
            }
          />
          {promoDiscountType === "PERCENTAGE_OFF" && (
            <SummaryDescription
              title={t("budgeting")}
              description={percentFormatter(+discount / 100 || 0)}
            />
          )}
          {promoDiscountType === "LIMITED_PRICE" && (
            <SummaryDescription
              title={t("budget")}
              description={priceFormatter(+limitedPrice || 0)}
            />
          )}
          {promoDiscountType === "PERCENTAGE_OFF_THE_MINIMUM_CART_SIZE" && (
            <>
              <SummaryDescription
                title={t("discount_amount")}
                description={priceFormatter(+discount || 0)}
              />
              <SummaryDescription
                title={t("cart_total")}
                description={formatPiece(+cartTotal || 0)}
              />
            </>
          )}
          {/* <SummaryDescription title='Destination' description='List of products' /> */}
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

export default ProductDiscountAdsForm;
