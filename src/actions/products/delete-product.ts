'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { PRODUCTS, } from '../../config/urls';
import { changeObjToFormData, getBrowserCookie, getMultiPartRequestHeaders, getRequestHeaders, getResponseErrorMessage } from '../../lib/helper';
import { revalidatePath } from 'next/cache';

export const deleteProduct = async (
    formData: FormData
) => {
    try {

        const item_id = +(formData.get('item_id') || 0)
        if (!item_id) {
            throw new Error('Invalid product id');
        }

        const URL = `${PRODUCTS}${item_id}/`
        const METHOD = 'DELETE'

        const response = await fetch(URL, {
            method: METHOD,
            headers: getRequestHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        const successMessage = 'Product deleted successfully!'

        const redirectUrl = '/dashboard/my-products?filter=all'
        revalidatePath('/dashboard/my-products')

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};