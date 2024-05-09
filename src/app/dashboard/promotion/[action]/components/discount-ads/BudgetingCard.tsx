import CustomRadioWithConditionalInput from '@/components/common/form/RadioWithConditionalInput'
import React from 'react'

function BudgetingCard() {
    return (
        <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
            <h3 className='font-semibold text-xl'>Budgeting</h3>
            <div className='max-w-[1300px] gap-6 flex flex-col'>
                <CustomRadioWithConditionalInput inputForEach={false} key={'budgeting'} id={'budgeting'} />
            </div>
        </div>
    )
}

export default BudgetingCard