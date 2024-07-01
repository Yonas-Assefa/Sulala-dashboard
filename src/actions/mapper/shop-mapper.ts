import { getCategories } from "../common/get-categories";
import { constructImageUrl } from "@/lib/images";

type TShop = {
  id: number;
  name: string;
  profile_photo: string;
  categories: string[];
};

export const shopMapper = async (data: TShop | TShop[]) => {
  const categories = await getCategories();
  if (Array.isArray(data)) {
    return data.map((shop: TShop) => {
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
