import PrimaryButton from '@/components/common/ui/PrimaryButton'
import React from 'react'
import SummaryDescription from '../common/SummaryDescription'
import GeneralInfoCard from './GeneralInfoCard'
import PromotionalDiscountCard from './PromotionalDiscountCard'
import BudgetingCard from './BudgetingCard'

function ProductDiscountAdsForm() {
    return (
        <div className='grid grid-cols-3 gap-6'>
            <div className='col-span-2 flex flex-col gap-5 bg-white'>
                <GeneralInfoCard />
                <PromotionalDiscountCard />
                <BudgetingCard />
                <div className="flex flex-row">
                    <PrimaryButton padding={'md'} name='Pay & Schedule' disabled />
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