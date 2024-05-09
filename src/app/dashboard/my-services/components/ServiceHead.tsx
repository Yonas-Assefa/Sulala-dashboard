import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import React from 'react'

function ServiceHead() {

    return (
        <div className='flex flex-row justify-between'>
            <h1 className='text-5xl font-semibold font-serif'>My Services</h1>
            <div className='flex flex-row gap-3 items-center'>
                <div className='flex flex-row gap-4'>
                    <img src="/icons/clock.svg" alt="" />
                    <p>Mon-Fri 8:00 AM - 5:00 PM</p>
                </div>
                <div>
                    <SecondaryButton name='Edit worktime' modal='edit_service_worktime_modal' padding='sm' />
                </div>
                <div>
                    <PrimaryButton name='Add Service' href='/dashboard/my-services/add' />
                </div>
            </div>
        </div>
    )
}

export default ServiceHead