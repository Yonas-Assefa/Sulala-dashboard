'use server'

import { PROMOTIONS } from "../../config/urls"
import { promotionMapper } from "../mapper/promotion-mapper"
import { getRequestHeaders } from "../../lib/helper"

export const getPromotions = async () => {
    console.log({ PROMOTIONS })
    const response = await fetch(PROMOTIONS, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.data) {
        throw new Error(body.message || 'Failed to get promotions');
    }

    console.log({ body })
    return promotionMapper(body.data)
}