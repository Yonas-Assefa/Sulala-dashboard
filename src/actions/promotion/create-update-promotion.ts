'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { PROMOTIONS, } from '../../config/urls';
import { createPromoCampaingSchema, } from '../schema/zod-schema';
import { changeObjToFormData, getMultiPartRequestHeaders, getResponseErrorMessage } from '../../lib/helper';
import { revalidatePath } from 'next/cache';

export const createUpdatePromotion = async (
    formState: FormState,
    formData: FormData
) => {
    try {

        const dataToBeParsed = {
            promotion_type: formData.get('promotion_type'),
            name: formData.get('campaign_name'),
            start_date: formData.get('start_datetime'),
            end_date: formData.get('end_datetime'),
            budgeting: formData.get('budgeting'),
            budget: +(formData.get('budget') || 0),
        }

        const ad_files = formData.get('ad_files')

        if (ad_files && ad_files instanceof File && ad_files?.size > 0) {
            Object.assign(dataToBeParsed, { files: ad_files })
        }

        const promotion_type = formData.get('promotion_type')
        if (promotion_type == 'DISCOUNT') {
            const promotional_discount_type = formData.get('promo_discount_type')
            Object.assign(dataToBeParsed, {
                promotional_discount_type,
                description: formData.get('description'),
            })
            if (promotional_discount_type === 'PERCENTAGE_OFF') {
                Object.assign(dataToBeParsed, {
                    discount: +(formData.get('discount') || 0)
                })
            } else if (promotional_discount_type === 'LIMITED_PRICE') {
                Object.assign(dataToBeParsed, {
                    limited_price: +(formData.get('limited_price') || 0)
                })
            } else if (promotional_discount_type == 'PERCENTAGE_OFF_THE_MINIMUM_CART_SIZE') {
                Object.assign(dataToBeParsed, {
                    discount: +(formData.get('discount') || 0),
                    cart_total: +(formData.get('cart_total') || 0)
                })
            }
            const item_type = formData.get('item_type')
            if (item_type == 'product') {
                Object.assign(dataToBeParsed, { products: formData.getAll('product')?.map((product) => +product) })
            } else {
                Object.assign(dataToBeParsed, { services: formData.getAll('service')?.map((service) => +service) })
            }
        } else if (promotion_type == 'BANNER') {
            const destination_type = formData.get('destination_type')
            Object.assign(dataToBeParsed, { destination_type })
            if (destination_type == 'LIST_OF_PRODUCTS') {
                const item_type = formData.get('item_type')
                if (item_type == 'product') {
                    Object.assign(dataToBeParsed, { products: formData.getAll('products')?.map((product) => +product) })
                } else {
                    Object.assign(dataToBeParsed, { services: formData.getAll('services')?.map((service) => +service) })
                }
            }
        }

        const data = createPromoCampaingSchema.parse(dataToBeParsed)

        const action = formData.get('action_type')
        const item_id = formData.get('item_id')

        const METHOD = action === 'add' ? 'POST' : 'PATCH'
        const URL = action === 'add' ? PROMOTIONS : `${PROMOTIONS}${item_id}/`

        const response = await fetch(URL, {
            method: METHOD,
            headers: getMultiPartRequestHeaders(),
            body: changeObjToFormData(data),
        });

        const body = await response.json()
        // if (!response.ok || !body.success) {
        if (!body.success) {
            const message = getResponseErrorMessage(body)
            throw new Error(message || 'Failed to submit form');
        }

        const successMessage = action === 'add' ?
            'Promotion created successfully!' :
            'Promotion updated successfully!'
        const redirectUrl = '/dashboard/promotion'

        revalidatePath('/dashboard/promotion')
        revalidatePath('/dashboard/promotion/edit')

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};