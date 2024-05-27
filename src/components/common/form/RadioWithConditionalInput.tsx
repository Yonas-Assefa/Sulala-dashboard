'use client';
import React, { useEffect, useState } from 'react';
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

type ChildInputProps = {
    childDefaultValue: any,
    childError: any,
    childOptions: any,
    childSetValue: any,
    childValue: any,
    input: any
}

function ChildInput({ childDefaultValue, childError, childOptions, childSetValue, childValue, input }: ChildInputProps) {
    const props = { ...input.props }

    // IF CHILD ERROR EXIST WITH INPUT ID, IT ASSIGNS IT TO THE INPUT
    if (childError[input.id]) {
        Object.assign(props, {
            error: childError[input.id]
        })
    }

    // IF CHILD VALUE EXIST WITH INPUT ID, IT ASSIGNS IT TO THE INPUT
    if (childValue[input.id]) {
        Object.assign(props, {
            value: childValue[input.id]
        })
    }

    // IF CHILD SET-VALUE EXIST WITH INPUT ID, IT ASSIGNS IT TO THE INPUT
    if (childSetValue[input.id]) {
        Object.assign(props, {
            setValue: childSetValue[input.id]
        })
    }

    // IF CHILD DEFAULT VALUE EXIST WITH INPUT ID, IT ASSIGNS IT TO THE INPUT   
    if (childDefaultValue[input.id]) {
        Object.assign(props, {
            defaultValue: childDefaultValue[input.id]
        })
    }

    React.useEffect(() => {
        // SETS THE DEFUALT VALUE FOR INPUT ON INITIAL
        if (childDefaultValue[input.id]) {
            childSetValue[input.id](childDefaultValue[input.id])
        }
    }, [])

    if (input.type == 'select') {
        return (
            <CustomMultiSelectInput
                label={input.label}
                data={childOptions[input.id]}
                key={input.id}
                placeholder={input.placeholder}
                id={input.id}
                name={input.id}
                {...props}
            />)
    }
    return (
        <TextInput
            key={input.id}
            label={input.label}
            placeholder={input.placeholder}
            name={input.id}
            id={input.id}
            {...props}
        />
    )
}

function CustomRadioWithConditionalInput({
    name,
    setValue: emitChange,
    value: extVal,
    defaultValue,
    inputForEach,
    showLabel,
    id,
    data,
    error,
    childError,
    childSetValue,
    childValue,
    childOptions,
    childDefaultValue
}: Props) {
    const [input, setInput] = React.useState<string>(defaultValue || '');

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

    useEffect(() => {
        if (defaultValue && emitChange) {
            emitChange(defaultValue)
        }
    }, [])

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
                        <div className={`w-full check grid grid-cols-1 md:grid-cols-2 gap-4`}>
                            {
                                convertToArray(radioInput.input).map((input) =>
                                (<ChildInput
                                    childDefaultValue={childDefaultValue}
                                    childError={childError}
                                    childOptions={childOptions}
                                    childSetValue={childSetValue}
                                    childValue={childValue}
                                    input={input}
                                />)
                                )
                            }
                        </div>
                    }
                </div>
            ))}
            {!inputForEach && data?.input && input &&
                // INPUT FOR WHOLE CHECKBOX
                <div className='w-full check grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {
                        convertToArray(data.input).map((input) => (
                            <ChildInput
                                childDefaultValue={childDefaultValue}
                                childError={childError}
                                childOptions={childOptions}
                                childSetValue={childSetValue}
                                childValue={childValue}
                                input={input}
                            />))
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
