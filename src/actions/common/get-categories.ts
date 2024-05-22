'use server'

import { CATEGORIES } from "../config/urls"
import { formatCategory, getRequestHeaders, makeRequest } from "../utils/helper"

export const getCategories = async () => {
    const response = await fetch(CATEGORIES, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.results) {
        throw new Error(body.message || 'Failed to resend OTP');
    }
    const formatedCategory = formatCategory(body.results)
    return formatedCategory
}