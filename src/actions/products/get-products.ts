'use server'

import { PRODUCTS } from "../config/urls"
import { getRequestHeaders, makeRequest } from "../utils/helper"

export const getProducts = async () => {
    const response = await fetch(PRODUCTS, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.results) {
        throw new Error(body.message || 'Failed to get product');
    }

    return body
}

export const getOneProduct = async (item: string) => {
    const response = await fetch(`${PRODUCTS}${item}/`, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.id) {
        return null
    }

    return body
}