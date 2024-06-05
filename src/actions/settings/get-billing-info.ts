'use server'

import { GET_BILLING_ACCOUNT } from "../../config/urls"
import { billingMapper } from "../mapper/billing-mapper"
import { getRequestHeaders } from "../../lib/helper"

export const getBillingInfo = async () => {
    // TEMP
    return {}
    const response = await fetch(GET_BILLING_ACCOUNT, {
        method: 'GET',
        headers: getRequestHeaders(),
        next: {
            tags: ['billing']
        }
    })
    const body = await response.json()

    if (!response.ok || !body.success) {
        throw new Error(body.message || 'Failed to get billing info');
    }

    return billingMapper(body.data)
}