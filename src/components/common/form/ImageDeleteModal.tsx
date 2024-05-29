'use client'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { closeModal } from '@/lib/modals'
import { EMPTY_FORM_STATE, FormState } from '@/utils/formStateHelper'
import { revalidatePath } from 'next/cache'
import { handleClientScriptLoad } from 'next/script'
import React, { useState, useTransition } from 'react'

type Props = {
    isPending: boolean
}

function ImageDeleteModal({ isPending }: Props) {

    const handleClickOutside = () => {
        closeModal('image_delete_modal', true)
    }

    return (
        <dialog id="image_delete_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Remove Image</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 my-4">
                    <p className='text-center'>Are you sure to delete this image permanently?</p>
                    <button
                        className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 "
                        type='button'
                        id={'image_delete_modal_confirm'}
                        name={'image_delete_modal_confirm'}
                    >
                        {isPending ? <span className="loading loading-spinner loading-md text-primary"></span> : 'Yes'}
                    </button>
                    <button
                        type='button'
                        className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-black "
                        id={'image_delete_modal_cancel'}
                        name={'image_delete_modal_cancel'}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={handleClickOutside}>
            </div>
        </dialog>
    )
}

export default ImageDeleteModal