'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import Link from 'next/link'
import React from 'react'

function TableDelete() {
    const { createQueryString } = useCreateQueryString()
    return (
        <th>
            <div className="flex flex-row items-center justify-between">
                <p>Actions </p>
                <Link href={createQueryString([{ key: 'item', value: 'all' }, { key: 'action', value: 'delete-product' }])}>
                    <img src="/icons/delete_red.svg" alt="" />
                </Link>
            </div>
        </th>
    )
}

export default TableDelete