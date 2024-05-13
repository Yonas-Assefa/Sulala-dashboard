'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { CONFIRM_PHONE, VERIFY_EMAIL, VERIFY_PHONE } from './config/urls';
import { otpVerificationSchema } from './schema/zod-schema';
import { cookies } from 'next/headers';
import { makeRequest, setBrowserCookie } from './utils/helper';

type VerifyEmailArgs = {
    vendor_id: string
    confirmation_token: string
}

export const verifyEmail = async ({ confirmation_token, vendor_id }: VerifyEmailArgs) => {
    try {
        const response = await makeRequest(`${VERIFY_EMAIL}?confirmation_token=${confirmation_token}&vendor_id=${vendor_id}`, {}, 'GET')
        console.log({ status: response.status })
        const body = await response.json()
        console.log({ body })

        if (!response.ok || !body.success) {
            if (body.message === 'Email already verified') {
                const successMessage = 'Email already verified!'
                const redirectUrl = '/auth/create-password'
                return toFormState('SUCCESS', successMessage, redirectUrl);
            }
            throw new Error(body.message || 'Failed to verify emial address');
        }

        setBrowserCookie(response)

        const successMessage = 'Verification successful!'

        const redirectUrl = '/auth/create-password'

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};