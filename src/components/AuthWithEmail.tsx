'use client'
import React, { ElementRef } from 'react'
import PasswordInput from './common/form/PasswordInput'
import TextInput from './common/form/TextInput'
import Link from 'next/link'

type Props = {
    emailError?: string
    passwordError?: string
    takePassword?: boolean
}
function AuthWithEmail({ takePassword = true, emailError, passwordError }: Props) {

    return (
        <div className='flex flex-col gap-5 w-full items-center'>
            <div className='w-full flex flex-col'>
                <TextInput
                    id='email'
                    name='email'
                    label='Email Address'
                    placeholder='Enter email address'
                    autoComplete='email'
                    error={emailError}
                />
            </div>

            {takePassword &&
                <div className='w-full flex flex-col gap-2'>
                    <PasswordInput
                        id='password'
                        name='password'
                        label='Password'
                        placeholder='Enter password'
                        showLabel
                        error={passwordError}
                    />
                    <div className='text-primary font-semibold'>
                        <Link href={'/auth/forgot-password'}>Forgot password?</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default AuthWithEmail