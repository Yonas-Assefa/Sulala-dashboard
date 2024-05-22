'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import Link from 'next/link'
import React from 'react'

type Props = {
    tab: string
    item: string
}
function Tab({ tab, item }: Props) {
    const { createQueryString } = useCreateQueryString()

    return (
        <div className='box-content border-b-2 border-secondary'>
            <div className="self-start font-medium flex flex-row">
                <Link href={createQueryString('tab', 'discounts-ads')} className={`tab capitalize border-b-2 px-6 -mb-[1px] ${tab == 'discounts-ads' ? 'text-primary border-primary' : 'text-secondary border-transparent'}`}>{item} discounting promotion</Link>
                <Link href={createQueryString('tab', 'banner-ads')} className={`tab capitalize border-b-2 px-6 -mb-[1px] ${tab == 'banner-ads' ? 'text-primary border-primary' : 'text-secondary border-transparent'}`}>Banner ads</Link>
            </div>
        </div>
    )
}

export default Tab