import { getCategories } from "../common/get-categories";
import { constructImageUrl } from "@/lib/images";
import { animalMapper } from "./animal-mapper";

type TProduct = {
  id: number;
  name: string;
  category: number;
  images: string[];
  animal_products: any[];
  status: string;
  promotion_campaigns: any[];
  tags: string[];
};

export const productMapper = async (
  // data: TProduct[] | TProduct,
  data: any,
  manyImages?: boolean,
) => {
  const categories = await getCategories();
  if (Array.isArray(data)) {
    return data.map((product: any) => {
      return {
        ...product,
        category: categories.find((category: any) =>
          category.options.map((o: any) => o.value).includes(product.category),
        )?.label,
        category_value: product.category,
        images: constructImageUrl(product.images, !manyImages),
        animals: (animalMapper(product.animal_products) as []).map(
          (animal: any) => animal.value,
        ),
        is_promoted: product.promotion_campaigns.length > 0,
        is_promote_disabled: product.status !== "ACTIVE",
      };
    });
  } else {
    return {
      ...data,
      category: getSubCategory(categories, data.category),
      category_value: data.category,
      tags: data.tags,
      images: constructImageUrl(data.images, !manyImages),
      animals: (animalMapper(data.animal_products) as []).map(
        (animal: any) => animal.value,
      ),
    };
  }
};

const getSubCategory = (categories: any, id: number) => {
  const category = categories.find((category: any) =>
    category.options.map((o: any) => o.value).includes(id),
  );
  const subCategory = category
    ? category.options.find((o: any) => o.value === id)
    : null;
  return subCategory;
};

const getCategoryLabel = (
  categories: any,
  id: number,
  returnArray?: boolean,
) => {
  const category = categories.find((category: any) =>
    category.options.map((o: any) => o.value).includes(id),
  );
  if (!returnArray) {
    const category_label = category
      ? `${category.label} / ${
          category.options.find((o: any) => o.value === id).label
        }`
      : "";
    return category_label;
  } else {
    const category_label = category
      ? [
          category.label,
          category.options.find((o: any) => o.value === id).label,
        ]
      : [];
    return category_label;
  }
};
