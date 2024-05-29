import { getCategories } from "../common/get-categories"
import { BASE_URL } from "../../config/urls"
import { constructImageUrl, deconstructImageUrl } from "@/lib/images"

export const shopMapper = async (data: any) => {
    const categories = await getCategories()
    function convert(item: any) {
        return {
            ...item,
            profile_photo: constructImageUrl(item.profile_photo, true),
            deconstructed_profile_photo: deconstructImageUrl(item.profile_photo),
            category: categories.find((category) => category.value === item.category)
        }
    }
    if (Array.isArray(data)) {
        return data.map((billing: any) => {
            return convert(billing)
        })
    } else {
        return convert(data)
    }
}