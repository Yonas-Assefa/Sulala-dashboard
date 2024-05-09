import PrimaryButton from '@/components/common/ui/PrimaryButton'
import TextInput from '@/components/common/form/TextInput'
import React from 'react'

function CreatePaymentMethodModal() {
    return (

        <dialog id="create_payment_method_modal" className="modal">
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Add new card</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <TextInput id='cardholder-name' label='Cardholder name' name='cardholder-name' placeholder='Enter name' />
                    <TextInput id='card-number' label='Card number' name='card-number' placeholder='Enter card number' />
                    <div className='grid grid-cols-2 gap-3'>
                        <TextInput id='expiration-date' label='Expiration date' name='expiration-date' placeholder='DD.MM' />
                        <TextInput id='cvc' label='CVC' name='cvc' placeholder='***' />
                    </div>
                    <PrimaryButton name='Add' />
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className='text-black'>closedfsf</button>
            </form>
        </dialog>
    )
}

export default CreatePaymentMethodModal