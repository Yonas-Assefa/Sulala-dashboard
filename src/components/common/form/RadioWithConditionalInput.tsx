'use client'
import React from 'react'
import TextInput from './TextInput'
import CustomMultiSelectInput from './SelectInput'
import radioInputsForEachInput from '../../constants/radio-input-foreach.placeholder.json'
import radioInputs from '../../constants/radio-input.placeholder.json'
import { RadioInputSchema } from '@/types/input-field.type'
import { CustomRadioInputProps as Props } from '@/types/props.type'

function CustomRadioWithConditionalInput({ inputForEach, showLabel, id, data }: Props) {

    const inputData = data || (inputForEach ? radioInputsForEachInput : radioInputs) as RadioInputSchema

    return (
        <div className='flex flex-col gap-5 group' >
            {showLabel && <p className="font-semibold">{inputData.label}</p>}
            {
                inputData.options.map((radioInput) => {
                    return (
                        <div className='flex flex-col gap-3' key={radioInput.id}>
                            <label htmlFor={id + radioInput.id} className={`peer flex flex-row gap-2 items-center cursor-pointer`}>
                                <input type="radio" name={id} id={id + radioInput.id} className="radio radio-success border-secondary" />
                                <span className='capitalize'>{radioInput.label}</span>
                            </label>
                            {inputForEach && radioInput?.input &&
                                <div className={`w-1/2 check hidden peer-has-[:checked]:block `}>
                                    {
                                        (
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
                !inputForEach && inputData?.input &&
                <div className='w-1/2 check hidden group-has-[:checked]:block '>
                    {
                        (
                            inputData.input.type === 'text' ?
                                <TextInput
                                    label={inputData.input.label}
                                    placeholder={inputData.input.placeholder}
                                    onChange={() => { }}
                                    onClear={() => { }}
                                    value=''
                                />
                                :
                                <CustomMultiSelectInput
                                    label={inputData.input.label}
                                    placeholder={inputData.input.placeholder}
                                    options={inputData.input.options}
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