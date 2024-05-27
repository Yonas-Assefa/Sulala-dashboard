'use server'
import { fromErrorToFormState, toFormState } from '@/utils/formStateHelper';
import { REMOVE_PROMOTION_FILE, } from '../../config/urls';
import { getRequestHeaders } from '../../lib/helper';
import { revalidatePath, revalidateTag } from 'next/cache';

export const removePromotionBannerFile = async (
    formData: FormData
) => {

    try {

        const data = {
            id: formData.get('item_id'),
            file_path: formData.get('file_path'),
        }

        const response = await fetch(REMOVE_PROMOTION_FILE, {
            method: 'PATCH',
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Promotion file not found');
            }
            throw new Error('Failed to submit form');
        }

        const successMessage = `Promotion banner image deleted successfully`;

        revalidateTag(`promotion-detail-${data.id}`)
        revalidatePath('/dashboard/promotion/edit')

        return toFormState('SUCCESS', successMessage);
    } catch (error) {
        return fromErrorToFormState(error);
    }
};