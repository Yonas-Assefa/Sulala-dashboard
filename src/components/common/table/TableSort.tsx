'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import React from 'react'

function TableSort() {
    const { createQueryStringAndPush, searchParams } = useCreateQueryString()

    const handleChange = (value: string) => {
        createQueryStringAndPush('sort', value)
    }

    const SortSchema = [
        {
            label: 'Date',
            value: 'date'
        },
        {
            label: 'Product title',
            value: 'product_title'
        },
        {
            label: 'Created',
            value: 'created'
        }
    ]

    const sort_filter = SortSchema.find(ele => ele.value == searchParams.get('sort'))?.label
    const sort_by = searchParams.get('sort_by') || 'newest'

    const handleSortBy = () => {
        if (sort_by === 'newest') {
            createQueryStringAndPush('sort_by', 'oldest')
        } else {
            createQueryStringAndPush('sort_by', 'newest')
        }
    }

    return (
        <div className='flex flex-row gap-2 '>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="bg-white border rounded-[30px] p-1 px-3 flex flex-row gap-2">
                    <img src="/icons/swap_vert.svg" alt="" onClick={handleSortBy} className={`transition-all ${sort_by == 'newest' ? 'rotate-180' : '-rotate-180'}`} />
                    <p className='capitalize'>Sort by {sort_filter}: <span>{sort_by}</span></p>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-white border rounded-box w-52">
                    <p className='text-black font-semibold'>Sort by</p>
                    <div className='flex flex-col gap-3 p-2'>
                        {
                            SortSchema.map((sort) => {
                                const isChecked = searchParams.get('sort') === sort.value
                                return (
                                    <label onClick={() => handleChange(sort.value)} htmlFor={sort.value} className='flex flex-row gap-2 items-center cursor-pointer'>
                                        <input type="radio" name="radio-5" id={sort.value} className="radio radio-success border-secondary" checked={isChecked} />
                                        <p>{sort.label}</p>
                                    </label>
                                )
                            })
                        }
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default TableSort