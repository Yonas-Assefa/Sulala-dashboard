'use client';
import React from 'react';
import TextInput from './TextInput';
import CustomMultiSelectInput from './SelectInput';
import { RadioInputSchema } from '@/types/input-field.type';
import { CustomRadioInputProps as Props } from '@/types/props.type';
import { convertToArray } from '@/utils/convertObjToArray';

const isRadioInputOptions = (obj: any): obj is RadioInputOptions => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.label === 'string' &&
        typeof obj.value === 'string' &&
        (obj.input === undefined || typeof obj.input === 'object')
    );
};

const isRadioInputSchema = (obj: any): obj is RadioInputSchema => {
    return (
        isRadioInputOptions(obj) &&
        'options' in obj &&
        Array.isArray(obj.options) &&
        obj.options.every(isRadioInputOptions)
    );
};

function CustomRadioWithConditionalInput({
    name,
    setValue: emitChange,
    value: extVal,
    inputForEach,
    showLabel,
    id,
    data,
    error,
    childError,
    childSetValue,
    childValue
}: Props) {
    const [input, setInput] = React.useState<string>();

    if (!isRadioInputSchema(data)) {
        throw new Error('Invalid RadioInputSchema');
    }

    const props = {};

    if (emitChange) {
        Object.assign(props, {
            onClick: (e: React.ChangeEvent<HTMLInputElement>) => emitChange(e.target.id),
            value: extVal,
        });
    }

    return (
        <div className='flex flex-col gap-5'>
            {showLabel && <p className="font-semibold">{data.label}</p>}
            {data.options.map((radioInput) => (
                <div className='flex flex-col gap-3' key={radioInput.id}>
                    {/* LABEL FOR EACH RADIO BUTTON */}
                    <label htmlFor={radioInput.id} className={`flex flex-row gap-2 items-center cursor-pointer`}>
                        <input {...props} type="radio" name={name} onChange={() => setInput(radioInput.id)} checked={radioInput.id == input} id={radioInput.id} className={`radio ${error ? 'radio-error border-danger' : 'radio-success border-secondary'}`} />
                        <span className='capitalize'>{radioInput.label}</span>
                    </label>
                    {inputForEach && radioInput?.input && radioInput.id == input &&
                        // INPUT FOR EACH RADIO BUTTON
                        <div className={`w-full check grid grid-cols-2 gap-4`}>
                            {
                                convertToArray(radioInput.input).map((input) => {
                                    const props = {}
                                    if (childError[input.id]) {
                                        Object.assign(props, {
                                            error: childError[input.id]
                                        })
                                    }
                                    if (childValue[input.id]) {
                                        Object.assign(props, {
                                            value: childValue[input.id]
                                        })
                                    }
                                    if (childSetValue[input.id]) {
                                        Object.assign(props, {
                                            setValue: childSetValue[input.id]
                                        })
                                    }

                                    return (
                                        <TextInput
                                            key={input.id}
                                            label={input.label}
                                            placeholder={input.placeholder}
                                            error={
                                                Array.isArray(childError[input.id]) ?
                                                    childError[input.id][0] :
                                                    childError[input.id]
                                            }
                                            name={input.id}
                                            id={input.id}
                                            {...props}
                                        />
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            ))}
            {!inputForEach && data?.input && input &&
                // INPUT FOR WHOLE CHECKBOX
                <div className='w-full check grid grid-cols-2 gap-4'>
                    {
                        convertToArray(data.input).map((input) => {

                            const props = {}
                            if (childError[input.id]) {
                                Object.assign(props, {
                                    error: childError[input.id]
                                })
                            }
                            if (childValue[input.id]) {
                                Object.assign(props, {
                                    value: childValue[input.id]
                                })
                            }
                            if (childSetValue[input.id]) {
                                Object.assign(props, {
                                    setValue: childSetValue[input.id]
                                })
                            }

                            return (
                                <TextInput
                                    key={input.id}
                                    label={input.label}
                                    placeholder={input.placeholder}
                                    error={
                                        Array.isArray(childError[input.id]) ?
                                            childError[input.id][0] :
                                            childError[input.id]
                                    }
                                    name={input.id}
                                    id={input.id}
                                    {...props}
                                />
                            )
                        })
                    }
                </div>
            }
            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </div>
    );
}

export default CustomRadioWithConditionalInput;
