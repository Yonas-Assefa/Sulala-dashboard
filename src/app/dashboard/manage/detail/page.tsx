import BackButton from '@/components/common/ui/BackButton'
import React from 'react'
import { getAction, getItemType, getTab } from './utils/helper.util'
import { getProducts } from '@/actions/products/get-products'
import { customMapper } from '@/actions/mapper/custom-mapper'
import { getOnePromotion } from '@/actions/promotion/get-promotions'
import VendorDetailForm from './components/VendorDetailForm'
import { Metadata } from 'next'
import { getOnePendingShop } from '@/actions/manage-shops/get-pending-shops'

type Props = {
    searchParams: {
        type: string
        tab: string
        item: string
    }
}

export const metadata: Metadata = {
    title: 'Sulala | Admin Only',
    description: 'Approve or reject shops.',
    icons: [
        '/icons/key.svg',
    ]
};

async function page({ searchParams: { item } }: Props) {

    const vendorDetail = await getOnePendingShop(item)

    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10  overflow-y-scroll'>
            <div className='flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif'>
                <div className='mt-4' >
                    <BackButton />
                </div>
                <h2 className='capitalize text-2xl md:text-3xl'>vendor detail</h2>
            </div>
            <VendorDetailForm initialData={vendorDetail} />
        </div>
    )
}

export default page