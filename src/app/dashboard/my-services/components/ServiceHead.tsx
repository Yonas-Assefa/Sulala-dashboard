'use client'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import Link from 'next/link'
import React from 'react'

function ServiceHead() {
    const { createQueryString } = useCreateQueryString()
    return (
        <div className='flex flex-row justify-between'>
            <h1 className='text-5xl font-semibold font-serif'>My Services</h1>
            <div className='flex flex-row gap-3 items-center'>
                <div className='flex flex-row gap-4'>
                    <img src="/icons/clock.svg" alt="" />
                    <p>Mon-Fri 8:00 AM - 5:00 PM</p>
                </div>
                <div>
                    <SecondaryButton name='Edit worktime' href={createQueryString('action', 'edit-worktime')} padding='sm' />
                </div>
                <div>
                    <Link
                        className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary hover:bg-primary/80`}
                        href={'/dashboard/my-services/add'}
                    >
                        Add Service
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ServiceHead