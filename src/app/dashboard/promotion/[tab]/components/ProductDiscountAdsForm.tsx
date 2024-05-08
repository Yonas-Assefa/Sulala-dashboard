import DateInput from '@/components/common/form/DateInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import CustomMultiSelectInput from '@/components/common/form/SelectInput'
import TextAreaInput from '@/components/common/form/TextAreaInput'
import TextInput from '@/components/common/form/TextInput'
import React from 'react'
import SummaryDescription from './SummaryDescription'
import ImageUnselectButton from '@/components/common/ui/ImageUnselectButton'
import CustomRadioWithConditionalInput from '@/components/common/form/RadioWithConditionalInput'
import ImageListSelector from '@/components/common/form/ImageListSelector'

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
                            <ImageListSelector label='Banner Ads' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>Promotional discount type</h3>
                    <div className='max-w-[1300px] gap-6 flex flex-col'>
                        <CustomRadioWithConditionalInput inputForEach={true} key={'promo-discount-type'} id={'promo-discount-type'} />
                    </div>
                </div>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>Budgeting</h3>
                    <div className='max-w-[1300px] gap-6 flex flex-col'>
                        <CustomRadioWithConditionalInput inputForEach={false} key={'budgeting'} id={'budgeting'} />
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