'use server'

import { PROMOTIONS } from "../../config/urls"
import { promotionMapper } from "../mapper/promotion-mapper"
import { getRequestHeaders } from "../../lib/helper"
import { notFound } from "next/navigation"

export const getPromotions = async () => {
    const response = await fetch(PROMOTIONS, {
        method: 'GET',
        headers: getRequestHeaders(),
        next: {
            tags: ['promotions']
        }
    })
    const body = await response.json()

    if (!response.ok || !body.results) {
        throw new Error(body.message || 'Failed to get promotions');
    }
    return promotionMapper(body.results)
}

export const getOnePromotion = async (promotion_id: string) => {
    const response = await fetch(`${PROMOTIONS}${promotion_id}/`, {
        method: 'GET',
        headers: getRequestHeaders(),
        next: {
            tags: [`promotion-detail-${promotion_id}`]
        }
    })
    const body = await response.json()

    if (!response.ok || !body.data) {
        if (response.status === 404) {
            notFound()
        }
        throw new Error(body.message || 'Failed to get promotions');
    }
    return promotionMapper(body.data)
}