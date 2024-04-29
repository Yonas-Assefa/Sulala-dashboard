'use client'
import React from 'react'

type Props = {
    password: string
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    placeholder: string
    name: string
    id: string
}

function PasswordInput({ label, placeholder, name, id, password, handlePasswordChange }: Props) {

    const [showPassword, setShowPassword] = React.useState(false)

    const toggleShowHidePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <label htmlFor={id} className='self-start text-black'>{label}</label>
            <div className='flex items-center px-3 justify-between gap-0 border focus-within:border-primary rounded-[40px] w-full'>

                <input
                    id={id}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder || 'Type here'}
                    className="input w-full max-w-xs bg-white rounded-r-[30px] focus:border-0 focus:outline-none"
                    onChange={handlePasswordChange}
                    value={password}
                    autoComplete='false'
                />
                {showPassword ?
                    <button
                        onClick={toggleShowHidePassword}>
                        <img src="/opened-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button> :
                    <button
                        onClick={toggleShowHidePassword}>
                        <img src="/closed-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button>
                }
            </div>
        </div>
    )
}

export default PasswordInput