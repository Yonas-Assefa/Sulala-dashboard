'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { EMAIL_SIGNIN_URL, PHONE_SIGNIN_URL } from '../../config/urls';
import { emailSignInSchema, phoneAuthSchema } from '../schema/zod-schema';
import { getPhoneNumber, getResponseErrorMessage, setBrowserCookie } from '../../lib/helper';
import { getPersonalInfo } from '../settings/get-personal-info';

export const signIn = async (
    formState: FormState,
    formData: FormData
) => {
    try {
        const by = formData.get('by')?.toString()

        const data: { email?: string, password?: string, phone_number?: string } = {}
        const SIGNIN_URL = by == 'email' ? EMAIL_SIGNIN_URL : PHONE_SIGNIN_URL

        if (by == 'email') {
            const ZodObj = emailSignInSchema.parse({
                email: formData.get('email'),
                password: formData.get('password'),
            });
            Object.assign(data, { ...ZodObj })
        } else {
            const ZodObj = phoneAuthSchema.parse({
                phone_number: getPhoneNumber({ phone_number: formData.get('phone_number'), country_code: formData.get('country_code') })
            });
            Object.assign(data, { ...ZodObj })
        }

        const response = await fetch(SIGNIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            if (body.message == 'Password not set. set password') {
                return toFormState('ERROR', 'Create password to continue', `/auth/create-password`);
            }
            throw new Error(getResponseErrorMessage(body) || 'Failed to signin');
        }

        setBrowserCookie(response)

        const successMessage = (by == 'email') ?
            'Signin successful!.' :
            'Check your message for the verification code'

        const personalInfo = await getPersonalInfo()
        const redirectUrl = personalInfo?.is_superuser ? '/dashboard/manage?filter=pending' :
            ((by == 'email') ? '/dashboard/settings' : `/auth/enter-otp?phone=${data.phone_number}&action=signin`)

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};