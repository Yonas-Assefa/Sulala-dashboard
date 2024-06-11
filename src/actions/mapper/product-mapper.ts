import { getCategories } from "../common/get-categories";
import { BASE_URL } from "../../config/urls";
import { constructImageUrl } from "@/lib/images";

export const productMapper = async (data: any) => {
  const categories = await getCategories();
  if (Array.isArray(data)) {
    return data.map((product: any) => {
      return {
        ...product,
        category: categories.find((category: any) =>
          category.options.map((o: any) => o.value).includes(product.category)
        )?.label,
        category_value: product.category,
        images: constructImageUrl(product.images, true),
      };
    });
  } else {
    return {
      ...data,
      category: getSubCategory(categories, data.category),
      category_value: data.category,
      tags: data.tags.map((tag: any) => ({ label: tag.name, value: tag.id })),
      images: constructImageUrl(data.images, true)
    };
  }
};

const getSubCategory = (categories: any, id: number) => {
  const category = categories.find((category: any) =>
    category.options.map((o: any) => o.value).includes(id)
  );
  const subCategory = category
    ? category.options.find((o: any) => o.value === id)
    : null;
  return subCategory;
};

const getCategoryLabel = (
  categories: any,
  id: number,
  returnArray?: boolean
) => {
  const category = categories.find((category: any) =>
    category.options.map((o: any) => o.value).includes(id)
  );
  if (!returnArray) {
    const category_label = category
      ? `${category.label} / ${category.options.find((o: any) => o.value === id).label
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
