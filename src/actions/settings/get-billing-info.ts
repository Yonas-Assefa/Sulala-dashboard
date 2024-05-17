'use server'

import { GET_BILLING_ACCOUNT } from "../config/urls"
import { getRequestHeaders } from "../utils/helper"

export const getBillingInfo = async () => {
    const response = await fetch(GET_BILLING_ACCOUNT, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.success) {
        throw new Error(body.message || 'Failed to get billing info');
    }

    return body.data
}