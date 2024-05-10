'use client'
import { signUp } from '@/actions/signup'
import SignInWithEmail from '@/components/SignInWithEmail'
import SignInWithPhone from '@/components/SignInWithPhone'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import React from 'react'
import { useFormState } from 'react-dom'

type SignUpProps = {
    by: "phone" | "email" | undefined
}

function SignUpForm({ by }: SignUpProps) {

    const [formState, action] = useFormState(
        signUp,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);

    return (
        <form action={action} className='flex flex-col gap-6 w-full px-10'>
            {/* SIGN IN INPUT */}
            {by !== 'email' ?
                <SignInWithPhone error={formState.fieldErrors?.phone_number?.[0]} /> :
                <SignInWithEmail error={formState.fieldErrors?.email?.[0]} takePassword={false} />}

            <input type='text' hidden name='by' value={by} />

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className='w-full flex flex-col'>
                    <PrimaryButton name='Continue' type='submit' />
                </div>


                <p className='text-[#70757f]'>Already have an account?</p>
                <SecondaryButton name='Sign in' href={'/auth/sign-in'} />

            </div>
        </form>
    )
}

export default SignUpForm