'use client'
import { forgotPassword } from '@/actions/auth/forgot-password'
import AuthWithEmail from '@/components/AuthWithEmail'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import React, { useActionState } from 'react'
import { useFormState } from 'react-dom'

function ForgotPassword() {

    const [formState, action] = useFormState(forgotPassword, EMPTY_FORM_STATE)

    useToastMessage(formState)
    useRedirectRoute(formState)

    return (
        <div className='text-black w-10/12 flex flex-col gap-5 items-center'>
            {/* SIGN IN HEADER */}
            <h1 className='text-[50px] font-serif font-semibold'>Forgot password</h1>
            <div className='w-2/3'>
                <p className='text-center text-primary font-semibold text-sm'>Enter your email address to proceed with password reset</p>
            </div>
            <form action={action} className='flex flex-col gap-6 w-full px-10'>
                {/* SIGN IN INPUT */}
                <AuthWithEmail takePassword={false} emailError={formState?.fieldErrors?.email?.[0]} />
                <div className='flex flex-col gap-3 w-full items-center'>
                    <div className='w-full flex flex-col'>
                        <PrimaryButton name='Continue' type='submit' />
                    </div>


                    <p className='text-[#70757f]'>Already have an account?</p>
                    <SecondaryButton name='Sign in' href={'/auth/sign-in'} />

                </div>
            </form>
        </div >
    )
}

export default ForgotPassword