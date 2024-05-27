import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import React from 'react'

function ServiceHead() {

    return (
        <div className='flex flex-col md:flex-row justify-between'>
            <h1 className='text-2xl md:text-5xl font-semibold font-serif'>My Services</h1>
            <div className='flex flex-row md:gap-3 items-center'>
                <div className='flex flex-row gap-4 text-black/50 md:text-black'>
                    <img src="/icons/clock.svg" alt="" />
                    <p>Mon-Fri 8:00 AM - 5:00 PM</p>
                </div>
                <div className='fixed md:relative bottom-0 drop-shadow-lg md:drop-shadow-none right-0 p-3 md:p-0 z-20'>
                    <SecondaryButton name='Edit worktime' modal='edit_service_worktime_modal' padding='sm' />
                </div>
                <div className='fixed md:relative bottom-14 md:bottom-0 drop-shadow-lg md:drop-shadow-none right-0 p-3 md:p-0 z-20'>
                    <PrimaryButton name='Add Service' href='/dashboard/my-services/add' />
                </div>
            </div>
        </div>
    )
}

export default ServiceHead