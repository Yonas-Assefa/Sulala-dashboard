'use client'
import Link from 'next/link'
import React from 'react'
import { FilterData } from '../../../types/table.type'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'

type Props = {
    filterData: FilterData
}

function TableFilter({ filterData }: Props) {
    const { createQueryString, searchParams } = useCreateQueryString()
    return (
        <div role="tablist" className="tabs">
            {
                filterData.map((filter) => {
                    return (
                        <Link href={createQueryString('filter', filter)} role="tab" className={`tab capitalize rounded-[30px] bg-white text-black ${searchParams.get('filter') === filter ? 'tab-active' : ''} bg-white text-black`}>{filter}</Link>
                    )
                })
            }
        </div>
    )
}

export default TableFilter