'use server'

import { FormState, toFormState } from "@/utils/formStateHelper"
import { UPDATE_SHOP_ACCOUNT } from "../config/urls"
import { shopMapper } from "../mapper/shop-mapper"
import { getMultiPartRequestHeaders, getRequestHeaders } from "../../lib/helper"

export const deleteShopProfile = async (
    formState: FormState,
    formData: FormData
) => {

    const response = await fetch(UPDATE_SHOP_ACCOUNT, {
        method: 'PATCH',
        headers: getMultiPartRequestHeaders(),
        body: formData
    })
    const body = await response.json()

    if (!response.ok || !body.success) {
        throw new Error(body.message || 'Failed to delete shop profile');
    }

    return toFormState('SUCCESS', 'Successfully deleted shop profile');
}