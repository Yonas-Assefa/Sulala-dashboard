'use client'
import React, { ElementRef } from 'react'

type Props = {
    emailError?: string
    passwordError?: string
    takePassword?: boolean
}
function SignInWithEmail({ takePassword = true, emailError, passwordError }: Props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const emailInput = React.useRef<ElementRef<'input'>>(null)

    const handleEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const clearEmailAddress = () => {
        setEmail('')
        emailInput.current?.focus()
    }

    const toggleShowHidePassword = () => {
        setShowPassword(!showPassword)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <div className='flex flex-col gap-3 w-full items-center'>
            <label htmlFor="email" className='self-start'>Email</label>
            <div className='w-full'>
                <div className={`flex items-center px-3 justify-between gap-0 border rounded-[40px] w-full ${emailError ? 'bg-dangerlight border-danger' : 'bg-white focus-within:border-primary'}`}>
                    <input
                        type="text"
                        placeholder="Enter email"
                        name='email'
                        className="input w-full max-w-xs bg-transparent focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none"
                        onChange={handleEmailAddress}
                        value={email}
                        ref={emailInput}
                        autoComplete="disabled"
                    />
                    {email &&
                        <button
                            onClick={clearEmailAddress}>
                            <img src="/x-circle.svg" alt="" className='mr-0 stroke-emerald-500' />
                        </button>
                    }
                </div>
                {emailError && <span className="text-xs text-danger">
                    {emailError}
                </span>}
            </div>

            {takePassword &&
                <>
                    <label htmlFor="password" className='self-start'>Password</label>
                    <div className='w-full'>
                        <div className={`flex items-center px-3 justify-between gap-0 border rounded-[40px] w-full ${passwordError ? 'bg-dangerlight border-danger' : 'bg-white focus-within:border-primary'}`}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Type here"
                                name='password'
                                className="input w-full max-w-xs bg-transparent focus:bg-transparent border-0 active:border-0 focus:border-0 focus:outline-none"
                                onChange={handlePasswordChange}
                                value={password}
                                autoComplete="disabled"
                            />
                            {showPassword ?
                                <button
                                    onClick={toggleShowHidePassword}
                                    type='button'>
                                    <img src="/opened-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                                </button> :
                                <button
                                    onClick={toggleShowHidePassword}
                                    type='button'>
                                    <img src="/closed-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                                </button>
                            }
                        </div>
                        {passwordError && <span className="text-xs text-danger">
                            {passwordError}
                        </span>}
                    </div>
                </>}
        </div>
    )
}

export default SignInWithEmail