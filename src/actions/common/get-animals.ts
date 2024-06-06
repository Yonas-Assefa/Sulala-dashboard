'use server'

import { notFound } from "next/navigation"
import { GET_ANIMALS } from "../../config/urls"
import { getRequestHeaders } from "../../lib/helper"
import { animalMapper } from "../mapper/animal-mapper"

export const getAnimals = async () => {
    const response = await fetch(GET_ANIMALS, {
        method: 'GET',
        headers: getRequestHeaders()
    })
    const body = await response.json()
    console.log({ body })
    if (!response.ok || !body.success) {
        if (response.status === 404) {
            notFound()
        }
        throw new Error(body.message || 'Failed to get animals');
    }
    const mappedAnimals = animalMapper(body.data)
    return mappedAnimals
}