'use server'

import { getCategories } from "../common/get-categories"
import { PRODUCTS } from "../../config/urls"
import { productMapper } from "../mapper/product-mapper"
import { Fetch, getRequestHeaders, getResponseErrorMessage, makeRequest } from "../../lib/helper"
import { notFound } from "next/navigation"

export const getProducts = async (formData?: FormData) => {
    const search = formData?.get('search') || ''
    const filter = (formData?.get('filter') || '').toString()?.toUpperCase()
    const status = filter == 'ALL' ? '' : filter

    const sort_by = formData?.get('sort_by') || ''
    const sort = formData?.get('sort') || ''

    let ordering = ''
    if (sort_by && sort_by == 'oldest') ordering += '-'
    if (sort) ordering += sort

    const response = await Fetch({
        url: PRODUCTS,
        method: 'GET',
        headers: getRequestHeaders(),
        next: {
            tags: ['products']
        },
        params: {
            search,
            status,
            ordering,
        }
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
        throw new Error(getResponseErrorMessage(body) || 'Failed to get product');
    }
    return await productMapper(body)
}