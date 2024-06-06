'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { Link } from '@/i18n/navigation'
import React from 'react'

type Props = {
    tab: string
    item: string
}
function Tab({ tab, item }: Props) {
    const { createQueryString } = useCreateQueryString()

    return (
        <div className='box-content border-b-2 border-secondary'>
            <div className="md:self-start font-sm md:font-medium md:flex md:flex-row grid grid-cols-2">
                <Link href={createQueryString('tab', 'discounts-ads') as any} className={`tab overflow-hidden md:overflow-auto capitalize md:border-b-2 md:px-6 -mb-[1px] ${tab == 'discounts-ads' ? 'md:text-primary md:border-primary text-tertiary bg-primary md:bg-transparent' : 'md:text-secondary md:border-transparent text-primary bg-tertiary md:bg-transparent'}`}>{item} discounting promotion</Link>
                <Link href={createQueryString('tab', 'banner-ads') as any} className={`tab capitalize md:border-b-2 md:px-6 -mb-[1px] ${tab == 'banner-ads' ? 'md:text-primary md:border-primary text-tertiary bg-primary md:bg-transparent' : 'md:text-secondary md:border-transparent text-primary bg-tertiary md:bg-transparent'}`}>Banner ads</Link>
            </div>
        </div>
    )
}

export default Tab