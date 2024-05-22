'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { ADD_BILLING_INFO, } from '../../config/urls';
import { billingInfoSettingSchema, } from '../schema/zod-schema';
import { getRequestHeaders, getResponseErrorMessage } from '../../lib/helper';
import { revalidatePath } from 'next/cache';

export const createBillingInfo = async (
    formState: FormState,
    formData: FormData
) => {
    try {

        const data = billingInfoSettingSchema.parse({
            account_holder_name: formData.get('card_holder_name'),
            card_number: formData.get('card_number'),
            expiration_date: formData.get('expiry_date'),
            cvc: formData.get('cvc'),
        });

        const response = await fetch(ADD_BILLING_INFO, {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            const message = getResponseErrorMessage(body)
            throw new Error(message || 'Failed to submit form');
        }

        const successMessage = body.message || 'Successfully updated billing info';

        revalidatePath('/dashboard/settings/billing-info')

        return toFormState('SUCCESS', successMessage);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};