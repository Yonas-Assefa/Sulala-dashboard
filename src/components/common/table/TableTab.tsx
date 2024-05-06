'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { TabSchema } from './table.type'

type Props = {
    tabSchema: TabSchema
}

function TableTab({ tabSchema }: Props) {
    const searchParams = useSearchParams()
    return (
        <div role="tablist" className="tabs">
            {
                tabSchema.map((filter) => {
                    return (
                        <Link href={`?filter=${filter}`} role="tab" className={`tab capitalize rounded-[30px] bg-white text-black ${searchParams.get('filter') === filter ? 'tab-active' : ''} bg-white text-black`}>{filter}</Link>
                    )
                })
            }
        </div>
    )
}

export default TableTab