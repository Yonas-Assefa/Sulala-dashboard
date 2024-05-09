'use client'
import SignInWithEmail from '@/components/SignInWithEmail'
import SignInWithPhone from '@/components/SignInWithPhone'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import React from 'react'

type SignUpProps = {
    by: "phone" | "email" | undefined
}

function SignUpForm({ by }: SignUpProps) {
    return (
        <form className='flex flex-col gap-6 w-full px-10'>
            {/* SIGN IN INPUT */}
            {by !== 'email' ?
                <SignInWithPhone /> :
                <SignInWithEmail takePassword={false} />}

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className='w-full flex flex-col'>
                    <PrimaryButton name='Continue' disabled />
                </div>


                <p className='text-[#70757f]'>Already have an account?</p>
                <SecondaryButton name='Sign in' href={'/auth/sign-in'} />

            </div>
        </form>
    )
}

export default SignUpForm