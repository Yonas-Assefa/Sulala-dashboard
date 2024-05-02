import React from 'react'
import TextInput from './TextInput'
import CustomMultiSelectInput from './SelectInput'

type Props = {
    inputForEach?: boolean
    showLabel?: boolean
}

function CustomRadioWithConditionalInput({ inputForEach = true, showLabel }: Props) {

    type RadioInputOptions = {
        id: string
        label: string
        value: string
        input?: React.ReactNode
    }

    type RadioInput = Omit<RadioInputOptions, 'value'> & {
        options: RadioInputOptions[]
    }

    const radioInputsForEachInput: RadioInput = {
        id: 'promotional_discount_type',
        label: 'Promotional discount type',
        options: [
            {
                id: 'percentage_off_1',
                label: 'Percentage off',
                value: 'percentage_off',
                input: <TextInput label='Discount amount' placeholder='Enter discount amount' onChange={() => { }} onClear={() => { }} value='' />
            },
            {
                id: 'one_plus_one_2',
                label: 'One plus one',
                value: 'one_plus_one',
                input: <CustomMultiSelectInput label='Budget' placeholder='Enter your budget' onChange={() => { }} onClear={() => { }} value='' />
            },
            {
                id: 'limited_price_3',
                label: 'Limited price',
                value: 'limited_price',
                input: <TextInput label='Discount amount' placeholder='Enter discount amount' onChange={() => { }} onClear={() => { }} value='' />
            },
            {
                id: 'percentage_off_the_minimum_cart_size_4',
                label: 'Percentage off the minimum cart size',
                value: 'percentage_off_the_minimum_cart_size',
                input: <TextInput label='Discount amount' placeholder='Enter discount amount' onChange={() => { }} onClear={() => { }} value='' />
            },
            {
                id: 'free_shipping_5',
                label: 'Free shipping',
                value: 'free_shipping',
                input: <TextInput label='Discount amount' placeholder='Enter discount amount' onChange={() => { }} onClear={() => { }} value='' />
            },
            {
                id: 'none_6',
                label: 'None',
                value: 'none',
                input: <CustomMultiSelectInput label='Budget' placeholder='Enter your budget' onChange={() => { }} onClear={() => { }} value='' />
            }
        ],
    }

    const radioInputs: RadioInput = {
        id: 'daily_budgeting',
        label: 'Daily budgeting',
        options: [
            {
                id: 'daily_budgeting_1',
                label: 'Daily budgeting',
                value: 'daily_budgeting',
            },
            {
                id: 'weekly_budgeting_2',
                label: 'Weekly budgeting',
                value: 'weekly_budgeting',
            }
        ],
        input: <TextInput label='Budget' placeholder='Enter your budget' onChange={() => { }} onClear={() => { }} value='' />
    }

    const data = inputForEach ? radioInputsForEachInput : radioInputs

    return (
        <div className='flex flex-col gap-5 group' >
            {showLabel && <p className="font-semibold">{data.label}</p>}
            {
                radioInputsForEachInput.options.map((radioInput, index) => {
                    const peerId = `peer/${index + 1}`
                    const peerHasChecked = `peer-has-[:checked]/${index + 1}:block`
                    return (
                        <>
                            <label htmlFor={radioInput.id} className={`${peerId} flex flex-row gap-2 items-center cursor-pointer`}>
                                <input type="radio" name="dicount_type" id={radioInput.id} className="radio radio-success border-secondary" />
                                <span className='capitalize'>{radioInput.label}</span>
                            </label>
                            {inputForEach &&
                                <div className={`w-1/2 check hidden ${peerHasChecked} `}>
                                    {radioInput?.input}
                                </div>
                            }
                        </>
                    )
                })
            }
            {
                !inputForEach &&
                <div className='w-1/2 check hidden group-has-[:checked]:block '>
                    {data?.input}
                </div>
            }
        </div >
    )
}

export default CustomRadioWithConditionalInput