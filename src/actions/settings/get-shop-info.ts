'use server'

import { GET_SHOP_ACCOUNT } from "../config/urls"
import { getRequestHeaders } from "../utils/helper"

export const getShopInfo = async () => {
    const response = await fetch(GET_SHOP_ACCOUNT, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.success) {
        throw new Error(body.message || 'Failed to get shop info');
    }

    return body.data
}