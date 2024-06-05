'use server'

import { GET_VENDOR_ACCOUNT as GET_VENDOR_PROFILE, PRODUCTS } from "../../config/urls"
import { getRequestHeaders, makeRequest } from "../../lib/helper"

export const getPersonalInfo = async () => {


    const response = await fetch(GET_VENDOR_PROFILE, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.success) {
        throw new Error(body.message || 'Failed to get profile');
    }

    return body.data
}