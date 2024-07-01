import { getCategories } from "../common/get-categories";
import { constructImageUrl, deconstructImageUrl } from "@/lib/images";

type TManageShops = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  shops: {
    id: number;
    name: string;
    legal_address: string;
    profile_photo: string;
    certificates: string[];
    tax_forms: string[];
    categories: string[];
  }[];
  date_joined: string;
};

export const manageShopsMapper = async (
  data: TManageShops[] | TManageShops,
) => {
  const categories = await getCategories();
  function convert(item: any) {
    if (!item) return {};
    return {
      // ...item,
      profile_photo: constructImageUrl(item.shops?.[0]?.profile_photo, true),
      deconstructed_profile_photo: deconstructImageUrl(
        item.shops?.[0]?.profile_photo,
      ),
      vendor_name: (item.first_name || "") + " " + (item.last_name || ""),
      vendor_email: item.email,
      phone_number: item.phone_number || "N/A",
      id: item.id,
      shop_categories: categories
        .filter((category) =>
          item.shops?.[0]?.categories?.includes(category.value),
        )
        .map((category) => category.label)
        .join(", "),
      shop_name: item.shops?.[0]?.name,
      shop_address: item.shops?.[0]?.legal_address,
      shop_certificates: constructImageUrl(item.shops?.[0]?.certificates, true),
      deconstructed_shop_certificates: deconstructImageUrl(
        item.shops?.[0]?.certificates,
      ),
      shop_tax_forms: constructImageUrl(item.shops?.[0]?.tax_forms, true),
      deconstructed_shop_tax_forms: deconstructImageUrl(
        item.shops?.[0]?.tax_forms,
      ),
      date: new Date(item.date_joined).toLocaleDateString(),
    };
  }
  if (Array.isArray(data)) {
    return data.map((shop: any) => {
      return convert(shop);
    });
  } else {
    return convert(data);
  }
};
