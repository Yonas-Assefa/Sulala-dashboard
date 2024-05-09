import CustomRadioWithConditionalInput from '@/components/common/form/RadioWithConditionalInput'
import React from 'react'

function PromotionalDiscountCard() {
    return (
        <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
            <h3 className='font-semibold text-xl'>Promotional discount type</h3>
            <div className='max-w-[1300px] gap-6 flex flex-col'>
                <CustomRadioWithConditionalInput inputForEach={true} key={'promo-discount-type'} id={'promo-discount-type'} />
            </div>
        </div>
    )
}

export default PromotionalDiscountCard