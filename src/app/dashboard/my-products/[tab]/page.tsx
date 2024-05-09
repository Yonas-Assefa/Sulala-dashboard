'use client'
import BackButton from '@/components/common/ui/BackButton'
import ImageUnselectButton from '@/components/common/ui/ImageUnselectButton'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SelectInput from '@/components/common/form/SelectInput'
import TextAreaInput from '@/components/common/form/TextAreaInput'
import TextInput from '@/components/common/form/TextInput'
import React from 'react'
import { notFound } from 'next/navigation'
import ImageListSelector from '@/components/common/form/ImageListSelector'

type Props = {
    params: {
        tab: string
    }
}

function page({ params: { tab } }: Props) {

    if (!['add', 'edit'].includes(tab)) {
        return notFound()
    }


    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10 overflow-y-scroll'>
            <div className='flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif'>
                <div className='mt-4' >
                    <BackButton />
                </div>
                <h2 className='capitalize'>{tab} Product</h2>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-2 flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>General Info</h3>
                    <div className='grid grid-cols-2 max-w-[1300px] gap-5'>
                        <TextInput id='product-name' placeholder='Enter product name' label='Title' />
                        <TextInput id='quality' placeholder='Enter Quality' label='Quality' />
                        <div className="col-span-2">
                            <TextAreaInput id='description' placeholder='Text' label='Description' />
                        </div>
                        <TextInput id='price' placeholder='Enter price' label='Price' />
                        <TextInput id='discount' placeholder='Enter discount in %' label='Discount' />
                        <div className="col-span-2">
                            <ImageListSelector multi />
                        </div>
                    </div>

                </div>
                <div className='col-span-1 bg-white flex flex-col gap-8'>
                    <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                        <h3 className='font-semibold text-xl'>Status</h3>
                        <div className='flex flex-col gap-3 p-2'>
                            <label htmlFor='radio-1' className='flex flex-row gap-2 items-center cursor-pointer'>
                                <input type="radio" name="radio-5" id='radio-1' className="radio radio-success border-secondary" />
                                <p>Date</p>
                            </label>
                            <label htmlFor='radio-2' className='flex flex-row gap-2 items-center cursor-pointer'>
                                <input type="radio" name="radio-5" id='radio-2' className="radio radio-success border-secondary" />
                                <p>Product title</p>
                            </label>
                            <label htmlFor='radio-3' className='flex flex-row gap-2 items-center cursor-pointer'>
                                <input type="radio" name="radio-5" id='radio-3' className="radio radio-success border-secondary" />
                                <p>Created</p>
                            </label>
                        </div>
                    </div>
                    <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                        <h3 className='font-semibold text-xl'>Product organization</h3>
                        <SelectInput id='category' label='Category' multi={true} nested={false} />
                    </div>
                    <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                        <h3 className='font-semibold text-xl'>Product promotion</h3>
                        <SelectInput id='category' label='Promo campaign (optional)' multi={false} nested={true} />
                        <TextAreaInput id='description' placeholder='Enter tags for the product' label='Tags' />
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <PrimaryButton padding={'md'} name='Save' disabled />
            </div>
        </div>
    )
}

export default page