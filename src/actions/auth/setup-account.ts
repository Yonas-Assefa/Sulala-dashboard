'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { SETUP_URL, SHOP_ACCOUNT } from '../config/urls';
import { setupAccountFirstStepSchema, setupAccountLastStepSchema } from '../schema/zod-schema';
import { changeObjToFormData, getMultiPartRequestHeaders, getRequestHeaders } from '../utils/helper';

export const setupAccount = async (
    formState: FormState,
    formData: FormData
) => {
    try {
        const stage = formData.get('stage')?.toString()

        const data: { phone_number?: string, email?: string } = {}

        if (stage == 'one') {
            const ZodObj = setupAccountFirstStepSchema.parse({
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
            });
            Object.assign(data, { ...ZodObj })
        } else {
            const ZodObj = setupAccountLastStepSchema.parse({
                name: formData.get('company_name'),
                category: +(formData.get('sale_category') || 0),
                legal_address: formData.get('address'),
                certificates: formData.get('certificate'),
                tax_forms: formData.get('tax_form'),
            });
            Object.assign(data, { ...ZodObj })
        }

        const response = stage == 'one' ? await fetch(SETUP_URL, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        }) : await fetch(SHOP_ACCOUNT, {
            method: 'POST',
            headers: getMultiPartRequestHeaders(),
            body: changeObjToFormData(data),
        })
        const body = await response.json()
        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to submit form');
        }

        const successMessage = stage == 'one' ? 'Account setup 1/3' : 'Account setup 3/3';

        const redirectUrl = body?.message?.toLowerCase().includes('please verify the new email address') ?
            `/auth/confirm-letter?email=${data.email}` : stage !== 'three' ? `/auth/setup-account?stage=${stage == 'one' ? 'two' : 'three'}` : `/auth/setup-complete?email=${formData.get('email')}`;

        return toFormState('INFO', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};