'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { CREATE_PASSWORD, EMAIL_SIGNIN_URL, PHONE_SIGNIN_URL } from './config/urls';
import { createPasswordSchema, emailSignInSchema, phoneAuthSchema } from './schema/zod-schema';
import { getBearerToken, getBrowserCookie, getPhoneNumber, getRequestHeaders } from './utils/helper';
import { cookies } from 'next/headers';

export const createPassword = async (
    formState: FormState,
    formData: FormData
) => {
    try {
        const data = createPasswordSchema.parse({
            password: formData.get('password'),
            confirm_password: formData.get('password_confirm'),
        });

        console.log({ getBrowserCookie: getBrowserCookie() })

        const response = await fetch(CREATE_PASSWORD, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        const body = await response.json()
        console.log({ body, data })
        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to create password');
        }

        const successMessage = 'Password created successfully!'

        const redirectUrl = '/dashboard/settings'

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};