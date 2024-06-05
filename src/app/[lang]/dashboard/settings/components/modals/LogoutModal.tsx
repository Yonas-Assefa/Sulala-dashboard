'use client'
import { logout } from '@/actions/common/logout';
import { useRedirectRoute } from '@/hooks/useRedirectRoute';
import { useToastMessage } from '@/hooks/useToastMessage';
import { closeModal } from '@/lib/modals';
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper';
import React, { useState, useTransition } from 'react'

function LogoutModal() {
    const [formState, setFormState] = useState(EMPTY_FORM_STATE)
    const [isPending, startTransition] = useTransition();

    useToastMessage(formState);
    useRedirectRoute(formState);

    const handleLogout = async () => {
        startTransition(async () => {
            const response = await logout()
            closeModal('logout_setting_modal')
        });

    }

    return (
        <dialog id="logout_setting_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Log out?</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 my-4">
                    <button
                        onClick={handleLogout}
                        className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 "
                        type='submit'
                    >
                        {isPending ? <span className="loading loading-spinner loading-md text-primary"></span> : 'Yes'}
                    </button>
                    <form method="dialog">
                        <button className="btn modal-backdrop w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-black">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className='text-black'></button>
            </form>
        </dialog>
    )
}

export default LogoutModal