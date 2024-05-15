'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { CONFIRM_PHONE, VERIFY_PHONE } from './config/urls';
import { otpVerificationSchema } from './schema/zod-schema';
import { cookies } from 'next/headers';
import { makeRequest, setBrowserCookie } from './utils/helper';

export const enterOtp = async (
    formState: FormState,
    formData: FormData
) => {
    try {
        const data = otpVerificationSchema.parse({
            phone_number: formData.get('phone_number'),
            otp: formData.get('otp')?.toString(),
        });

        const action = formData.get('action')?.toString()

        const response = action == 'signup' ?
            await makeRequest(VERIFY_PHONE, data, 'PATCH') :
            await makeRequest(CONFIRM_PHONE, data, 'POST')

        const body = await response.json()
        console.log({ body, data })

        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to verify phone number');
        }

        setBrowserCookie(response)

        const successMessage = 'Verification successful!'

        const redirectUrl = action === 'signup' ? '/auth/setup-account' : '/dashboard/settings'

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};