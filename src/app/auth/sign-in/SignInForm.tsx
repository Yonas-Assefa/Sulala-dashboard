'use client'
import { signIn } from '@/app/actions'
import SignInWithEmail from '@/components/SignInWithEmail'
import SignInWithPhone from '@/components/SignInWithPhone'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import React from 'react'

type SignInProps = {
    by: "phone" | "email" | undefined
}

function SignInForm({ by }: SignInProps) {
    return (
        <form action={signIn} className='flex flex-col gap-6 w-full px-10'>
            {/* SIGN IN INPUT */}
            {by !== 'email' ?
                <SignInWithPhone /> :
                <SignInWithEmail />}

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className='w-full flex flex-col'>
                    <PrimaryButton name='Sign in' />
                </div>

                <p className='text-[#70757f] select-none'>Don't have an account?</p>
                <SecondaryButton name='Sign up' href={'/auth/sign-up'} />
            </div>
        </form>
    )
}

export default SignInForm