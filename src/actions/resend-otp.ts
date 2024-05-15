'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { CONFIRM_PHONE, RESEND_OTP, VERIFY_PHONE } from './config/urls';
import { otpVerificationSchema, resendOtpSchema } from './schema/zod-schema';
import { cookies } from 'next/headers';
import { makeRequest, setBrowserCookie } from './utils/helper';

export const resendOtp = async ({ phone_number }: { phone_number: string }) => {
    try {
        const data = resendOtpSchema.parse({
            phone_number,
        });

        const response = await makeRequest(RESEND_OTP, data, 'PATCH')

        const body = await response.json()
        console.log({ body, data })

        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to resend OTP');
        }

        setBrowserCookie(response)

        const successMessage = 'OTP resent successfully!'

        return toFormState('SUCCESS', successMessage);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};