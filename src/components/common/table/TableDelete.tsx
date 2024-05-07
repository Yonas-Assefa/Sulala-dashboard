'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import Link from 'next/link'
import React from 'react'

function TableDelete() {

    const { createQueryString, searchParams } = useCreateQueryString()

    const selected_items_length = searchParams.get('item')?.toString()?.trim()?.length
    const isChecked = selected_items_length && selected_items_length > 0

    return (
        <th>
            <div className="flex flex-row items-center justify-between">
                <p>Actions </p>
                <Link href={isChecked ? createQueryString([{ key: 'action', value: 'delete-product' }]) : ''} className={!isChecked ? 'opacity-20' : 'opacity-100'}>
                    <img src="/icons/delete_red.svg" alt="" />
                </Link>
            </div>
        </th>
    )
}

export default TableDelete