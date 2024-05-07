'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import React from 'react'

function TableSearch() {
    const { createQueryStringAndPush, searchParams } = useCreateQueryString()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        createQueryStringAndPush('search', e.target.value)
    }

    return (
        <div className="border flex flex-row gap-1 p-1 rounded-[30px]">
            <img src="/icons/search.svg" alt="" />
            <input
                onChange={handleChange}
                value={searchParams.get('search') || ''}
                type="text"
                className='bg-white outline-none border-0 focus:outline-none focus:border-0'
                placeholder='Seach my products' />
        </div>
    )
}

export default TableSearch