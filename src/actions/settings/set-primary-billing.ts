'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { SET_PRIMARY_BILLING, } from '../../config/urls';
import { billingInfoSettingSchema, } from '../schema/zod-schema';
import { getRequestHeaders, getResponseErrorMessage } from '../../lib/helper';
import { revalidatePath } from 'next/cache';

export const setPrimaryBilling = async (
    formState: FormState,
    formData: FormData
) => {
    try {

        const billing_id = formData.get('billing_id')
        if (!billing_id) {
            throw new Error('Billing id is required');
        }
        if (isNaN(Number(billing_id))) {
            throw new Error('Invalid billing id');
        }
        const response = await fetch(SET_PRIMARY_BILLING, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify({
                id: +billing_id,
            }),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            const message = getResponseErrorMessage(body)
            throw new Error(message || 'Failed to submit form');
        }

        const successMessage = body.message || 'Successfully setted primary billing';

        revalidatePath('/dashboard/settings')

        return toFormState('SUCCESS', successMessage);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};