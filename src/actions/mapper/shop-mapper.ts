import { getCategories } from "../common/get-categories";
import { BASE_URL } from "../../config/urls";
import { constructImageUrl } from "@/lib/images";

export const shopMapper = async (data: any) => {
  const categories = await getCategories();
  if (Array.isArray(data)) {
    return data.map((shop: any) => {
      return {
        ...shop,
        profile_photo:
          shop.profile_photo?.length > 0
            ? constructImageUrl(shop.profile_photo, true)
            : undefined,
        categories: categories.filter((category) =>
          shop.categories.includes(category.value),
        ),
      };
    });
  } else {
    return {
      ...data,
      profile_photo:
        data.profile_photo?.length > 0
          ? constructImageUrl(data.profile_photo, true)
          : undefined,
      categories: categories.filter((category) =>
        data.categories.includes(category.value),
      ),
    };
  }
};
