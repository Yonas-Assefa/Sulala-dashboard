import BackButton from '@/components/common/ui/BackButton'
import React from 'react'
import DiscountAdsForm from './components/discount-ads/AdsForm'
import BannerAdsForm from './components/banners-ads/AdsForm'
import { getAction, getItemType, getTab } from './utils/helper.util'
import Tab from './components/common/Tab'
import { getProducts } from '@/actions/products/get-products'
import { customMapper } from '@/actions/mapper/custom-mapper'
import { getOnePromotion } from '@/actions/promotion/get-promotions'

type Props = {
    params: {
        action: string
    },
    searchParams: {
        type: string
        tab: string
        item: string
    }
}

async function page({ params: { action: actionType }, searchParams: { tab: tabType, type, item: item_id } }: Props) {

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

    const promotion = action == 'edit' ?
        await getOnePromotion(item_id) : null

    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10  overflow-y-scroll'>
            <div className='flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif'>
                <div className='mt-4' >
                    <BackButton />
                </div>
                <h2 className='capitalize text-2xl md:text-3xl'>{action} promo campaign</h2>
            </div>
            {action == 'add' && <Tab item={item} tab={tab} />}
            {
                tab === 'discounts-ads' ?
                    <DiscountAdsForm products={products} promotion={promotion} /> :
                    tab === 'banner-ads' ?
                        <BannerAdsForm products={products} promotion={promotion} /> : null
            }
        </div>
    )
}

export default page