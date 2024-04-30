'use client'
import React, { ElementRef } from 'react'

function SignInWithEmail({ takePassword = true }) {
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
            <label htmlFor="email-address" className='self-start'>Email</label>
            <div className='flex items-center px-3 bg-white justify-between gap-0 border focus-within:border-primary rounded-[40px] w-full'>
                <input
                    type="text"
                    placeholder="Type here"
                    name='email-address'
                    className="input w-full max-w-xs bg-transparent focus:bg-transparent border-0 focus:border-0 active:border-0 focus:outline-none"
                    onChange={handleEmailAddress}
                    value={email}
                    ref={emailInput}
                    autoComplete='false'
                />
                {email &&
                    <button
                        onClick={clearEmailAddress}>
                        <img src="/x-circle.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button>
                }
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
                </>}
        </div>
    )
}

export default SignInWithEmail