'use client'
import BackButton from '@/components/common/ui/BackButton'
import Link from 'next/link'
import React from 'react'
import DiscountAdsForm from './components/discount-ads/AdsForm'
import BannerAdsForm from './components/banners-ads/AdsForm'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { getAction, getItemType, getTab } from './utils/helper.util'

type Props = {
    params: {
        action: string
    },
    searchParams: {
        type: string
        tab: string
    }
}

function page({ params: { action: actionType }, searchParams: { tab: tabType, type } }: Props) {
    const { createQueryString } = useCreateQueryString()

    const item = getItemType(type)
    const tab = getTab(tabType, type)
    const action = getAction(actionType)

    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10  overflow-y-scroll'>
            <div className='flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif'>
                <div className='mt-4' >
                    <BackButton />
                </div>
                <h2 className='capitalize'>{action} promo campaign</h2>
            </div>
            <div className='box-content border-b-2 border-secondary'>
                <div className="self-start font-medium flex flex-row">
                    <Link href={createQueryString('tab', 'discounts-ads')} className={`tab capitalize border-b-2 px-6 -mb-[1px] ${tab == 'discounts-ads' ? 'text-primary border-primary' : 'text-secondary border-transparent'}`}>{item} discounting promotion</Link>
                    <Link href={createQueryString('tab', 'banner-ads')} className={`tab capitalize border-b-2 px-6 -mb-[1px] ${tab == 'banner-ads' ? 'text-primary border-primary' : 'text-secondary border-transparent'}`}>Banner ads</Link>
                </div>
            </div>
            {
                tab === 'discounts-ads' ?
                    <DiscountAdsForm /> :
                    tab === 'banner-ads' ?
                        <BannerAdsForm /> : null
            }
        </div>
    )
}

export default page