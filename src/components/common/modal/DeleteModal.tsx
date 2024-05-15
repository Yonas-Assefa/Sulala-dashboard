'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function DeleteModal() {
    const searchParams = useSearchParams()
    const item = searchParams.get('item')?.toString()
    const items_length = item?.split(',')?.filter((ele) => ele != '').length || 0

    return (
        <dialog id="delete_item_table_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Delete {items_length > 1 ? `${items_length} items?` : `item ${item?.replace(',', '')}`}</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 my-4">
                    <button className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 ">Yes</button>
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