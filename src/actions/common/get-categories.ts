'use server'

import { CATEGORIES } from "../config/urls"
import { getRequestHeaders, makeRequest } from "../utils/helper"

export const getCategories = async () => {
    const response = await fetch(CATEGORIES, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.success) {
        throw new Error(body.message || 'Failed to resend OTP');
    }

    return body.data
}