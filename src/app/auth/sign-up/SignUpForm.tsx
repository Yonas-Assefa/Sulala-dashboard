'use client'
import SignInWithEmail from '@/components/SignInWithEmail'
import SignInWithPhone from '@/components/SignInWithPhone'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { validateSignup } from '@/services/validate.service'
import { signup } from '@/services/api.service'
import React from 'react'
import { TSignup } from '@/types/api-service.type'

type SignUpProps = {
    by: "phone" | "email" | undefined
}

function SignUpForm({ by }: SignUpProps) {

    const { fieldErrors, onSubmit, loading } = useFormSubmit<TSignup>({
        Fn: signup,
        Opt: {
            successMessage: ({ data }) => (data.email) ?
                'Signup successful! Check your email for the verification link' :
                'Signup successful! Check your message for the verification code',
            failureMessage: 'Failed to sign up',
            successRedirectUrl: ({ data }) => (data.email) ? '' :
                `/auth/enter-otp?phone=${data.phone_number}&action=signup`
        },
        validate: validateSignup
    })

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-6 w-full px-10'>
            {/* SIGN IN INPUT */}
            {by !== 'email' ?
                <SignInWithPhone error={fieldErrors?.phone_number?.[0]} /> :
                <SignInWithEmail emailError={fieldErrors?.email?.[0]} takePassword={false} />}

            <input type='text' hidden name='by' value={by} />

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className='w-full flex flex-col'>
                    <PrimaryButton name='Continue' type='submit' isLoading={loading} />
                </div>


                <p className='text-[#70757f]'>Already have an account?</p>
                <SecondaryButton name='Sign in' href={'/auth/sign-in'} />

            </div>
        </form>
    )
}

export default SignUpForm