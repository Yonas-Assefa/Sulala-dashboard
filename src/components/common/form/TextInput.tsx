'use client'
import { TextInputProps } from '@/types/props.type'
import React from 'react'

function TextInput({ id, placeholder, label, name, autoComplete, error, ...props }: TextInputProps) {
    return (
        <label htmlFor={id} >
            <p className='self-start text-black'>{label}</p>
            <div className={`flex items-center px-3 justify-between gap-0 border rounded-[40px] w-full ${error ? 'bg-dangerlight border-danger' : 'bg-white focus-within:border-primary'}`}>
                <input
                    id={id}
                    type="text"
                    placeholder={placeholder || 'Type here'}
                    name={name || 'text-input'}
                    className='input w-full max-w-xs bg-transparent focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none'
                    autoComplete={autoComplete || 'false'}
                />
                {false &&
                    <button>
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