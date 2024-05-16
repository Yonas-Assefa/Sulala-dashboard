'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { CREATE_PASSWORD, PRODUCTS, } from '../config/urls';
import { createPasswordSchema, createProductSchema, } from '../schema/zod-schema';
import { changeObjToFormData, getBrowserCookie, getMultiPartRequestHeaders, getRequestHeaders, getResponseErrorMessage } from '../utils/helper';
import { revalidatePath } from 'next/cache';

export const createProduct = async (
    formState: FormState,
    formData: FormData
) => {
    try {
        console.log({ status: formData.get('status') })
        const data = createProductSchema.parse({
            title: formData.get('product_name'),
            description: formData.get('description'),
            price: +(formData.get('price') || 0),
            discounted_price: +(formData.get('discount') || 0),
            category: +(formData.get('category') || 0),
            images: formData.get('product_images'),
            inventory: +(formData.get('quality') || 0),
            status: formData.get('status'),
        });
        const response = await fetch(PRODUCTS, {
            method: 'POST',
            headers: getMultiPartRequestHeaders(),
            body: changeObjToFormData(data),
        });

        const body = await response.json()
        console.log({ body })
        if (!response.ok || !body.success) {
            const message = getResponseErrorMessage(body)
            throw new Error(message || 'Failed to submit form');
        }

        const successMessage = 'Product created successfully!'

        const redirectUrl = '/dashboard/my-products'
        revalidatePath('/dashboard/my-products')

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};