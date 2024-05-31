'use server'

import { PROMOTIONS } from "../../config/urls"
import { promotionMapper } from "../mapper/promotion-mapper"
import { Fetch, getRequestHeaders, getResponseErrorMessage } from "../../lib/helper"
import { notFound } from "next/navigation"

type Args = {
    search: string | undefined
}

export const getPromotions = async (formData: FormData) => {
    const search = formData.get('search') || ''
    const filter = (formData.get('filter') || '').toString()?.toUpperCase()
    const status = filter == 'ALL' ? '' : filter

    const sort_by = formData.get('sort_by') || ''
    const sort = formData.get('sort') || ''

    let ordering = ''
    if (sort_by && sort_by == 'oldest') ordering += '-'
    if (sort) ordering += sort

    const search_type = formData.get('search_type') || ''

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
        }
    })
    const body = await response.json()

    if (!response.ok || !body.results) {
        throw new Error(getResponseErrorMessage(body.message) || 'Failed to get promotions');
    }
    return promotionMapper({ data: body.results, tableSearch: search_type == 'table_search' })
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
    return promotionMapper({ data: body.data })
}