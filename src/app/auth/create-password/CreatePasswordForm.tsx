'use client'
import PasswordInput from '@/components/common/form/PasswordInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { } from '@/hooks/useRedirectRoute';
import { createPassword } from '@/services/api.service';
import { validateCreatePassword } from '@/services/validate.service';
import { TCreatePassword } from '@/types/api-service.type';
import React from 'react'

function CreatePasswordForm() {
    const { fieldErrors, onSubmit, loading } = useFormSubmit<TCreatePassword>({
        Fn: createPassword,
        Opt: {
            successMessage: 'Password created successfully!',
            failureMessage: 'Failed to create password',
            successRedirectUrl: '/dashboard/settings'
        },
        validate: validateCreatePassword
    })

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-6 w-full px-10'>
            {/* SIGN IN INPUT */}

            <div className='flex flex-col gap-3 w-full items-center'>


                <div className='flex flex-col w-full'>
                    <PasswordInput error={fieldErrors?.password?.[0]} label='Password' placeholder='Password' name='password' id='password' showLabel={false} />
                </div>

                <div className='flex flex-col w-full'>
                    <PasswordInput error={fieldErrors?.confirm_password?.[0]} label='Confirm Password' placeholder='Confirm Password' name='password_confirm' id='password_confirm' showLabel={false} />
                </div>
            </div>

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className="flex flex-col w-full">
                    <PrimaryButton name='Sign in' type='submit' isLoading={loading} />
                </div>
            </div>
        </form>
    )
}

export default CreatePasswordForm