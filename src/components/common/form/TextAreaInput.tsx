import React, { useEffect } from 'react'

type Props = {
    id?: string
    value?: string
    setValue?: (value: string) => void
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    label?: string
    name?: string
    autoComplete?: string
    error?: string
    onClear?: () => void
    defaultValue?: string
    required?: boolean
}

function TextAreaInput({ id, name, label, placeholder, error, defaultValue, setValue, value, required }: Props) {
    const props = {}
    if (value) {
        Object.assign(props, { value })
    }
    if (setValue) {
        Object.assign(props, { onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value) })
    }

    useEffect(() => {
        if (setValue && defaultValue) {
            setValue(defaultValue)
        }
    }, [])
    return (
        <div className='flex flex-col gap-3'>
            <label htmlFor={id} className='self-start'>
                {label}
                {
                    required &&
                    <span className='text-danger'>*&nbsp;
                        <sup className='text-xs opacity-70'>(required)</sup></span>
                }
            </label>
            <textarea
                name={name}
                id={id}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={`textarea textarea-bordered rounded-[20px] textarea-lg w-full ${error ? 'bg-dangerlight border-danger' : 'bg-white'}`}
                {...props}
            ></textarea>
            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </div>
    )
}

export default TextAreaInput