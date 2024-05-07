import DateInput from '@/components/common/DateInput'
import PrimaryButton from '@/components/common/PrimaryButton'
import CustomMultiSelectInput from '@/components/common/SelectInput'
import TextAreaInput from '@/components/common/TextAreaInput'
import TextInput from '@/components/common/TextInput'
import React from 'react'
import SummaryDescription from './SummaryDescription'
import ImageUnselectButton from '@/components/common/ImageUnselectButton'

function ProductDiscountAdsForm() {
    return (
        <div className='grid grid-cols-3 gap-6'>
            <div className='col-span-2 flex flex-col gap-5 bg-white'>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>General Info</h3>
                    <div className='max-w-[1300px] gap-5 flex flex-col'>
                        <TextInput id='campagn-name' placeholder='Enter campaign name' label='Campaign name' onChange={() => { }} onClear={() => { }} value='' />
                        <CustomMultiSelectInput id='products' label='Products list' placeholder='Select products' multi={true} nested={false} withImage={true} onChange={() => { }} onClear={() => { }} value='' />
                        <TextAreaInput id='description' placeholder='Enter description/promotional quotes' label='Description/Promotional quotes' onChange={() => { }} onClear={() => { }} value='' />
                        <div className="grid grid-cols-2">
                            <DateInput label='Start date & time' />
                            <DateInput label='End date & time' />
                        </div>
                        <div className="col-span-2">
                            <div className='flex flex-col gap-1'>
                                <p>Banner Ads</p>
                                {/* <label htmlFor="image" className='flex flex-col items-center justify-center gap-5 cursor-pointer w-full bg-white p-4 border rounded-[30px] border-dashed h-[300px]'>
                            <img src="/icons/image.svg" alt="" />
                            <div className='flex flex-col justify-center items-center text-secondary'>
                                <p>Upload banner. JPEG, PNG</p>
                                <p>Maximum size 20 MB</p>
                            </div>
                            <div className='flex gap-2'>
                                <img src="/icons/upload.svg" alt="" className='w-[15px]' />
                                <p className='text-primary font-semibold'>Upload</p>
                            </div>
                        </label> */}
                                <div className='w-full'>
                                    <div className='bg-[#d9d9d9] block rounded-[20px] relative'>
                                        <ImageUnselectButton />
                                        <img src="/images/banner.png" alt="" className='w-full h-full rounded-[20px]' />
                                    </div>
                                </div>
                                <input type="file" name="" id="image" className='hidden' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>Promotional discount type</h3>
                    <div className='max-w-[1300px] gap-6 flex flex-col'>
                        {
                            [
                                {
                                    name: 'percentage off',
                                    id: 'percentage_off'
                                }, {
                                    name: 'one plus one',
                                    id: 'one_plus_one'
                                }, {
                                    name: 'limited price',
                                    id: 'limited_price'
                                }, {
                                    name: 'percentage off the minimum cart size',
                                    id: 'percentage_off_the_minimum_cart_size'
                                }, {
                                    name: 'free shipping',
                                    id: 'free_shipping'
                                }, {
                                    name: 'none',
                                    id: 'none'
                                }
                            ]
                                .map((item) => {
                                    return (
                                        <div className='flex flex-col gap-5 ' key={item.id}>
                                            <label htmlFor={item.id} className='peer flex flex-row gap-2 items-center cursor-pointer'>
                                                <input type="radio" name="dicount_type" id={item.id} className="radio radio-success border-secondary" />
                                                <span className='capitalize'>{item.name}</span>
                                            </label>
                                            <div className='w-1/2 check hidden peer-has-[:checked]:block '>
                                                <TextInput label='Discount amount %' placeholder='Enter discount amount' onChange={() => { }} onClear={() => { }} value='' />
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>Budgeting</h3>
                    <div className='max-w-[1300px] gap-6 flex flex-col'>
                        <div className='flex flex-col gap-5 group'>
                            <label htmlFor='daily_budgeting' className='flex flex-row gap-2 items-center cursor-pointer'>
                                <input type="radio" name="budgeting" id='daily_budgeting' className="radio radio-success border-secondary" />
                                <span className='capitalize'>Daily budgeting</span>
                            </label>
                            <label htmlFor='weekly_budgeting' className='flex flex-row gap-2 items-center cursor-pointer'>
                                <input type="radio" name="budgeting" id='weekly_budgeting' className="radio radio-success border-secondary" />
                                <span className='capitalize'>Weekly budgeting</span>
                            </label>
                            <div className='w-1/2 check hidden group-has-[:checked]:block '>
                                <TextInput label='Budget' placeholder='Enter your budget' onChange={() => { }} onClear={() => { }} value='' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row">
                    <PrimaryButton padding={'md'} name='Pay & Schedule' onClick={() => { }} disabled />
                </div>

            </div>
            <div className='col-span-1 bg-white flex flex-col gap-8'>
                <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                    <h3 className='font-semibold text-xl'>Summary</h3>
                    <SummaryDescription title='Campaign name' description='promo 1' />
                    <SummaryDescription title='Products' description='Milktech Silver Premium Calf & Foal Milk Replace 20kg &nbsp; EquiGLOSS 2in1 Conditioning Shampoo 500ml &nbsp; Pet, Horse & Cattle Shampoo' />
                    <SummaryDescription title='Description' description='Milktech Silver Premium Calf & Foal Milk Replace 20kg &nbsp; EEquiGLOSS 2in1 Conditioning Shampoo &nbsp; Pet, Horse & Cattle Shampoo' />
                    <SummaryDescription title='Start date & time' description='14.04.2024 &nbsp; &nbsp; 09:00 AM' />
                    <SummaryDescription title='End date & time' description='20.04.2024 &nbsp; &nbsp; 10:00 AM' />
                    <SummaryDescription title='Banner' description='Uploaded' />
                    <SummaryDescription title='Promotional discount type' description='Percantage off' />
                    <SummaryDescription title='Discount amount' description='5%' />
                    <SummaryDescription title='Destination' description='List of products' />
                    <SummaryDescription title='Budgeting' description='Daily budget' />
                    <SummaryDescription title='Budget' description='$40' />
                </div>
            </div>
        </div>
    )
}

export default ProductDiscountAdsForm