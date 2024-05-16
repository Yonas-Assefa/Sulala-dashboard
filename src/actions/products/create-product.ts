'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { CREATE_PASSWORD, } from '../config/urls';
import { createPasswordSchema, createProductSchema, } from '../schema/zod-schema';
import { getBrowserCookie, getRequestHeaders } from '../utils/helper';

export const createProduct = async (
    formState: FormState,
    formData: FormData
) => {
    try {
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
        const response = await fetch(CREATE_PASSWORD, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            console.log({ body })
            const message = body.message || body[Object.keys(body)[0]][0] || 'Failed to create password';
            throw new Error(message || 'Failed to create password');
        }

        const successMessage = 'Password created successfully!'

        const redirectUrl = '/auth/setup-account'

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};