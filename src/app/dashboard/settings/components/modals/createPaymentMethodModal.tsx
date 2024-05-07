'use client'
import PasswordInput from '@/components/common/form/PasswordInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import TextInput from '@/components/common/form/TextInput'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    open: boolean
}
function CreatePaymentMethodModal() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const open = searchParams.get('action') == 'create-payment-method'
    return (
        <dialog id="my_modal_4" className={`modal ${open && 'modal-open'}`} onClick={() => router.back()}>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0" onClick={(e) => e.stopPropagation()}>
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Add new card</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <TextInput id='cardholder-name' label='Cardholder name' name='cardholder-name' placeholder='Enter name' onChange={() => { }} onClear={() => { }} value='' />
                    <TextInput id='card-number' label='Card number' name='card-number' placeholder='Enter card number' onChange={() => { }} onClear={() => { }} value='' />
                    <div className='grid grid-cols-2 gap-3'>
                        <TextInput id='expiration-date' label='Expiration date' name='expiration-date' placeholder='DD.MM' onChange={() => { }} onClear={() => { }} value='' />
                        <TextInput id='cvc' label='CVC' name='cvc' placeholder='***' onChange={() => { }} onClear={() => { }} value='' />
                    </div>
                    <PrimaryButton name='Add' />
                </div>
            </div>
        </dialog>
    )
}

export default CreatePaymentMethodModal