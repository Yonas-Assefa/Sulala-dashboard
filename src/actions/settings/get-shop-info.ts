'use server'

import { GET_SHOP_ACCOUNT } from "../../config/urls"
import { shopMapper } from "../mapper/shop-mapper"
import { getRequestHeaders } from "../../lib/helper"

export const getShopInfo = async () => {
    const response = await fetch(GET_SHOP_ACCOUNT, {
        method: 'GET',
        headers: getRequestHeaders(),
        cache: 'no-cache',
        next: {
            tags: ['shop-info-detail']
        }
    })
    const body = await response.json()

    console.log({ body })
    if (!response.ok || !body.success) {
        throw new Error(body.message || 'Failed to get shop info');
    }

    return shopMapper(body.data)
}