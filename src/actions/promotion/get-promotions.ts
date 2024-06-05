'use server'

import { PROMOTIONS } from "../../config/urls"
import { promotionMapper } from "../mapper/promotion-mapper"
import { Fetch, getRequestHeaders, getResponseErrorMessage } from "../../lib/helper"
import { notFound } from "next/navigation"
import { getFilterSortOrdering } from "@/lib/table"

type Args = {
    search: string | undefined
}

export const getPromotions = async (formData: FormData) => {
    const { search, status, ordering, page } = getFilterSortOrdering(formData)


    const search_type = formData.get('search_type') || ''

    // TEMP
    return []

    const response = await Fetch({
        url: PROMOTIONS,
        method: 'GET',
        headers: getRequestHeaders(),
        next: {
            tags: ['promotions']
        },
        params: {
            search,
            status,
            ordering,
            page,
        }
    })
    const body = await response.json()

    if (!response.ok || !body.results) {
        throw new Error(getResponseErrorMessage(body.message) || 'Failed to get promotions');
    }
    return promotionMapper({ data: body.results, tableSearch: search_type == 'table_search' })
}

export const getOnePromotion = async (promotion_id: string) => {

    // TEMP
    return {}

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
    return promotionMapper({ data: body.data })
}