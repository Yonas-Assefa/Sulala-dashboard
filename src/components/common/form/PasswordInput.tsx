'use client'
import React from 'react'

type Props = {
    label: string
    placeholder: string
    name: string
    id: string
    showLabel: boolean
    error?: string
}

function PasswordInput({ label, placeholder, name, id, showLabel, error }: Props) {

    const [showPassword, setShowPassword] = React.useState(false)

    const toggleShowHidePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            {showLabel && <label htmlFor={id} className='self-start text-black'>{label}</label>}
            <div className={`flex items-center px-3 justify-between gap-0 border rounded-[40px] w-full ${error ? 'border-danger bg-dangerlight' : 'focus-within:border-primary'}`}>

                <input
                    id={id}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder || 'Type here'}
                    className='input text-black w-full max-w-xs bg-transparent focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none'
                    // className="input w-full max-w-xs bg-white rounded-r-[30px] focus:border-0 focus:outline-none"
                    autoComplete='false'
                />
                {showPassword ?
                    <button
                        onClick={toggleShowHidePassword}
                        type='button'
                    >
                        <img src="/opened-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button> :
                    <button
                        onClick={toggleShowHidePassword}
                        type='button'
                    >
                        <img src="/closed-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button>
                }
            </div>
            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </div>
    )
}

export default PasswordInput