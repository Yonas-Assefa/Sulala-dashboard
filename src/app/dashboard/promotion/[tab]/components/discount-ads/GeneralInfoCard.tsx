'use client'
import DateInput from '@/components/common/form/DateInput'
import ImageListSelector from '@/components/common/form/ImageListSelector'
import CustomMultiSelectInput from '@/components/common/form/SelectInput'
import TextAreaInput from '@/components/common/form/TextAreaInput'
import TextInput from '@/components/common/form/TextInput'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { getItemType } from '../../utils/helper.util'

function GeneralInfoCard() {
    const searchParams = useSearchParams()
    const itemType = getItemType(searchParams.get('type'))

    return (
        <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
            <h3 className='font-semibold text-xl'>General Info</h3>
            <div className='max-w-[1300px] gap-5 flex flex-col'>
                <TextInput id='campagn-name' placeholder='Enter campaign name' label='Campaign name' onChange={() => { }} onClear={() => { }} value='' />
                <CustomMultiSelectInput id={itemType} label={`${itemType}s list`} placeholder={`Select ${itemType}s`} multi={true} nested={false} withImage={true} onChange={() => { }} onClear={() => { }} value='' />
                <TextAreaInput id='description' placeholder='Enter description/promotional quotes' label='Description/Promotional quotes' onChange={() => { }} onClear={() => { }} value='' />
                <div className="grid grid-cols-2">
                    <DateInput label='Start date & time' />
                    <DateInput label='End date & time' />
                </div>
                <div className="col-span-2">
                    <ImageListSelector label='Banner Ads' />
                </div>
            </div>
        </div>
    )
}

export default GeneralInfoCard