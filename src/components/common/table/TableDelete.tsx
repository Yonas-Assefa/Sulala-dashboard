'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { openModal } from '@/utils/openModal'
import Link from 'next/link'
import React from 'react'

function TableDelete() {

    const { searchParams } = useCreateQueryString()

    const selected_items_length = searchParams.get('item')?.toString()?.trim()?.length
    const isChecked = selected_items_length && selected_items_length > 0

    const handleButtonClick = () => {
        if (isChecked) {
            openModal('delete_item_table_modal')
        }
    }

    return (
        <th>
            <div className="flex flex-row items-center justify-between">
                <p>Actions </p>
                <button onClick={handleButtonClick} className={!isChecked ? 'opacity-20' : 'opacity-100'}>
                    <img src="/icons/delete_red.svg" alt="" />
                </button>
            </div>
        </th>
    )
}

export default TableDelete