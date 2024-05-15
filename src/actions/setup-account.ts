'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { SETUP_URL } from './config/urls';
import { setupAccountOneSchema, setupAccountTwoSchema } from './schema/zod-schema';
import { getRequestHeaders } from './utils/helper';

export const setupAccount = async (
    formState: FormState,
    formData: FormData
) => {
    try {
        const stage = formData.get('stage')?.toString()

        const data: { phone_number?: string, email?: string } = {}

        if (stage == 'one') {
            const ZodObj = setupAccountOneSchema.parse({
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
            });
            Object.assign(data, { ...ZodObj })
        } else {
            const ZodObj = setupAccountTwoSchema.parse({
                company_name: formData.get('company_name'),
                sale_category: formData.get('sale_category'),
                address: formData.get('address'),
            });
            Object.assign(data, { ...ZodObj })
        }

        const response = await fetch(SETUP_URL, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        const body = await response.json()
        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to sign up');
        }

        const successMessage = 'Account setup 1/3'

        const redirectUrl = '/auth/setup-account?stage=two'

        return toFormState('INFO', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};