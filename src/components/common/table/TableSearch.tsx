'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import React from 'react'

function TableSearch() {
    const { createQueryStringAndPush, searchParams } = useCreateQueryString()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        createQueryStringAndPush('search', e.target.value)
    }

    const search = searchParams.get('search')

    return (
        <div className='relative'>
            <div className="border flex flex-row gap-1 p-1 rounded-[30px]">
                <img src="/icons/search.svg" alt="" />
                <input
                    onChange={handleChange}
                    value={search || ''}
                    type="text"
                    className='bg-white outline-none border-0 focus:outline-none focus:border-0'
                    placeholder='Seach my products' />
            </div>
            <ul tabIndex={0} className={`absolute dropdown-content z-[1] menu p-0 mt-2 shadow bg-white border rounded-box w-full ${search ? 'block' : 'hidden'}`}>
                <ul className='w-full'>
                    {
                        ['1234', '12345', '123456'].map((item) => {
                            return (
                                <li className='border-b w-full truncate' key={item}>
                                    <p>{search}{item}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </ul>
        </div>

    )
}

export default TableSearch