import React from 'react'
import TextInput from './TextInput'

type Props = {
    label: string
    id: string
    name: string
    inputForEach?: boolean
}

{/*<div className='flex flex-col gap-5 group/custom'>
    <p className='font-semibold'>{label}</p>
    <label htmlFor='daily_budgeting_1' className='peer flex flex-row gap-2 items-center cursor-pointer'>
        <input type="radio" name="budgeting" id='daily_budgeting_1' className="radio radio-success border-secondary" />
        <span className='capitalize'>Daily budgeting</span>
    </label>
    <label htmlFor='weekly_budgeting_2' className='peer flex flex-row gap-2 items-center cursor-pointer'>
        <input type="radio" name="budgeting" id='weekly_budgeting_2' className="radio radio-success border-secondary" />
        <span className='capitalize'>Weekly budgeting</span>
    </label>
    <div className={`w-1/2 check hidden ${true ? 'peer-has-[:checked]:block' : 'group/customr-has-[:checked]:block'}`}>
        <TextInput label='Budget' placeholder='Enter your budget' onChange={() => { }} onClear={() => { }} value='' />
    </div>
</div>*/}

{/*
    <div className='flex flex-col gap-5 ' >
            <label htmlFor={'item.id/1'} className='peer/draft flex flex-row gap-2 items-center cursor-pointer'>
                <input type="radio" name="dicount_type" id={'item.id/1'} className="radio radio-success border-secondary" />
                <span className='capitalize'>{'item.name'}</span>
            </label>
            <div className='w-1/2 check hidden peer-has-[:checked]/draft:block '>
                <TextInput label='Discount amount %' placeholder='Enter discount amount' onChange={() => { }} onClear={() => { }} value='' />
            </div>
            <label htmlFor={'item.id/2'} className='peer/2 flex flex-row gap-2 items-center cursor-pointer'>
                <input type="radio" name="dicount_type" id={'item.id/2'} className="radio radio-success border-secondary" />
                <span className='capitalize'>{'item.name'}</span>
            </label>
            <div className='w-1/2 check hidden peer/2-has-[:checked]:block '>
                <TextInput label='Discount amount %' placeholder='Enter discount amount' onChange={() => { }} onClear={() => { }} value='' />
            </div>
        </div >
*/}

function CustomRadioWithConditionalInput({ label, id, name, inputForEach = true }: Props) {

    type InputTypesOptions = 'TEXT-INPUT' | 'SELECT-INPUT' | null
    type InputLoopOptions = 'PER-PEER' | 'PER-GROUP' | null

    type RadioInputOptions = {
        id: string
        label: string
        value: string
        input_label?: string
        input_placeholder?: string

    }

    type RadioInput = Omit<RadioInputOptions, 'value'> & {
        input: `${InputTypesOptions}_&_${InputLoopOptions}`
        options: RadioInputOptions[]
    }

    type InferValueFromColor<Color extends string> =
        Color extends `${infer N}_&_${infer C}`
        ? N extends InputTypesOptions
        ? C extends InputLoopOptions
        ? {
            input_type: N
            loop_type: C
        }
        : never
        : never
        : never

    type Test = InferValueFromColor<'SELECT-INPUT_&_PER-GROUP'>


    const test: Test = {
        input_type: 'SELECT-INPUT',
        loop_type: 'PER-PEER'
    }

    const radioInputs: RadioInput = {
        id: 'daily_budgeting',
        label: 'Daily budgeting',
        input: 'SELECT-INPUT_&_PER-GROUP',
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
    }

    return (
        <div className='flex flex-col gap-5 group' >
            {
                radioInputs.options.map((radioInput, index) => {
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
                    {radioInputs?.input}
                </div>
            }
        </div >
    )
}

export default CustomRadioWithConditionalInput