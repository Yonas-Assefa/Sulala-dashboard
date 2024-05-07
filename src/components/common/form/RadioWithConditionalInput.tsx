import React from 'react'
import TextInput from './TextInput'
import CustomMultiSelectInput from './SelectInput'

type Props = {
    inputForEach?: boolean
    showLabel?: boolean
    id: string
}

function CustomRadioWithConditionalInput({ inputForEach, showLabel, id }: Props) {

    type InputMeta = {
        type: 'select' | 'text',
        placeholder: string
        options?: string[]
        label: string
    }

    type RadioInputOptions = {
        id: string
        label: string
        value: string
        input?: InputMeta
    }

    type RadioInput = RadioInputOptions & {
        options: RadioInputOptions[]
    }

    const radioInputsForEachInput: RadioInput = {
        id: 'promotional_discount_type',
        label: 'Promotional discount type',
        value: 'promotional_discount_type',
        options: [
            {
                id: 'percentage_off_1',
                label: 'Percentage off',
                value: 'percentage_off',
                input: {
                    label: 'Discount amount %',
                    placeholder: 'Enter discount amount',
                    type: 'text'
                }
            },
            {
                id: 'one_plus_one_2',
                label: 'One plus one',
                value: 'one_plus_one',
                input: {
                    label: 'Budget',
                    placeholder: 'Enter your budget',
                    type: 'select',
                }
            },
            {
                id: 'limited_price_3',
                label: 'Limited price',
                value: 'limited_price',
                input: {
                    label: 'Discount amount',
                    placeholder: 'Enter discount amount',
                    type: 'text'
                }
            },
            {
                id: 'percentage_off_the_minimum_cart_size_4',
                label: 'Percentage off the minimum cart size',
                value: 'percentage_off_the_minimum_cart_size',
                input: {
                    label: 'Discount amount',
                    placeholder: 'Enter discount amount',
                    type: 'text'
                }
            },
            {
                id: 'free_shipping_5',
                label: 'Free shipping',
                value: 'free_shipping',
                input: {
                    label: 'Discount amount',
                    placeholder: 'Enter discount amount',
                    type: 'text'
                }
            },
            {
                id: 'none_6',
                label: 'None',
                value: 'none',
            }
        ],
    }

    const radioInputs: RadioInput = {
        id: 'daily_budgeting',
        label: 'Daily budgeting',
        value: 'daily_budgeting',
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
        input: {
            label: 'Budget',
            placeholder: 'Enter your budget',
            type: 'text'
        }
    }

    console.log({ inputForEach })

    const data = inputForEach ? radioInputsForEachInput : radioInputs

    return (
        <div className='flex flex-col gap-5 group' >
            {showLabel && <p className="font-semibold">{data.label}</p>}
            {
                radioInputsForEachInput.options.map((radioInput) => {
                    return (
                        <div className='flex flex-col gap-3'>
                            <label htmlFor={id + radioInput.id} className={`peer flex flex-row gap-2 items-center cursor-pointer`}>
                                <input type="radio" name="dicount_type" id={id + radioInput.id} className="radio radio-success border-secondary" />
                                <span className='capitalize'>{radioInput.label}</span>
                            </label>
                            {inputForEach &&
                                <div className={`w-1/2 check hidden peer-has-[:checked]:block `}>
                                    {
                                        radioInput?.input && (
                                            radioInput.input.type === 'text' ?
                                                <TextInput
                                                    label={radioInput.input.label}
                                                    placeholder={radioInput.input.placeholder}
                                                    onChange={() => { }}
                                                    onClear={() => { }}
                                                    value=''
                                                />
                                                :
                                                <CustomMultiSelectInput
                                                    label={radioInput.input.label}
                                                    placeholder={radioInput.input.placeholder}
                                                    options={radioInput.input.options}
                                                    onChange={() => { }}
                                                    onClear={() => { }}
                                                    value=''
                                                />
                                        )
                                    }
                                </div>
                            }
                        </div>
                    )
                })
            }
            {
                !inputForEach &&
                <div className='w-1/2 check hidden group-has-[:checked]:block '>
                    {
                        data?.input && (
                            data.input.type === 'text' ?
                                <TextInput
                                    label={data.input.label}
                                    placeholder={data.input.placeholder}
                                    onChange={() => { }}
                                    onClear={() => { }}
                                    value=''
                                />
                                :
                                <CustomMultiSelectInput
                                    label={data.input.label}
                                    placeholder={data.input.placeholder}
                                    options={data.input.options}
                                    onChange={() => { }}
                                    onClear={() => { }}
                                    value=''
                                />

                        )}
                </div>
            }
        </div >
    )
}

export default CustomRadioWithConditionalInput