'use client';
import React from 'react';
import TextInput from './TextInput';
import CustomMultiSelectInput from './SelectInput';
import { RadioInputSchema } from '@/types/input-field.type';
import { CustomRadioInputProps as Props } from '@/types/props.type';

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

function CustomRadioWithConditionalInput({ name, setValue: emitChange, value: extVal, inputForEach, showLabel, id, data, error, childError }: Props) {
    const [input, setInput] = React.useState<string>();

    if (!isRadioInputSchema(data)) {
        throw new Error('Invalid RadioInputSchema');
    }

    const props = {
        parentProps: {},
        childProps: {},
    };

    if (emitChange) {
        Object.assign(props.parentProps, {
            onClick: (e: React.ChangeEvent<HTMLInputElement>) => emitChange(
                (previousValue: any) => ({
                    ...previousValue,
                    parent_value: e.target.id,
                    child_value: inputForEach ? '' : previousValue?.child_value,
                })
            ),
            value: extVal?.parent_value,
        });
        Object.assign(props.childProps, {
            setValue: (value: string) => emitChange(
                (previousValue: any) => ({
                    ...previousValue,
                    child_value: value,
                })
            ),
            value: extVal?.child_value,
        });
    }

    return (
        <div className='flex flex-col gap-5'>
            {showLabel && <p className="font-semibold">{data.label}</p>}
            {data.options.map((radioInput) => (
                <div className='flex flex-col gap-3' key={radioInput.id}>
                    {/* LABEL FOR EACH RADIO BUTTON */}
                    <label htmlFor={radioInput.id} className={`flex flex-row gap-2 items-center cursor-pointer`}>
                        <input {...props.parentProps} type="radio" name={name} onChange={() => setInput(radioInput.id)} checked={radioInput.id == input} id={radioInput.id} className={`radio ${error ? 'radio-error border-danger' : 'radio-success border-secondary'}`} />
                        <span className='capitalize'>{radioInput.label}</span>
                    </label>
                    {inputForEach && radioInput?.input && radioInput.id == input &&
                        // INPUT FOR EACH RADIO BUTTON
                        <div className={`w-full check grid grid-cols-2 gap-4`}>
                            {
                                Array.isArray(radioInput.input) ?
                                    radioInput.input.map((input) => (
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
                                            {...props.childProps}
                                        />
                                    ))
                                    :
                                    <TextInput
                                        label={radioInput.input.label}
                                        placeholder={radioInput.input.placeholder}
                                        error={
                                            Array.isArray(childError[radioInput.input.id]) ?
                                                childError[radioInput.input.id][0] :
                                                childError[radioInput.input.id]
                                        }
                                        name={radioInput.input.id}
                                        id={radioInput.input.id}
                                        {...props.childProps}
                                    />
                            }
                        </div>
                    }
                </div>
            ))}
            {!inputForEach && data?.input && input &&
                // INPUT FOR WHOLE CHECKBOX
                <div className='w-full check grid grid-cols-2 gap-4'>
                    {
                        Array.isArray(data.input) ?
                            data.input.map((input) => (
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
                                    {...props.childProps}
                                />
                            ))
                            :
                            <TextInput
                                label={data.input.label}
                                placeholder={data.input.placeholder}
                                error={
                                    Array.isArray(childError[data.input.id]) ?
                                        childError[data.input.id][0] :
                                        childError[data.input.id]
                                }
                                name={data.input.id}
                                id={data.input.id}
                                {...props.childProps}
                            />
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
