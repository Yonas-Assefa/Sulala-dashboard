'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { SETUP_URL, SHOP_ACCOUNT } from './config/urls';
import { setupAccountFirstStepSchema, setupAccountLastStepSchema } from './schema/zod-schema';
import { getRequestHeaders } from './utils/helper';

export const setupAccount = async (
    formState: FormState,
    formData: FormData
) => {
    try {
        const stage = formData.get('stage')?.toString()

        const data: { phone_number?: string, email?: string } = {}

        const ObjectfromEntries = Object.fromEntries(formData);
        console.log({ ObjectfromEntries })

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


        const certificateBytes = await formData.get('certificate')?.arrayBuffer()
        const certificateBuffer = Buffer.from(certificateBytes);


        const tax_formBytes = await formData.get('tax_form')?.arrayBuffer()
        const tax_formBuffer = Buffer.from(tax_formBytes);

        console.log({
            ...data,
            certificates: formData.get('certificate'),
            tax_forms: formData.get('tax_form'),
        })

        const response = stage == 'one' ? await fetch(SETUP_URL, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        }) : await fetch(SHOP_ACCOUNT, {
            method: 'POST',
            headers: {
                ...getRequestHeaders(),
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify({
                ...data,
                certificates: certificateBuffer,
                tax_forms: tax_formBuffer,
            }),
        })
        console.log({ response })
        console.log({ ...response.body })
        const body = await response.json()
        if (!response.ok || !body.success) {
            throw new Error(body.message || 'Failed to sign up');
        }

        const successMessage = 'Account setup 1/3'

        const redirectUrl = `/auth/setup-account?stage=${stage == 'one' ? 'two' : 'three'}`

        return toFormState('INFO', successMessage, redirectUrl);
    } catch (error) {
        console.log({ error })
        return fromErrorToFormState(error);
    }
};