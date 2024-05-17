'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { UPDATE_BILLING_ACCOUNT, } from '../config/urls';
import { billingInfoSettingSchema, } from '../schema/zod-schema';
import { getRequestHeaders, getResponseErrorMessage } from '../utils/helper';
import { revalidatePath } from 'next/cache';

export const updateBillingInfo = async (
    formState: FormState,
    formData: FormData
) => {
    try {

        const data = billingInfoSettingSchema.parse({
            card_holder_name: formData.get('card_holder_name'),
            card_number: formData.get('card_number'),
            expiry_date: formData.get('expiry_date'),
            cvv: formData.get('cvv'),
        });

        const response = await fetch(UPDATE_BILLING_ACCOUNT, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            const message = getResponseErrorMessage(body)
            throw new Error(message || 'Failed to submit form');
        }

        const successMessage = body.message || 'Successfully updated billing info';

        revalidatePath('/dashboard/settings')

        return toFormState('SUCCESS', successMessage);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};