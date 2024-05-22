'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { CHANGE_PASSWORD, } from '../config/urls';
import { changePasswordSettingSchema, } from '../schema/zod-schema';
import { getRequestHeaders, getResponseErrorMessage } from '../../lib/helper';
import { revalidatePath } from 'next/cache';

export const changePassword = async (
    formState: FormState,
    formData: FormData
) => {
    try {

        const data = changePasswordSettingSchema.parse({
            old_password: formData.get('old_password'),
            password: formData.get('new_password'),
            confirm_password: formData.get('confirm_password'),
        });

        const response = await fetch(CHANGE_PASSWORD, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            const message = getResponseErrorMessage(body)
            throw new Error(message || 'Failed to submit form');
        }

        const successMessage = body.message || 'Successfully changed password';

        revalidatePath('/dashboard/settings')

        return toFormState('SUCCESS', successMessage);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};