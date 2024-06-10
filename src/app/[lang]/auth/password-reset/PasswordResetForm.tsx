'use client'
import { resetPassword } from '@/actions/auth/reset-password';
import PasswordInput from '@/components/common/form/PasswordInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRedirectRoute } from '@/hooks/useRedirectRoute';
import { useToastMessage } from '@/hooks/useToastMessage';
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper';
import React from 'react'
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl'

type Props = {
    vendor_id: string,
    reset_link: string
}

function PasswordResetForm({ vendor_id, reset_link }: Props) {
    const [formState, action] = useFormState(
        resetPassword,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    const t = useTranslations('Auth')

    return (
        <form action={action} className='flex flex-col gap-6 w-full md:px-10'>
            {/* SIGN IN INPUT */}

            <div className='flex flex-col gap-3 w-full items-center'>

                <input type="text" id='vendor_id' name='vendor_id' value={vendor_id} onChange={() => { }} hidden />
                <input type="text" id='reset_link' name='reset_link' value={reset_link} onChange={() => { }} hidden />

                <div className='flex flex-col w-full'>
                    <PasswordInput error={formState.fieldErrors?.password?.[0]} label={t('password')} placeholder={t('password')} name='password' id='password' showLabel={false} />
                </div>

                <div className='flex flex-col w-full'>
                    <PasswordInput error={formState.fieldErrors?.confirm_password?.[0]} label={t('confirm_password')} placeholder={t('confirm_password')} name='password_confirm' id='password_confirm' showLabel={false} />
                </div>
            </div>

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className="flex flex-col w-full">
                    <PrimaryButton name={t('reset_password')} type='submit' />
                </div>
            </div>
        </form>
    )
}

export default PasswordResetForm