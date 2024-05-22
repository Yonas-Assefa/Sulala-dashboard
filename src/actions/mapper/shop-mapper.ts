import { getCategories } from "../common/get-categories"
import { BASE_URL } from "../../config/urls"

export const shopMapper = async (data: any) => {
    const categories = await getCategories()
    if (Array.isArray(data)) {
        return data.map((billing: any) => {
            return {
                ...billing,
                profile_photo: billing.profile_photo?.length > 0 ?
                    `${BASE_URL}${billing.profile_photo}` : undefined,
                category: categories.find((category) => category.value === billing.category)
            }
        })
    } else {
        return {
            ...data,
            profile_photo: data.profile_photo?.length > 0 ?
                `${BASE_URL}${data.profile_photo}` : undefined,
            category: categories.find((category) => category.value === data.category)
        }
    }
}