'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { CREATE_PASSWORD, } from './config/urls';
import { createPasswordSchema, } from './schema/zod-schema';
import { getBrowserCookie, getRequestHeaders } from './utils/helper';

export const createPassword = async (
    formState: FormState,
    formData: FormData
) => {
    try {
        const data = createPasswordSchema.parse({
            password: formData.get('password'),
            confirm_password: formData.get('password_confirm'),
        });
        const response = await fetch(CREATE_PASSWORD, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to create password');
        }

        const successMessage = 'Password created successfully!'

        const redirectUrl = '/auth/setup-account'

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};