'use client'
import { TextInputProps } from '@/types/props.type'
import React from 'react'

function TextInput({ id, value, onChange, placeholder, label, name, autoComplete, error, onClear, ...props }: TextInputProps) {
    return (
        <label htmlFor={id} >
            <p className='self-start text-black'>{label}</p>
            <div className='flex bg-white items-center px-3 justify-between gap-0 border focus-within:border-primary rounded-[40px] w-full'>
                <input
                    id={id}
                    type="text"
                    placeholder={placeholder || 'Type here'}
                    name={name || 'text-input'}
                    className='input w-full max-w-xs bg-transparent focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none'
                    onChange={onChange}
                    // value={value}
                    autoComplete={autoComplete || 'false'}
                />
                {false &&
                    <button
                        onClick={onClear}>
                        <img src="/x-circle.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button>
                }
            </div >
        </label>
    )
}

export default TextInput