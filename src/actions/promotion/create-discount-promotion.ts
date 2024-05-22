'use server'
import { FormState, fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { PROMOTIONS, } from '../config/urls';
import { createProductSchema, createPromoCampaingSchema, updateProductSchema, } from '../schema/zod-schema';
import { changeObjToFormData, getMultiPartRequestHeaders, getRequestHeaders, getResponseErrorMessage } from '../utils/helper';
import { revalidatePath } from 'next/cache';
import { DISCOUNT_TYPE_CHOICES, type PROMOTION_ENUM } from '@/app/dashboard/promotion/[action]/data/discount-contants';
import { changeLocaleToISO } from '@/utils/dateFormatter.util'
export const createDiscountPromotion = async (
    formState: FormState,
    formData: FormData
) => {
    try {

        const dataToBeParsed = {
            promotion_type: 'DISCOUNT',
            promotional_discount_type: formData.get('promo_discount_type'),
            description: formData.get('description'),
            name: formData.get('campaign_name'),
            start_date: formData.get('start_datetime'),
            end_date: formData.get('end_datetime'),
            budgeting: formData.get('budgeting'),
            budget: +(formData.get('budget') || 0),
        }

        const item_type = formData.get('item_type')
        if (item_type == 'product') {
            Object.assign(dataToBeParsed, { products: formData.getAll('product')?.map((product) => +product) })
        } else {
            Object.assign(dataToBeParsed, { services: formData.getAll('service')?.map((service) => +service) })
        }

        const ad_files = formData.get('ad_files')

        if (ad_files && ad_files instanceof File && ad_files?.size > 0) {
            Object.assign(dataToBeParsed, { ad_files })
        }

        const promotional_discount_type = formData.get('promo_discount_type')

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

        console.log({ dataToBeParsed })
        const data = createPromoCampaingSchema.parse(dataToBeParsed)

        const response = await fetch(PROMOTIONS, {
            method: 'POST',
            headers: getMultiPartRequestHeaders(),
            body: changeObjToFormData(data),
        });

        const body = await response.json()
        console.log({ body })
        if (!response.ok || !body.success) {
            // if (!body.success) {
            const message = getResponseErrorMessage(body)
            throw new Error(message || 'Failed to submit form');
        }

        const successMessage = 'Promotion created successfully!'
        const redirectUrl = '/dashboard/promotion'
        revalidatePath('/dashboard/promotion')

        return toFormState('SUCCESS', successMessage, redirectUrl);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};