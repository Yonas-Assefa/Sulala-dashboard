import BackButton from '@/components/common/ui/BackButton'
import React from 'react'
import DiscountAdsForm from './components/discount-ads/AdsForm'
import BannerAdsForm from './components/banners-ads/AdsForm'
import { getAction, getItemType, getTab } from './utils/helper.util'
import Tab from './components/common/Tab'
import { getProducts } from '@/actions/products/get-products'
import { customMapper } from '@/actions/mapper/custom-mapper'

type Props = {
    params: {
        action: string
    },
    searchParams: {
        type: string
        tab: string
    }
}

async function page({ params: { action: actionType }, searchParams: { tab: tabType, type } }: Props) {

    const item = getItemType(type)
    const tab = getTab(tabType, type)
    const action = getAction(actionType)

    const products = await customMapper({
        data: (await getProducts()),
        opt: [
            { from: 'id', to: 'value' },
            { from: 'title', to: 'label' },
            { from: 'images', to: 'image', converter: (image: unknown) => Array.isArray(image) ? image[0] : image }]
    })

    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10  overflow-y-scroll'>
            <div className='flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif'>
                <div className='mt-4' >
                    <BackButton />
                </div>
                <h2 className='capitalize'>{action} promo campaign</h2>
            </div>
            <Tab item={item} tab={tab} />
            {
                tab === 'discounts-ads' ?
                    <DiscountAdsForm products={products} itemType={item} /> :
                    tab === 'banner-ads' ?
                        <BannerAdsForm products={products} itemType={item} /> : null
            }
        </div>
    )
}

export default page