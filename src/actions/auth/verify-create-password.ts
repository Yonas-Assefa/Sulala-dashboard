'use server'
import { fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { VERIFY_EMAIL } from '../../config/urls';
import { getResponseBody, getResponseErrorMessage, makeRequest, setBrowserCookie } from '../../lib/helper';

type VerifyEmailArgs = {
    vendor_id: string
    reset_link: string
}

export const verifyCreatepassword = async ({ reset_link: confirmation_token, vendor_id }: VerifyEmailArgs) => {
    try {
        const response = await makeRequest(`${VERIFY_EMAIL}?confirmation_token=${confirmation_token}&vendor_id=${vendor_id}`, {}, 'GET')
        const body = await getResponseBody(response)

        if (!response.ok || !body.success) {
            const redirectUrl = '/auth/sign-in'
            const failedMessage = getResponseErrorMessage(body) || 'Failed to verify email address'
            return toFormState('ERROR', failedMessage, redirectUrl);
        }

        setBrowserCookie(response)

        const successMessage = 'Verification successful!'

        const redirectUrl = '/auth/create-password'

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};