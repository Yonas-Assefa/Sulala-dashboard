'use client'
import { logout } from '@/actions/common/logout';
import ModalDeleteButton from '@/components/common/modal/ModalDeleteButton';
import { useRedirectRoute } from '@/hooks/useRedirectRoute';
import { useToastMessage } from '@/hooks/useToastMessage';
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper';
import React from 'react'
import { useFormState } from 'react-dom';

function LogoutModal() {
    const [formState, action] = useFormState(
        logout,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <dialog id="logout_setting_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Log out?</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 my-4">
                    <form action={action}>
                        <ModalDeleteButton />
                    </form>
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