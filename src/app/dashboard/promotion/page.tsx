import React from 'react'
import CreateCampaignModal from './components/modals/CreateCampaignModal'
import Table from '@/components/common/table/Table'
import { promotionData, promotionFilterData, promotionSortData } from './schema/data'
import { promotionTableSchema } from './schema/schema'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { getPromotions } from '@/actions/promotion/get-promotions'
import { updatePromotionStatus } from '@/actions/promotion/update-promotion-status'
import { deletePromotion } from '@/actions/promotion/delete-promotion'

async function page() {

    const promotions = await getPromotions()

    return (
        <>
            <CreateCampaignModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY PRODUCTS */}
                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl md:text-5xl font-semibold font-serif'>Promotion campaigns</h1>
                    <div className='flex flex-row gap-3 items-center md:relative absolute bottom-0 right-0 p-5 md:p-0 z-20 drop-shadow-lg md:drop-shadow-none'>
                        <div className=''>
                            <PrimaryButton name='Create campaign' modal='create_campaign_modal' />
                        </div>
                    </div>
                </div>

                {/* <PromotionCampaignTable /> */}
                <Table
                    data={promotions}
                    filterData={promotionFilterData}
                    tableSchema={promotionTableSchema}
                    sortData={promotionSortData}
                    actionOptions={{
                        edit: {
                            searchParams: [
                                {
                                    key: 'tab',
                                    fromItem: {
                                        itemKey: 'promotion_type',
                                        valueDict: [
                                            { key: 'DISCOUNT', value: 'discounts-ads' },
                                            { key: 'BANNER', value: 'banner-ads' },
                                        ]
                                    }
                                },
                                { key: 'type', value: 'product' },
                                {
                                    key: 'item',
                                    fromItem: {
                                        itemKey: 'id'
                                    }
                                },
                            ]
                        },
                        toggle: {
                            action: updatePromotionStatus,
                            key: 'status',
                            active: 'ACTIVE',
                            formData: [
                                { formDataKey: 'status', itemKey: 'status' },
                                { formDataKey: 'item_id', itemKey: 'id' },
                            ]
                        },
                        delete: {
                            action: deletePromotion,
                            formData: [
                                { formDataKey: 'item_id', searchKey: 'item' },
                            ]
                        }
                    }}
                />

            </div >
        </>
    )
}

export default page