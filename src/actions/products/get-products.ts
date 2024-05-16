'use server'

import { PRODUCTS } from "../config/urls"
import { getRequestHeaders, makeRequest } from "../utils/helper"

export const getProducts = async () => {
    const response = await fetch(PRODUCTS, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()
    console.log({ body })

    if (!response.ok || !body.count) {
        throw new Error(body.message || 'Failed to create product');
    }

    return body
}