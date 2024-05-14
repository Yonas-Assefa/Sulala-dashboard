'use client'
import SignInWithEmail from '@/components/SignInWithEmail'
import SignInWithPhone from '@/components/SignInWithPhone'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { signin } from '@/services/api.service'
import { validateSignin } from '@/services/validate.service'
import { TSignin } from '@/types/api-service.type'
import React from 'react'

type SignInProps = {
    by: "phone" | "email" | undefined
}

function SignInForm({ by }: SignInProps) {

    const { fieldErrors, onSubmit, loading } = useFormSubmit<TSignin>({
        Fn: signin,
        Opt: {
            successMessage: ({ data }) => (data.email) ?
                'Signup successful! Check your email for the verification link' :
                'Signup successful! Check your message for the verification code',
            failureMessage: 'Failed to sign up',
            successRedirectUrl: ({ data }) => (data.email) ? '' :
                `/auth/enter-otp?phone=${data.phone_number}&action=signup`
        },
        validate: validateSignin
    })

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-6 w-full px-10'>
            {/* SIGN IN INPUT */}
            {by !== 'email' ?
                <SignInWithPhone error={fieldErrors?.phone_number?.[0]} /> :
                <SignInWithEmail emailError={fieldErrors?.email?.[0]} passwordError={fieldErrors?.password?.[0]} />
            }

            <input type='text' hidden name='by' value={by} />

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className='w-full flex flex-col'>
                    <PrimaryButton name='Sign in' type='submit' isLoading={loading} />
                </div>

                <p className='text-[#70757f] select-none'>Don't have an account?</p>
                <SecondaryButton name='Sign up' href={'/auth/sign-up'} />
            </div>
        </form>
    )
}

export default SignInForm