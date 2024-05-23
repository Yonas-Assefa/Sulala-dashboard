'use server'

import { getCategories } from "../common/get-categories"
import { PRODUCTS } from "../../config/urls"
import { productMapper } from "../mapper/product-mapper"
import { getRequestHeaders, makeRequest } from "../../lib/helper"
import { notFound } from "next/navigation"

export const getProducts = async () => {
    const response = await fetch(PRODUCTS, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.results) {
        throw new Error(body.message || 'Failed to get product');
    }

    return await productMapper(body.results)
}

export const getOneProduct = async (item: string) => {
    const response = await fetch(`${PRODUCTS}${item}/`, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()

    if (!response.ok || !body.id) {
        if (response.status === 404) {
            notFound()
        }
        return null
    }
    return await productMapper(body)
}