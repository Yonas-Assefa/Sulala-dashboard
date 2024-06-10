'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { UPDATE_VENDOR_ACCOUNT, } from '../../config/urls';
import { personalInfoSettingSchema, } from '../schema/zod-schema';
import { getRequestHeaders, getResponseBody, getResponseErrorMessage } from '../../lib/helper';
import { revalidatePath } from 'next/cache';

export const updatePersonalInfo = async (
    formState: FormState,
    formData: FormData
) => {
    try {

        const data = personalInfoSettingSchema.parse({
            first_name: formData.get('first_name') || '',
            last_name: formData.get('last_name') || '',
            phone_number: formData.get('phone_number') || '',
            email: formData.get('email') || '',
            // address: formData.get('address') || '',
        });

        const response = await fetch(UPDATE_VENDOR_ACCOUNT, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        const body = await getResponseBody(response)
        if (!response.ok || !body.success) {
            const message = getResponseErrorMessage(body)
            throw new Error(message || 'Failed to submit form');
        }

        const successMessage = body.message || 'Successfully updated personal info';

        const redirectUrl = body?.message?.toLowerCase().includes('please verify the new email address') ?
            `/auth/confirm-letter?email=${data.email}` : undefined;
        revalidatePath('/dashboard/settings')

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};