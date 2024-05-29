import { getCategories } from "../common/get-categories"
import { BASE_URL } from "../../config/urls"
import { constructImageUrl, deconstructImageUrl } from "@/lib/images"

export const productMapper = async (data: any) => {
    const categories = await getCategories()

    function convert(item: any) {
        return {
            ...item,
            category: getSubCategory(categories, item.category),
            tags: item.tags.map((tag: any) => ({ label: tag.name, value: tag.id })),
            images: constructImageUrl(item.images?.[0], true),
            deconstructed_images: deconstructImageUrl(item.images?.[0])
        }
    }

    if (Array.isArray(data)) {
        return data.map((product: any) => {
            return convert(product)
        })
    } else {
        return convert(data)
    }
}

const getSubCategory = (categories: any, id: number) => {
    const category = categories.find((category: any) => (category.options.map((o: any) => o.value)).includes(id))
    const subCategory = category ? category.options.find((o: any) => o.value === id) : null
    return subCategory
}