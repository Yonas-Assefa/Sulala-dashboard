'use server'

import { notFound } from "next/navigation"
import { GET_BRANDS } from "../../config/urls"
import { getRequestHeaders } from "../../lib/helper"
import { brandMapper } from "../mapper/brand-mapper"

export const getBrands = async () => {
    const response = await fetch(GET_BRANDS, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()
    console.log({ body })
    if (!response.ok || !body.results) {
        if (response.status === 404) {
            notFound()
        }
        throw new Error(body.message || 'Failed to get brands');
    }
    const mappedBrand = brandMapper(body.results)
    return mappedBrand
}