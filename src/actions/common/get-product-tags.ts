'use server'

import { PRODUCT_TAGS } from "../../config/urls"
import { getRequestHeaders, makeRequest } from "../../lib/helper"

export const getProductTags = async () => {
    const response = await fetch(PRODUCT_TAGS, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.results) {
        throw new Error(body.message || 'Failed to resend OTP');
    }

    return body.results?.map((tag: any) => {
        return {
            label: tag.name,
            value: tag.id
        }
    })
}