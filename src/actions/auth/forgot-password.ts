'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { FORGOT_PASSWORD } from '../../config/urls';
import { emailSignUpSchema } from '../schema/zod-schema';
import { setBrowserCookie } from '../../lib/helper';

export const forgotPassword = async (
    formState: FormState,
    formData: FormData
) => {
    try {

        const data = emailSignUpSchema.parse({
            email: formData.get('email'),
        });

        const response = await fetch(FORGOT_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to submit form');
        }

        const successMessage = 'Check your email for the verification code'

        const redirectUrl = `/auth/enter-otp?email=${data.email}&action=reset-password`

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};