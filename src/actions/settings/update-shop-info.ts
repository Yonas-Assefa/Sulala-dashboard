'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { UPDATE_SHOP_ACCOUNT, } from '../config/urls';
import { personalInfoSettingSchema, shopInfoSettingSchema, } from '../schema/zod-schema';
import { getRequestHeaders, getResponseErrorMessage } from '../utils/helper';
import { revalidatePath } from 'next/cache';

export const updateShopInfo = async (
    formState: FormState,
    formData: FormData
) => {
    try {

        const data = shopInfoSettingSchema.parse({
            shop_name: formData.get('shop_name'),
            description: formData.get('shop_description'),
            categories: formData.getAll('categories'),
            legal_address: formData.get('legal_address'),
            website: formData.get('website'),
            instagram: formData.get('instagram'),
            facebook: formData.get('facebook'),
            profile_image: formData.get('profile_image'),
        });

        const response = await fetch(UPDATE_SHOP_ACCOUNT, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            const message = getResponseErrorMessage(body)
            throw new Error(message || 'Failed to submit form');
        }

        const successMessage = body.message || 'Successfully updated shop info';

        revalidatePath('/dashboard/settings')

        return toFormState('SUCCESS', successMessage);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};