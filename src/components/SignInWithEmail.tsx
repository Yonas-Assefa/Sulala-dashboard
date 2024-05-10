'use client'
import { error } from 'console'
import React, { ElementRef } from 'react'

type Props = {
    error?: string
    takePassword?: boolean
}
function SignInWithEmail({ takePassword = true, error }: Props) {
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
                <div className={`flex items-center px-3 justify-between gap-0 border rounded-[40px] w-full ${error ? 'bg-dangerlight border-danger' : 'bg-white focus-within:border-primary'}`}>
                    <input
                        type="text"
                        placeholder="Type here"
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
                {error && <span className="text-xs text-danger">
                    {error}
                </span>}
            </div>

            {takePassword &&
                <>
                    <label htmlFor="password" className='self-start'>Password</label>
                    <div className='flex items-center bg-white px-3 justify-between gap-0 border focus-within:border-primary rounded-[40px] w-full'>

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
                                onClick={toggleShowHidePassword}>
                                <img src="/opened-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                            </button> :
                            <button
                                onClick={toggleShowHidePassword}>
                                <img src="/closed-eye.svg" alt="" className='mr-0 stroke-emerald-500' />
                            </button>
                        }
                    </div>
                </>}
        </div>
    )
}

export default SignInWithEmail