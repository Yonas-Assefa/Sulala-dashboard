'use client'
import React from 'react'
import BillingInfoCard from './BillingInfoCard'
import { openModal } from '@/lib/modals'

type Props = {
    billings: any
}
function BillingInfo({ billings }: Props) {

    return (
        <div className='mt-4 w-full flex flex-col gap-8 items-start'>
            <div className='flex flex-col gap-4'>
                <h4 className='font-[500]'>Payment methods</h4>

                {
                    Array.isArray(billings) && billings.map((billing, index) => (
                        <BillingInfoCard key={index} isPrimary={billing.primary} card_number={billing.card_number} id={billing.id} />
                    ))
                }


                <button onClick={() => openModal('create_payment_method_modal')} className='flex flex-row gap-2 bg-tertiary self-start py-2 px-4 rounded-[30px]'>
                    <img src="/icons/plus.svg" alt="" />
                    <span>Add new</span>
                </button>
            </div>
        </div>
    )
}

export default BillingInfo