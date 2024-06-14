'use server'

import { FormState, toFormState } from "@/utils/formStateHelper"
import { UPDATE_SHOP_ACCOUNT } from "../../config/urls"
import { shopMapper } from "../mapper/shop-mapper"
import { getMultiPartRequestHeaders, getRequestHeaders, getResponseBody } from "../../lib/helper"
import { revalidatePath } from "next/cache"

export const deleteShopProfile = async (
    formData: FormData
) => {

    const response = await fetch(UPDATE_SHOP_ACCOUNT, {
        method: 'PATCH',
        headers: getMultiPartRequestHeaders(),
        body: formData
    })
    const body = await getResponseBody(response)

    if (!response.ok || !body.success) {
        throw new Error(body.message || 'Failed to delete shop profile');
    }

    revalidatePath('/dashboard/settings/shop-info')

    return toFormState('SUCCESS', 'Successfully deleted shop profile');
}