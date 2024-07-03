"use client";
import { createUpdateProduct } from "@/actions/products/create-update-product";
import ImageListSelector from "@/components/common/form/ImageListSelector";
import RadioInput from "@/components/common/form/RadioInput";
import SelectInput from "@/components/common/form/SelectInput";
import TextAreaInput from "@/components/common/form/TextAreaInput";
import TextInput from "@/components/common/form/TextInput";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import React from "react";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";
import TagInput from "@/components/common/form/TagInput";
import WeightVolumeInput from "@/components/common/form/WeightVolumeInput";
import { deleteProductImage } from "@/actions/products/delete-product-image";
import { deconstructImageUrl } from "@/lib/images";

type Props = {
  categoryLists: any;
  // productTags: any
  initialValue: any;
  tab: string;
  animals: any;
  brands: any;
};
function ProductForm({
  categoryLists,
  initialValue,
  tab,
  animals,
  brands,
}: Props) {
  const [formState, action] = useFormState(
    createUpdateProduct,
    EMPTY_FORM_STATE,
  );

  useToastMessage(formState);
  useRedirectRoute(formState);

  const data = categoryLists;

  const productStatusOptions = [
    { label: "New", value: "NEW" },
    { label: "Active", value: "ACTIVE" },
    { label: "Draft", value: "DRAFT" },
    { label: "Archived", value: "ARCHIVED" },
  ];

  const t = useTranslations("Products");

  return (
    <form action={action} className="flex flex-col gap-4">
      <input
        type="text"
        name="tab"
        id="tab"
        value={tab}
        onChange={() => {}}
        hidden
      />
      <input
        type="text"
        name="item"
        id="item"
        value={initialValue?.id}
        onChange={() => {}}
        hidden
      />
      <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-6">
        <div className="col-span-2">
          <div className="flex flex-col gap-5 p-8 bg-tertiary dark:bg-gray-700 rounded-[30px]">
            <h3 className="font-semibold text-xl">{t("general_info")}</h3>
            <div className="flex flex-col md:grid md:grid-cols-2 max-w-[1300px] gap-5">
              <TextInput
                id="product_name"
                name="product_name"
                error={formState.fieldErrors?.title?.[0]}
                placeholder={t("enter_product_name")}
                label={t("title")}
                defaultValue={initialValue?.title}
              />
              <TextInput
                id="quantity"
                name="quantity"
                type="number"
                placeholder={t("enter_quantity")}
                label={t("quantity")}
                error={formState.fieldErrors?.inventory?.[0]}
                defaultValue={initialValue?.inventory}
              />
              <div className="col-span-2">
                <TextAreaInput
                  id="description"
                  name="description"
                  placeholder={t("enter_description")}
                  label={t("description")}
                  error={formState.fieldErrors?.description?.[0]}
                  defaultValue={initialValue?.description}
                />
              </div>
              <TextInput
                id="price"
                name="price"
                type="number"
                placeholder={t("enter_price")}
                label={t("price")}
                error={formState.fieldErrors?.price?.[0]}
                defaultValue={initialValue?.price}
              />
              <WeightVolumeInput
                label="Weight / Volume"
                id="weight_or_volume"
                name="weight_or_volume"
                error={
                  formState.fieldErrors?.weight?.[0] ||
                  formState.fieldErrors?.volume?.[0] ||
                  formState.fieldErrors?.unit?.[0]
                }
                defaultValue={initialValue?.weight || initialValue?.volume}
                unit={initialValue?.unit}
              />
              <TextInput
                id="pieces_per_pack"
                name="pieces_per_pack"
                type="number"
                placeholder={t("enter_pieces_per_pack")}
                label={t("pieces_per_pack")}
                error={formState.fieldErrors?.pieces_per_pack?.[0]}
                defaultValue={initialValue?.pieces_per_pack}
              />
              <TextAreaInput
                id="benefits"
                name="benefits"
                placeholder="Enter benefits of the product"
                label="Benefits"
                error={formState.fieldErrors?.benefits?.[0]}
                defaultValue={initialValue?.benefits}
                className="col-span-2"
              />
              <div className="col-span-2">
                <ImageListSelector
                  id="product_images"
                  name="product_images"
                  multi
                  error={formState.fieldErrors?.images?.[0]}
                  usePreUploader
                  defaultValues={initialValue?.images}
                  onDelete={{
                    action: deleteProductImage,
                    formData: [
                      { key: "item_id", value: initialValue?.id },
                      {
                        key: "image",
                        value: (url: string) => deconstructImageUrl(url),
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-white dark:bg-black flex flex-col gap-8">
          <RadioInput
            label={t("status")}
            id="status"
            name="status"
            options={productStatusOptions}
            error={formState.fieldErrors?.status?.[0]}
            defaultValue={initialValue?.status}
          />
          <div className="bg-tertiary dark:bg-gray-700 rounded-[30px] p-8 flex flex-col gap-5">
            <h3 className="font-semibold text-xl">
              {t("product_organization")}
            </h3>
            <SelectInput
              id="category"
              name="category"
              label={t("category")}
              data={data}
              error={formState.fieldErrors?.category?.[0]}
              defaultValue={initialValue?.category_value}
              nested
            />
          </div>
          <div className="bg-tertiary dark:bg-gray-700 rounded-[30px] p-8 flex flex-col gap-5">
            <h3 className="font-semibold text-xl">
              {t("animal_and_branding")}
            </h3>
            <SelectInput
              searchable
              id="animal"
              name="animal"
              label={t("animals")}
              data={animals}
              multi={true}
              error={formState.fieldErrors?.animals?.[0]}
              defaultValue={initialValue?.animals}
            />
            <SelectInput
              searchable
              id="brand"
              name="brand"
              label={t("brand")}
              data={brands}
              error={formState.fieldErrors?.brand?.[0]}
              defaultValue={initialValue?.brand}
              multi={false}
            />
          </div>
          <div className="bg-tertiary dark:bg-gray-700 rounded-[30px] p-8 flex flex-col gap-5">
            <h3 className="font-semibold text-xl">{t("product_promotion")}</h3>
            <SelectInput
              id="campaign"
              label={t("promo_campaign_(optional)")}
              multi={false}
              nested={true}
            />
            {/* <TextAreaInput id='description' placeholder='Enter tags for the product' label='Tags' /> */}
            <TagInput
              id="product_tag"
              name="product_tag"
              label={t("tags")}
              error={formState.fieldErrors?.tags?.[0]}
              defaultValue={initialValue?.tags}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <PrimaryButton padding={"md"} name={t("save")} type="submit" />
      </div>
    </form>
  );
}

export default ProductForm;
