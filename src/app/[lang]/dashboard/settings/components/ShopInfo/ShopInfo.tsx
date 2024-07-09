"use client";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import TextAreaInput from "@/components/common/form/TextAreaInput";
import TextInput from "@/components/common/form/TextInput";
import React from "react";
import ProfileImagePicker from "@/components/common/form/ProfileImagePicker";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { useFormState } from "react-dom";
import { updateShopInfo } from "@/actions/settings/update-shop-info";
import SocialMediaInput from "@/components/common/form/SocialMediaInput";
import SelectInput from "@/components/common/form/SelectInput";
import { useTranslations } from "next-intl";
import GeoLocationInput from "@/components/common/form/GeoLocationInput";

type Props = {
  categories: any;
  shopInfo: any;
};
function ShopInfo({ categories, shopInfo }: Props) {
  const [formState, action] = useFormState(updateShopInfo, EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);

  const t = useTranslations("Settings.ShopInfo");

  return (
    <form action={action} className="mt-4 w-full flex flex-col gap-8">
      <ProfileImagePicker
        id="profile_image"
        name="profile_image"
        error={formState?.fieldErrors?.profile_photo?.[0]}
        defaultValue={shopInfo.profile_photo}
      />
      <div className="md:grid flex flex-col md:grid-cols-2 max-w-[1300px] gap-5">
        <TextInput
          id="shop_name"
          name="shop_name"
          placeholder={t("shop_name")}
          label={t("shop_name")}
          error={formState?.fieldErrors?.name?.[0]}
          defaultValue={shopInfo.name}
        />
        <SelectInput
          id="categories"
          name="categories"
          placeholder={t("categories")}
          label={t("categories")}
          error={formState?.fieldErrors?.category?.[0]}
          data={categories}
          defaultValue={shopInfo.categories}
          multi
        />
        <GeoLocationInput
          id="legal_address"
          name="legal_address"
          placeholder={t("legal_address")}
          label={t("legal_address")}
          error={formState?.fieldErrors?.legal_address?.[0]}
          defaultValue={shopInfo.legal_address}
        />
        <TextInput
          id="website"
          name="website"
          placeholder={t("website")}
          label={t("website")}
          error={formState?.fieldErrors?.website?.[0]}
          defaultValue={shopInfo.website}
        />
        <div className="col-span-2">
          <TextAreaInput
            id="description"
            name="description"
            placeholder={t("shop_description")}
            label={t("shop_description")}
            error={formState?.fieldErrors?.description?.[0]}
            defaultValue={shopInfo.description}
          />
        </div>
      </div>

      <div className="max-w-[400px] flex flex-col items-start gap-5">
        <h5 className="font-[500] text-lg">{t("social_links")}</h5>
        <div className="flex flex-col gap-4">
          <SocialMediaInput
            socialMedia="instagram"
            error={formState?.fieldErrors?.instagram?.[0]}
            defaultValue={shopInfo.instagram}
          />
          <SocialMediaInput
            socialMedia="facebook"
            error={formState?.fieldErrors?.facebook?.[0]}
            defaultValue={shopInfo.facebook}
          />
        </div>
        <div className="mt-5">
          <PrimaryButton padding={"md"} name={t("save")} type="submit" />
        </div>
      </div>
    </form>
  );
}

export default ShopInfo;
