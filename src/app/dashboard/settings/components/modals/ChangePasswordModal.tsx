'use client'
import PasswordInput from '@/components/common/PasswordInput'
import PrimaryButton from '@/components/common/PrimaryButton'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    open: boolean
}
function ChangePasswordModal({ open }: Props) {
    const router = useRouter()
    return (
        <dialog id="my_modal_4" className={`modal ${open && 'modal-open'}`}>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Change Password</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <PasswordInput handlePasswordChange={() => { }} id='current-password' label='Current password' name='current-password' password='' placeholder='Enter current password' />
                    <PasswordInput handlePasswordChange={() => { }} id='new-password' label='New password' name='new-password' password='' placeholder='Enter new password' />
                    <PasswordInput handlePasswordChange={() => { }} id='confirm-password' label='Confirm password' name='confirm-password' password='' placeholder='Cofirm password' />
                    <PrimaryButton name='Confirm' />
                </div>
            </div>
        </dialog>
    )
}

export default ChangePasswordModal