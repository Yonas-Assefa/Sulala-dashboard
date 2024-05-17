'use client'
import { changePassword } from '@/actions/settings/change-password';
import PasswordInput from '@/components/common/form/PasswordInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRedirectRoute } from '@/hooks/useRedirectRoute';
import { useToastMessage } from '@/hooks/useToastMessage';
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper';
import React from 'react'
import { useFormState } from 'react-dom';

function ChangePasswordModal() {
    const [formState, action] = useFormState(
        changePassword,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <dialog id="change_password_setting_modal" className='modal'>
            <form action={action} className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Change Password</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <PasswordInput id='old_password' label='Current password' name='old_password' showLabel={false} placeholder='Enter current password' error={formState?.fieldErrors?.old_password?.[0]} />
                    <PasswordInput id='new_password' label='New password' name='new_password' showLabel={false} placeholder='Enter new password' error={formState?.fieldErrors?.password?.[0]} />
                    <PasswordInput id='confirm_password' label='Confirm password' name='confirm_password' showLabel={false} placeholder='Cofirm password' error={formState?.fieldErrors?.confirm_password?.[0]} />
                    <PrimaryButton name='Confirm' type='submit' />
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button className='text-black'></button>
            </form>
        </dialog >
    )
}

export default ChangePasswordModal