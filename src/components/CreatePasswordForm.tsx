'use client'
import React from 'react'

function CreatePasswordForm() {
    const [password, setPassword] = React.useState('')
    const [passwordConfirm, setPasswordConfirm] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false)

    const toggleShowHidePassword = () => {
        setShowPassword(!showPassword)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const toggleShowHidePasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm)
    }

    const handlePasswordChangeConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value)
    }

    return (
        <div className='flex flex-col gap-3 w-full items-center'>
            <div className='flex items-center px-3 justify-between gap-0 border focus-within:border-primary rounded-[40px] w-full'>

                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name='password'
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

            <div className='flex items-center px-3 justify-between gap-0 border focus-within:border-primary rounded-[40px] w-full'>

                <input
                    type={showPasswordConfirm ? 'text' : 'password'}
                    placeholder="Confirm password"
                    name='password-confirm'
                    className="input w-full max-w-xs bg-white rounded-r-[30px] focus:border-0 focus:outline-none"
                    onChange={handlePasswordChangeConfirm}
                    value={passwordConfirm}
                    autoComplete='false'
                />
                {showPasswordConfirm ?
                    <button
                        onClick={toggleShowHidePasswordConfirm}>
                        <img src="/opened-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button> :
                    <button
                        onClick={toggleShowHidePasswordConfirm}>
                        <img src="/closed-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button>
                }
            </div>
        </div>
    )
}

export default CreatePasswordForm