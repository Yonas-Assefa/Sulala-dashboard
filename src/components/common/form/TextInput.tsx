'use client'
import { TextInputProps } from '@/types/props.type'
import React from 'react'

function TextInput({ value: otVal, setValue: emitVal, id, placeholder, label, name, autoComplete, error, type = 'text', defaultValue, dynamicPlaceholder = /\d{2}\.\d{2}\.\d{4}/ }: TextInputProps) {
    const [value, setValue] = React.useState(defaultValue || otVal || '')

    React.useEffect(() => {
        if (setValue && defaultValue) {
            setValue(defaultValue)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        emitVal && emitVal(e.target.value)
    }

    const handleClear = () => {
        setValue('')
        emitVal && emitVal('')
    }

    return (
        <label htmlFor={id} className='flex flex-col gap-3'>
            <p className='self-start text-black'>{label}</p>
            <div className={`flex items-center px-3 justify-between gap-0 border rounded-[40px] w-full ${error ? 'bg-dangerlight border-danger' : 'bg-white focus-within:border-primary'}`}>
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder || 'Type here'}
                    name={name || 'text-input'}
                    className='input w-full max-w-xs bg-transparent focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none'
                    autoComplete={autoComplete || 'false'}
                    value={value}
                    onChange={handleChange}
                    defaultValue={defaultValue}
                // {...props}
                />
                {value &&
                    <button type='button' onClick={handleClear}>
                        <img src="/x-circle.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button>
                }
            </div >
            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </label>
    )
}

export default TextInput