'use server'
import { fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { ACCEPT_SHOP_APPROVAL } from '../../config/urls';
import { getResponseBody, getResponseErrorMessage, makeRequest, setBrowserCookie } from '../../lib/helper';

type AcceptApprovalArgs = {
    vendor_id: string
    approval_token: string
}

export const acceptApproval = async ({ approval_token, vendor_id }: AcceptApprovalArgs) => {
    try {
        const response = await makeRequest(`${ACCEPT_SHOP_APPROVAL}?approval_token=${approval_token}&vendor_id=${vendor_id}`, {}, 'GET')
        const body = await getResponseBody(response)

        if (!response.ok || !body.success) {
            const redirectUrl = '/auth/sign-in'
            const failedMessage = getResponseErrorMessage(body) || 'Failed to accept approval'
            return toFormState('ERROR', failedMessage, redirectUrl);
            // throw new Error(body.message || 'Failed to verify emial address');
        }

        setBrowserCookie(response)

        const successMessage = 'Approval successful!'

        const redirectUrl = '/auth/login'

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};