'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { SIGNUP_URL } from '../config/urls';
import { emailSignUpSchema, phoneAuthSchema } from '../schema/zod-schema';
import { getPhoneNumber } from '../utils/helper';

export const signUp = async (
    formState: FormState,
    formData: FormData
) => {
    try {
        const by = formData.get('by')?.toString()

        const data: { phone_number?: string, email?: string } = {}

        if (by == 'email') {
            const ZodObj = emailSignUpSchema.parse({
                email: formData.get('email'),
            });
            Object.assign(data, { ...ZodObj })
        } else {
            const ZodObj = phoneAuthSchema.parse({
                phone_number: getPhoneNumber({
                    phone_number: formData.get('phone_number'),
                    country_code: formData.get('country_code')
                }),
            });
            Object.assign(data, { ...ZodObj })
        }

        const response = await fetch(SIGNUP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to sign up');
        }

        const successMessage = (by == 'email') ?
            'Check your email for the verification link' :
            'Check your message for the verification code'

        const redirectUrl = (by == 'email') ? `/auth/confirm-letter?email=${data.email}&action=signup` : `/auth/enter-otp?phone=${data.phone_number}&action=signup`

        return toFormState('SUCCESS', `Signup successful! ${successMessage}.`, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};