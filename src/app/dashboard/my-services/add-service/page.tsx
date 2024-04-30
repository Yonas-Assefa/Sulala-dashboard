'use client'
import BackButton from '@/components/common/BackButton'
import PrimaryButton from '@/components/common/PrimaryButton'
import SelectInput from '@/components/common/SelectInput'
import TextAreaInput from '@/components/common/TextAreaInput'
import TextInput from '@/components/common/TextInput'
import React from 'react'

function page() {
    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10'>
            <div className='flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif'>
                <div className='mt-4' >
                    <BackButton />
                </div>
                <h2>Add Service</h2>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-2 flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>General Info</h3>
                    <div className='grid grid-cols-2 max-w-[1300px] gap-5'>
                        <TextInput id='service-name' placeholder='Enter service name' label='Title' onChange={() => { }} onClear={() => { }} value='' />
                        <TextInput id='price' placeholder='Enter price' label='Price' onChange={() => { }} onClear={() => { }} value='' />
                        <div className="col-span-2">
                            <TextAreaInput id='description' placeholder='Text' label='Description' onChange={() => { }} onClear={() => { }} value='' />
                        </div>
                        <div className="col-span-2">
                            <div className='flex flex-col gap-1'>
                                <p>Images</p>
                                {/* <label htmlFor="image" className='flex flex-col items-center justify-center gap-5 cursor-pointer w-full bg-white p-4 border rounded-[30px] border-dashed h-[300px]'>
                                    <img src="/icons/image.svg" alt="" />
                                    <div className='flex flex-col justify-center items-center text-secondary'>
                                        <p>Upload upto 8 images. JPEG, PNG</p>
                                        <p>Maximum size 20 MB</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <img src="/icons/upload.svg" alt="" className='w-[15px]' />
                                        <p className='text-primary font-semibold'>Upload</p>
                                    </div>
                                </label> */}
                                <div className='flex flex-wrap gap-3'>
                                    <div className='bg-[#d9d9d9] block h-[180px] aspect-square rounded-[20px] relative'>
                                        <div className='bg-white absolute -top-[8px] -right-[8px] p-1 rounded-full cursor-pointer select-none'>
                                            <img src="/icons/x.svg" alt="" />
                                        </div>
                                        <img src="/images/cow-1.png" alt="" className='w-full h-full rounded-[20px]' />
                                    </div>
                                    <div className='bg-[#d9d9d9] block h-[180px] aspect-square rounded-[20px] relative'>
                                        <div className='bg-white absolute -top-[8px] -right-[8px] p-1 rounded-full cursor-pointer select-none'>
                                            <img src="/icons/x.svg" alt="" />
                                        </div>
                                        <img src="/images/cow-2.png" alt="" className='w-full h-full rounded-[20px]' />
                                    </div>
                                    <div className='bg-[#d9d9d9] block h-[180px] aspect-square rounded-[20px] relative'>
                                        <div className='bg-white absolute -top-[8px] -right-[8px] p-1 rounded-full cursor-pointer select-none'>
                                            <img src="/icons/x.svg" alt="" />
                                        </div>
                                        <img src="/images/cow-3.png" alt="" className='w-full h-full rounded-[20px]' />
                                    </div>
                                    <label htmlFor='image' className='bg-[#ffffff] cursor-pointer block h-[180px] aspect-square rounded-[20px]'>
                                        <div className='w-full h-full flex justify-center items-center'>
                                            <img src="/icons/image.svg" alt="" className='w-[30px] aspect-square' />
                                        </div>
                                    </label>
                                </div>
                                <input type="file" name="" id="image" className='hidden' />
                            </div>
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
                        <SelectInput id='category' label='Category' options={['Category 1', 'Category 2', 'Category 3']} onChange={() => { }} onClear={() => { }} value='' />
                    </div>
                    <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                        <h3 className='font-semibold text-xl'>Product promotion</h3>
                        <SelectInput id='category' label='Promo campaign (optional)' options={['Category 1', 'Category 2', 'Category 3']} onChange={() => { }} onClear={() => { }} value='' />
                        <TextAreaInput id='description' placeholder='Enter tags for the product' label='Tags' onChange={() => { }} onClear={() => { }} value='' />
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <PrimaryButton padding={'md'} name='Save' onClick={() => { }} disabled />
            </div>
        </div>
    )
}

export default page