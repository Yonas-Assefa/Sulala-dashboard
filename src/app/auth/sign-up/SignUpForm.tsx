'use client'
import SignInWithEmail from '@/components/SignInWithEmail'
import SignInWithPhone from '@/components/SignInWithPhone'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { useFormAction } from '@/hooks/useFormAction'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { emailSignUpSchema, phoneAuthSchema } from '@/schema/zod-schema'
import { signup } from '@/services/api.service'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import { getPhoneNumber } from '@/utils/helper'
import pushNotification from '@/utils/pushNotification.util'
import { useMutation } from '@tanstack/react-query'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { useFormState } from 'react-dom'

type SignUpProps = {
    by: "phone" | "email" | undefined
}

function SignUpForm({ by }: SignUpProps) {

    // const [formState, action] = useFormState(
    //     signUp,
    //     EMPTY_FORM_STATE
    // );

    // useToastMessage(formState);
    // useRedirectRoute(formState);



    const validate = (formData: FormData) => {
        const data: { phone_number?: string, email?: string } = {}

        if (by == 'email') {
            const ZodObj = emailSignUpSchema.safeParse({
                email: formData.get('email'),
            });
            if (!ZodObj.success) {
                return {
                    errors: ZodObj.error.flatten().fieldErrors,
                }
            }
            Object.assign(data, { ...ZodObj })
        } else {
            const ZodObj = phoneAuthSchema.safeParse({
                phone_number: getPhoneNumber({
                    phone_number: formData.get('phone_number'),
                    country_code: formData.get('country_code')
                }),
            });
            if (!ZodObj.success) {
                return {
                    errors: ZodObj.error.flatten().fieldErrors,
                }
            }
            Object.assign(data, { ...ZodObj })
        }
        return data as any
    }

    const { formState, onSubmit, isPending } = useFormAction({
        Fn: signup,
        successRedirectUrl: '',
        successMessage: (by == 'email') ?
            'Check your email for the verification link' :
            'Check your message for the verification code',
        validate: validate
    })

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-6 w-full px-10'>
            {/* SIGN IN INPUT */}
            {by !== 'email' ?
                <SignInWithPhone error={''} /> :
                <SignInWithEmail emailError={''} takePassword={false} />}

            <input type='text' hidden name='by' value={by} />

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className='w-full flex flex-col'>
                    <PrimaryButton name='Continue' type='submit' isLoading={isPending} />
                </div>


                <p className='text-[#70757f]'>Already have an account?</p>
                <SecondaryButton name='Sign in' href={'/auth/sign-in'} />

            </div>
        </form>
    )
}

export default SignUpForm