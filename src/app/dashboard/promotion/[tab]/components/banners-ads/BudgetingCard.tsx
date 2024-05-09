import TextInput from '@/components/common/form/TextInput'
import React from 'react'

function BudgetingCard() {
    return (
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
    )
}

export default BudgetingCard