'use client';
import React from 'react';
import TextInput from './TextInput';
import CustomMultiSelectInput from './SelectInput';
import radioInputsForEachInput from '@/constants/radio-input-foreach.placeholder.json';
import radioInputs from '@/constants/radio-input.placeholder.json';
import { RadioInputSchema } from '@/types/input-field.type';
import { CustomRadioInputProps as Props } from '@/types/props.type';

function CustomRadioWithConditionalInput({ inputForEach, showLabel, id, data }: Props) {
    const inputData = data || (inputForEach ? radioInputsForEachInput : radioInputs) as RadioInputSchema;
    const [input, setInput] = React.useState<string>();

    return (
        <div className='flex flex-col gap-5'>
            {showLabel && <p className="font-semibold">{inputData.label}</p>}
            {inputData.options.map((radioInput) => (
                <div className='flex flex-col gap-3' key={radioInput.id}>
                    {/* LABEL FOR EACH RADIO BUTTON */}
                    <label htmlFor={id + radioInput.id} className={`flex flex-row gap-2 items-center cursor-pointer`}>
                        <input type="radio" name={id} onChange={() => setInput(radioInput.id)} checked={radioInput.id == input} id={id + radioInput.id} className="radio radio-success border-secondary" />
                        <span className='capitalize'>{radioInput.label}</span>
                    </label>
                    {inputForEach && radioInput?.input && radioInput.id == input &&
                        // INPUT FOR EACH RADIO BUTTON
                        <div className={`w-1/2 check block`}>
                            {radioInput.input.type === 'text' ?
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
                            }
                        </div>
                    }
                </div>
            ))}
            {!inputForEach && inputData?.input && input &&
                // INPUT FOR WHOLE CHECKBOX
                <div className='w-1/2 check block'>
                    {inputData.input.type === 'text' ?
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
                    }
                </div>
            }
        </div>
    );
}

export default CustomRadioWithConditionalInput;
