'use client'
import { createPassword } from '@/actions/create-password';
import PasswordInput from '@/components/common/form/PasswordInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRedirectRoute } from '@/hooks/useRedirectRoute';
import { useToastMessage } from '@/hooks/useToastMessage';
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper';
import React from 'react'
import { useFormState } from 'react-dom';

function CreatePasswordForm() {
    const [formState, action] = useFormState(
        createPassword,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <form action={action} className='flex flex-col gap-6 w-full px-10'>
            {/* SIGN IN INPUT */}

            <div className='flex flex-col gap-3 w-full items-center'>


                <div className='flex flex-col w-full'>
                    <PasswordInput error={formState.fieldErrors?.password?.[0]} label='Password' placeholder='Password' name='password' id='password' showLabel={false} />
                </div>

                <div className='flex flex-col w-full'>
                    <PasswordInput error={formState.fieldErrors?.confirm_password?.[0]} label='Confirm Password' placeholder='Confirm Password' name='password_confirm' id='password_confirm' showLabel={false} />
                </div>
            </div>

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className="flex flex-col w-full">
                    <PrimaryButton name='Sign in' type='submit' />
                </div>
            </div>
        </form>
    )
}

export default CreatePasswordForm