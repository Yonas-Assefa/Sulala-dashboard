'use server'
import { fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { RESEND_VERIFICATION_LINK } from '../../config/urls';
import { emailSignUpSchema } from '../schema/zod-schema';
import { cookies } from 'next/headers';
import { makeRequest, setBrowserCookie } from '../../lib/helper';

export const resendVerificationLink = async ({ email }: { email: string }) => {
    try {
        const data = emailSignUpSchema.parse({
            email,
        });

        const response = await makeRequest(RESEND_VERIFICATION_LINK, data, 'PATCH')

        const body = await response.json()

        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to resend verification link');
        }

        setBrowserCookie(response)

        const successMessage = 'Verification link resent successfully!'

        return toFormState('SUCCESS', successMessage);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};