'use server'

import { notFound } from "next/navigation"
import { CATEGORIES } from "../../config/urls"
import { formatCategory, getRequestHeaders, makeRequest } from "../../lib/helper"

export const getCategories = async () => {
    const response = await fetch(CATEGORIES, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.results) {
        if (response.status === 404) {
            notFound()
        }
        throw new Error(body.message || 'Failed to resend OTP');
    }
    const formatedCategory = formatCategory(body.results)
    return formatedCategory
}