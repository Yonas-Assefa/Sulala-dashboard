'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import Link from 'next/link'
import React from 'react'
import BillingInfoCard from './BillingInfoCard'

function BillingInfo() {
    const { createQueryString } = useCreateQueryString()
    return (
        <div className='mt-4 w-full flex flex-col gap-8 items-start'>
            <div className='flex flex-col gap-4'>
                <h4 className='font-[500]'>Payment methods</h4>

                <BillingInfoCard isPrimary={true} />
                <BillingInfoCard isPrimary={false} />


                <Link href={createQueryString('action', 'create-payment-method')} className='flex flex-row gap-2 bg-tertiary self-start py-2 px-4 rounded-[30px]'>
                    <img src="/icons/plus.svg" alt="" />
                    <span>Add new</span>
                </Link>
            </div>
        </div>
    )
}

export default BillingInfo