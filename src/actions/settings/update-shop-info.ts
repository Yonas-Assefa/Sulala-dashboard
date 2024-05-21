'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { UPDATE_SHOP_ACCOUNT, } from '../config/urls';
import { personalInfoSettingSchema, shopInfoSettingSchema, } from '../schema/zod-schema';
import { changeObjToFormData, getMultiPartRequestHeaders, getRequestHeaders, getResponseErrorMessage, removeNullAndUndefined } from '../utils/helper';
import { revalidatePath } from 'next/cache';

export const updateShopInfo = async (
    formState: FormState,
    formData: FormData
) => {
    try {


        const cleanedData = removeNullAndUndefined({
            name: formData.get('shop_name'),
            description: formData.get('description'),
            category: +(formData.get('categories') || 0),
            legal_address: formData.get('legal_address'),
            website: formData.get('website'),
            instagram: formData.get('instagram'),
            facebook: formData.get('facebook'),
            profile_photo: formData.get('profile_image'),
        });

        console.log({ cleanedData })
        const data = shopInfoSettingSchema.parse(cleanedData);

        const response = await fetch(UPDATE_SHOP_ACCOUNT, {
            method: 'PATCH',
            headers: getMultiPartRequestHeaders(),
            body: changeObjToFormData(data),
        });

        const body = await response.json()
        console.log({ body, data })
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