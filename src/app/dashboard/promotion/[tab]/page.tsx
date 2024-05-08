'use client'
import BackButton from '@/components/common/ui/BackButton'
import Link from 'next/link'
import React from 'react'
import ProductDiscountAdsForm from './components/ProductDiscountAdsForm'
import BannerAdsForm from './components/BannerAdsForm'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'

type Props = {
    params: {
        tab: string[]
    }
}

function page({ params: { tab } }: Props) {
    const { searchParams, createQueryString } = useCreateQueryString()
    const activeTab = searchParams.get('tab') || 'product-discounts-ads'
    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10  overflow-y-scroll'>
            <div className='flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif'>
                <div className='mt-4' >
                    <BackButton />
                </div>
                <h2>Create promo campaign</h2>
            </div>
            <div className='box-content border-b-2 border-secondary'>
                <div className="self-start font-medium flex flex-row">
                    <Link href={createQueryString('tab', 'product-discounts-ads')} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'product-discounts-ads' ? 'text-primary border-primary' : 'text-secondary border-secondary'}`}>Product discounting promotion</Link>
                    <Link href={createQueryString('tab', 'banner-ads')} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'banner-ads' ? 'text-primary border-primary' : 'text-secondary border-secondary'}`}>Banner ads</Link>
                </div>
            </div>
            {
                activeTab === 'product-discounts-ads' ?
                    <ProductDiscountAdsForm /> :
                    activeTab === 'banner-ads' ?
                        <BannerAdsForm /> : null
            }
        </div>
    )
}

export default page