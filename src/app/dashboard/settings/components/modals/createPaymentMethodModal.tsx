'use client'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import TextInput from '@/components/common/form/TextInput'
import React from 'react'
import { updateBillingInfo } from '@/actions/settings/update-billing-info';
import { useRedirectRoute } from '@/hooks/useRedirectRoute';
import { useToastMessage } from '@/hooks/useToastMessage';
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper';
import { useFormState } from 'react-dom';

function CreatePaymentMethodModal() {
    const [formState, action] = useFormState(
        updateBillingInfo,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);


    return (

        <dialog id="create_payment_method_modal" className="modal">
            <form action={action} className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Add new card</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <TextInput id='card_holder_name' label='Cardholder name' name='card_holder_name' placeholder='Enter name' error={formState?.fieldErrors?.card_holder_name?.[0]} />
                    <TextInput id='card_number' label='Card number' name='card_number' placeholder='Enter card number' error={formState?.fieldErrors?.card_number?.[0]} />
                    <div className='grid grid-cols-2 gap-3'>
                        <TextInput id='expiry_date' label='Expiration date' name='expiry_date' placeholder='DD.MM' error={formState?.fieldErrors?.expiry_date?.[0]} />
                        <TextInput id='cvc' label='CVC' name='cvc' placeholder='***' error={formState?.fieldErrors?.cvv?.[0]} />
                    </div>
                    <PrimaryButton name='Add' type='submit' />
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button className='text-black'></button>
            </form>
        </dialog>
    )
}

export default CreatePaymentMethodModal