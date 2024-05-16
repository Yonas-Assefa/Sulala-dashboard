'use client'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE, FormState } from '@/utils/formStateHelper'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import ModalDeleteButton from './ModalDeleteButton'

type Props = {
    deleteAction?: any
}
function DeleteModal({ deleteAction }: Props) {
    const searchParams = useSearchParams()
    const item = searchParams.get('item')?.toString()
    const items_length = item?.split(',')?.filter((ele) => ele != '').length || 0


    const [formState, action] = useFormState(
        deleteAction,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);


    return (
        <dialog id="delete_item_table_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Delete {items_length > 1 ? `${items_length} items?` : `item ${item?.replace(',', '')}`}</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 my-4">
                    <form action={action}>
                        <input type="hidden" name="item" id='item' value={item} />
                        <ModalDeleteButton />
                    </form>
                    <form method="dialog">
                        <button
                            className="btn w-full modal-backdrop rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-black "
                        >
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

export default DeleteModal